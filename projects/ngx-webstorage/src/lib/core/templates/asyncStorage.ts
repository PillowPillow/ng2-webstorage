import {StorageStrategy} from '../interfaces/storageStrategy';
import {Observable} from 'rxjs';
import {StorageService} from '../interfaces/storageService';
import {StorageKeyManager} from '../../helpers/storageKeyManager';
import {distinctUntilChanged, filter, map, shareReplay, switchMap} from 'rxjs/operators';

export class AsyncStorage implements StorageService {

	constructor(protected strategy: StorageStrategy<any>) {
	}

	retrieve(key: string): Observable<any> {
		return this.strategy.get(StorageKeyManager.normalize(key)).pipe(
			map((value: any) => typeof value === 'undefined' ? null : value)
		);
	}

	store(key: string, value: any): Observable<any> {
		return this.strategy.set(StorageKeyManager.normalize(key), value);
	}

	clear(key?: string): Observable<void> {
		return key !== undefined ? this.strategy.del(StorageKeyManager.normalize(key)) : this.strategy.clear();
	}

	getStrategyName(): string { return this.strategy.name; }

	observe(key: string): Observable<any> {
		key = StorageKeyManager.normalize(key);
		return this.strategy.keyChanges.pipe(
			filter((changed: string) => changed === null || changed === key),
			switchMap(() => this.strategy.get(key)),
			distinctUntilChanged(),
			shareReplay({refCount: 1, bufferSize: 1})
		);
	}
}
