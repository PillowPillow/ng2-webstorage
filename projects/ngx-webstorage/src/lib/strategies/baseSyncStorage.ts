import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {Observable, of, Subject} from 'rxjs';
import {StrategyCacheService} from '../core/strategyCache';
import {CompatHelper} from '../helpers/compat';
import {WebStorage} from '../core/interfaces/webStorage';

export abstract class BaseSyncStorageStrategy implements StorageStrategy<any> {
	readonly keyChanges: Subject<string> = new Subject();
	
	constructor(protected storage: WebStorage, protected cache: StrategyCacheService) {}
	
	protected _isAvailable: boolean;
	
	get isAvailable(): boolean {
		if (this._isAvailable === undefined) this._isAvailable = CompatHelper.isStorageAvailable(this.storage);
		return this._isAvailable;
	}
	
	abstract readonly name: string;
	
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
		return of(null);
	}
	
	clear(): Observable<void> {
		this.storage.clear();
		this.cache.clear(this.name);
		this.keyChanges.next(null);
		return of(null);
	}
	
}
