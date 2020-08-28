import {FactoryProvider, InjectionToken} from '@angular/core';
import {CROSS_STORAGE_CLIENT, CrossStorageClientI} from './cross-storage-client';
import {CROSS_STORAGE_LOCAL_STORAGE_FALLBACK} from './cross-storage-local-storage-fallback';

export class CrossStorageClientFacade implements CrossStorageClientI {
	client: CrossStorageClientI;

	constructor(protected _client: CrossStorageClientI, protected _fallback?: CrossStorageClientI) {}

	onConnect(): Promise<CrossStorageClientI> {
		if (this.client) return this.client.onConnect().then(() => this.client);
		return this._client.onConnect()
			.then(() => this.client = this._client, () => this.client = this._fallback ?? this._client)
			.then(() => this.client);
	}

	set(key: string, value: any): Promise<any> {
		return this.onConnect().then((client) => client.set(key, value));
	}

	get(key: string): Promise<any> {return this.onConnect().then((client) => client.get(key)); }

	clear(key?: string): Promise<any> {return this.onConnect().then((client) => client.clear(key)); }

	del(key?: string): Promise<any> {return this.onConnect().then((client) => client.del(key)); }

}

export const CROSS_STORAGE: InjectionToken<CrossStorageClientI> = new InjectionToken<CrossStorageClientI>('cross_storage_facade');

export function getCrossStorage(client: CrossStorageClientI, fallback: CrossStorageClientI) {
	return new CrossStorageClientFacade(client, fallback);
}

export const CrossStorageProvider: FactoryProvider = {
	provide: CROSS_STORAGE,
	useFactory: getCrossStorage,
	deps: [CROSS_STORAGE_CLIENT, CROSS_STORAGE_LOCAL_STORAGE_FALLBACK],
};

