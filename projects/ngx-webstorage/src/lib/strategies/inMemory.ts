import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {Observable, of, Subject} from 'rxjs';
import {StrategyCacheService} from '../core/strategyCache';
import {StorageStrategyType} from '../constants/strategy';
import {Inject} from '@angular/core';

export class InMemoryStorageStrategy implements StorageStrategy<any> {
	readonly keyChanges: Subject<string> = new Subject();
	isAvailable: boolean = true;
	readonly name: string = StorageStrategyType.InMemory;
	
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
	
	constructor(@Inject(StrategyCacheService) protected cache: StrategyCacheService) {}
	
}
