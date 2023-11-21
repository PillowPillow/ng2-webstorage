import {FactoryProvider} from '@angular/core';
import {STORAGE_STRATEGIES, StorageStrategy, StrategyCacheService} from 'ngx-webstorage';
import {from, Observable, of, Subject} from 'rxjs';
import {CROSS_STORAGE, CrossStorageClientFacade} from '../utils/cross-storage-facade';

class CrossStorageStrategy implements StorageStrategy<any> {
	static readonly strategyName: string = 'cross-storage';

	readonly keyChanges: Subject<string> = new Subject();
	public isAvailable: boolean = true;
	readonly name: string = CrossStorageStrategy.strategyName;

	constructor(readonly facade: CrossStorageClientFacade, protected cache: StrategyCacheService) {
	}

	get(key: string): Observable<any> {
		let data: any = this.cache.get(this.name, key);
		if (data !== undefined) return of(data);

		const promise = this.facade.onConnect()
			.then(() => this.facade.get(key))
			.then((item: any) => {
				if (item !== null) {
					data = JSON.parse(item);
					this.cache.set(this.name, key, data);
				}
			}, (err) => console.warn(err))
			.then(() => data);

		return from(promise);
	}

	set(key: string, value: any): Observable<any> {
		const data: string = JSON.stringify(value);
		const promise = this.facade.onConnect()
			.then(() => {
				this.cache.set(this.name, key, value);
				this.keyChanges.next(key);
				return this.facade.set(key, data);
			}, (err) => console.warn(err))
			.then(() => value);
		return from(promise);
	}

	del(key: string): Observable<any> {
		const promise = this.facade.onConnect()
			.then(() => {
				this.cache.del(this.name, key);
				this.keyChanges.next(key);
				return this.facade.del(key);
			}, (err) => console.warn(err))
			.then(() => null);
		return from(promise);
	}

	clear(): Observable<any> {
		const promise = this.facade.onConnect()
			.then(() => {
				this.cache.clear(this.name);
				this.keyChanges.next(null);
				return this.facade.clear();
			}, (err) => console.warn(err))
			.then(() => null);
		return from(promise);
	}

}

export {CrossStorageStrategy};

export function buildStrategy(client: CrossStorageClientFacade, cache: StrategyCacheService) {
	return new CrossStorageStrategy(client, cache);
}

export const CrossStorageStrategyProvider: FactoryProvider = {
	provide: STORAGE_STRATEGIES,
	useFactory: buildStrategy,
	deps: [CROSS_STORAGE, StrategyCacheService],
	multi: true
};
