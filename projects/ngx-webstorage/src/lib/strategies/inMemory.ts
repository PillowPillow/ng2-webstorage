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
		return of(void 0);
	}

	clear(): Observable<void> {
		this.cache.clear(this.name);
// `null` means "everything was cleared". The public type stays Subject<string>
		// rather than Subject<string | null>: widening it is a source break for every
		// consumer that subscribes, not just for third-party strategy implementors,
		// and this release deliberately supports Angular 21 consumers. Revisit in v23.
		this.keyChanges.next(null as unknown as string);
		return of(void 0);
	}

}

export {InMemoryStorageStrategy};
