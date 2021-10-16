import {Observable, of, Subject} from 'rxjs';
import {StorageStrategy} from '../lib/core/interfaces/storageStrategy';
import {ValueWithExpiration} from '../lib/helpers/valueWithExpiration';

export const StorageStrategyStubName: string = 'stub_strategy';

export class StorageStrategyStub implements StorageStrategy<any> {

	readonly keyChanges: Subject<string> = new Subject();
	public store: any = {};
	public _available: boolean = true;
	readonly name: string;

	constructor(name?: string) {
		this.name = name || StorageStrategyStubName;
	}

	get isAvailable(): boolean {
		return this._available;
	}

	get(key: string): Observable<any> {
		let data = this.store[key];
		if (data && data._e_in) {
			const valueWithExpiration = new ValueWithExpiration(data);
			if (valueWithExpiration.isExpired()) {
				return of(null);
			}
			data = valueWithExpiration.getRealValue();
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
		this.store[key] = v;
		this.keyChanges.next(key);
		return of(value);
	}

	del(key: string): Observable<void> {
		delete this.store[key];
		this.keyChanges.next(key);
		return of(null);
	}

	clear(): Observable<void> {
		this.store = {};
		this.keyChanges.next(null);
		return of(null);
	}

}
