import {Observable} from 'rxjs';

interface StorageService {
	retrieve(key: string): any;

	store(key: string, value: any): any;

	clear(key?: string): void;

	getStrategyName(): string;

	observe(key: string): Observable<any>;
}

export {StorageService};
