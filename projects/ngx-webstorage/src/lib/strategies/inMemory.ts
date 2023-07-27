import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {CompatHelper} from '../helpers/compat';
import {Observable, of, Subject} from 'rxjs';
import {StrategyCacheService} from '../core/strategyCache';
import {StorageStrategies} from '../constants/strategy';
import {Inject, Injectable} from '@angular/core';
import {ValueWithExpiration} from '../helpers/valueWithExpiration';

@Injectable()
export class InMemoryStorageStrategy implements StorageStrategy<any> {
	static readonly strategyName: string = StorageStrategies.InMemory;
	readonly keyChanges: Subject<string> = new Subject();
	isAvailable: boolean = true;
	readonly name: string = InMemoryStorageStrategy.strategyName;

	constructor(@Inject(StrategyCacheService) protected cache: StrategyCacheService) {}

	get(key: string): Observable<any> {
		let d =this.cache.get(this.name, key);
		if (d && d._e_in) {
			const valueWithExpiration = new ValueWithExpiration(d);
			if (valueWithExpiration.isExpired()) {
				return of(null);
			}
			d = valueWithExpiration.getRealValue();
		}
		return of(d);
	}

	set(key: string, value: any, expiresIn?: number): Observable<any> {
		let v = value;
		if (expiresIn) {
			const valueWithExpiration = new ValueWithExpiration(value);
			valueWithExpiration.setExpiration(expiresIn);
			v = valueWithExpiration.getValueForStorage();
		}
		this.cache.set(this.name, key, v);
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
