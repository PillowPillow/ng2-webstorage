import {Observable} from 'rxjs';

interface StorageService {
	retrieve(key: string);

	store(key: string, value: any);

	clear(key?: string);

	getStrategyName(): string;

	observe(key: string): Observable<any>;
}

export {StorageService};
