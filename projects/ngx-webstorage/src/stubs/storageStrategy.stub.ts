import {Observable, of, Subject} from 'rxjs';
import {StorageStrategy} from '../lib/core/interfaces/storageStrategy';

export const StorageStrategyStubName: string = 'stub_strategy';

class StorageStrategyStub implements StorageStrategy<any> {

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
		return of(this.store[key]);
	}

	set(key: string, value: any): Observable<any> {
		this.store[key] = value;
		this.keyChanges.next(key);
		return of(value);
	}

	del(key: string): Observable<void> {
		delete this.store[key];
		this.keyChanges.next(key);
		return of(void 0);
	}

	clear(): Observable<void> {
		this.store = {};
// `null` means "everything was cleared". The public type stays Subject<string>
		// rather than Subject<string | null>: widening it is a source break for every
		// consumer that subscribes, not just for third-party strategy implementors,
		// and this release deliberately supports Angular 21 consumers. Revisit in v23.
		this.keyChanges.next(null as unknown as string);
		return of(void 0);
	}

}

export {StorageStrategyStub};
