import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {Observable, of, Subject} from 'rxjs';
import {StrategyCacheService} from '../core/strategyCache';
import {StorageStrategies} from '../constants/strategy';
import {Inject, Injectable} from '@angular/core';

@Injectable()
class InMemoryStorageStrategy implements StorageStrategy<any> {
	static readonly strategyName: string = StorageStrategies.InMemory;
	readonly keyChanges: Subject<string> = new Subject();
	isAvailable: boolean = true;
	readonly name: string = InMemoryStorageStrategy.strategyName;

	constructor(@Inject(StrategyCacheService) protected cache: StrategyCacheService) {}

	get(key: string): Observable<any> {
		return of(this.cache.get(this.name, key));
	}

	set(key: string, value: any): Observable<any> {
		this.cache.set(this.name, key, value);
		this.keyChanges.next(key);
		return of(value);
	}

	del(key: string): Observable<void> {
		this.cache.del(this.name, key);
		this.keyChanges.next(key);
		return of(null);
	}

	clear(): Observable<void> {
		this.cache.clear(this.name);
		this.keyChanges.next(null);
		return of(null);
	}

}

export {InMemoryStorageStrategy};
