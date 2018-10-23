import {Observable, Subject} from 'rxjs';

export interface StorageStrategy<T> {
	
	readonly keyChanges: Subject<string>;
	readonly isAvailable: boolean;
	readonly name: string;
	
	get(key: string): Observable<T>;
	
	set(key: string, value: T): Observable<T>;
	
	del(key: string): Observable<void>;
	
	clear(): Observable<void>;
	
}
