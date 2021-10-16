import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {Observable, of, Subject} from 'rxjs';
import {StrategyCacheService} from '../core/strategyCache';
import {CompatHelper} from '../helpers/compat';
import {ValueWithExpiration} from '../helpers/valueWithExpiration';
import {WebStorage} from '../core/interfaces/webStorage';


export abstract class BaseSyncStorageStrategy implements StorageStrategy<any> {
	readonly keyChanges: Subject<string> = new Subject();
	abstract readonly name: string;

	constructor(protected storage: WebStorage, protected cache: StrategyCacheService) {}

	protected _isAvailable: boolean;

	get isAvailable(): boolean {
		if (this._isAvailable === undefined) this._isAvailable = CompatHelper.isStorageAvailable(this.storage);
		return this._isAvailable;
	}
	
	get(key: string): Observable<any> {
		let data: any = this.cache.get(this.name, key);
		if (data && data._e_in) {
			const valueWithExpiration = new ValueWithExpiration(data);
			if (valueWithExpiration.isExpired()) {
				return of(null);
			}
			data = valueWithExpiration.getRealValue();
		}
		if (data !== undefined) return of(data);

		try {
			const item: any = this.storage.getItem(key);
			if (item !== null) {
				const data1 = JSON.parse(item);
				if (data1 && data1._e_in) {
					const valueWithExpiration = new ValueWithExpiration(data1);
					if (valueWithExpiration.isExpired()) {
						return of(null);
					}
					data = valueWithExpiration.getRealValue();
				} else {
					data = data1;
				}
				this.cache.set(this.name, key, data1);
			}
		} catch(err) {
			console.warn(err);
		}

		return of(data);
	}

	set(key: string, value: any, expiresIn?: number): Observable<any> {
		let v = value;
		if (expiresIn) {
			const valueWithExpiration = new ValueWithExpiration(value);
			valueWithExpiration.setExpiration(expiresIn);
			v = valueWithExpiration.getValueForStorage();
		}
		const data = JSON.stringify(value);
		this.storage.setItem(key, data);
		this.cache.set(this.name, key, v);
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
