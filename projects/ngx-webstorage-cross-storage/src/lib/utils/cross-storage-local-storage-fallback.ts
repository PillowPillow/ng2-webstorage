import {FactoryProvider, InjectionToken} from '@angular/core';
import {LOCAL_STORAGE} from 'ngx-webstorage';
import {CrossStorageClientI} from './cross-storage-client';

class CrossStorageLocalStorageFallback implements CrossStorageClientI {

	constructor(protected storage: any) {}

	onConnect(): Promise<void> {return Promise.resolve();}

	set(key: string, value: any): Promise<any> {return this.onConnect().then(() => this.storage.setItem(key, value)); }

	get(key: string): Promise<any> {return this.onConnect().then(() => this.storage.getItem(key)); }

	clear(key?: string): Promise<any> {
		if (key) return this.del(key);
		return this.onConnect().then(() => {
			this.storage.clear();
		});
	}

	del(key?: string): Promise<any> {return this.onConnect().then(() => this.storage.removeItem(key)); }
}
export {CrossStorageLocalStorageFallback};

export const CROSS_STORAGE_LOCAL_STORAGE_FALLBACK: InjectionToken<CrossStorageClientI> = new InjectionToken<CrossStorageClientI>('cross_storage_local_storage_fallback');

export function getCrossStorageLocalStorageFallback(storage: any) {
	return new CrossStorageLocalStorageFallback(storage);
}

export const CrossStorageLocalStorageFallbackProvider: FactoryProvider = {
	provide: CROSS_STORAGE_LOCAL_STORAGE_FALLBACK,
	useFactory: getCrossStorageLocalStorageFallback,
	deps: [LOCAL_STORAGE]
};
