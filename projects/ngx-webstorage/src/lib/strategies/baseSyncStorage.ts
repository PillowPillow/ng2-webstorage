import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {Observable, of, Subject} from 'rxjs';
import {StrategyCacheService} from '../core/strategyCache';
import {CompatHelper} from '../helpers/compat';
import {WebStorage} from '../core/interfaces/webStorage';

abstract class BaseSyncStorageStrategy implements StorageStrategy<any> {
	readonly keyChanges: Subject<string> = new Subject();
	abstract readonly name: string;

	constructor(protected storage: WebStorage, protected cache: StrategyCacheService) {}

	protected _isAvailable: boolean | undefined;

	get isAvailable(): boolean {
		if (this._isAvailable === undefined) this._isAvailable = CompatHelper.isStorageAvailable(this.storage);
		return this._isAvailable;
	}

	get(key: string): Observable<any> {
		let data: any = this.cache.get(this.name, key);
		if (data !== undefined) return of(data);

		try {
			const item: any = this.storage.getItem(key);
			if (item !== null) {
				data = JSON.parse(item);
				this.cache.set(this.name, key, data);
			}
		} catch(err) {
			console.warn(err);
		}

		return of(data);
	}

	set(key: string, value: any): Observable<any> {
		const data: string = JSON.stringify(value);
		this.storage.setItem(key, data);
		this.cache.set(this.name, key, value);
		this.keyChanges.next(key);
		return of(value);
	}

	del(key: string): Observable<void> {
		this.storage.removeItem(key);
		this.cache.del(this.name, key);
		this.keyChanges.next(key);
		return of(void 0);
	}

	clear(): Observable<void> {
		this.storage.clear();
		this.cache.clear(this.name);
// `null` means "everything was cleared". The public type stays Subject<string>
		// rather than Subject<string | null>: widening it is a source break for every
		// consumer that subscribes, not just for third-party strategy implementors,
		// and this release deliberately supports Angular 21 consumers. Revisit in v23.
		this.keyChanges.next(null as unknown as string);
		return of(void 0);
	}

}

export {BaseSyncStorageStrategy};
