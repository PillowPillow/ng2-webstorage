import {FactoryProvider, InjectionToken} from '@angular/core';
import {CROSS_STORAGE_CLIENT, CrossStorageClientI} from './cross-storage-client';
import {CROSS_STORAGE_LOCAL_STORAGE_FALLBACK} from './cross-storage-local-storage-fallback';

class CrossStorageClientFacade implements CrossStorageClientI {
	client: CrossStorageClientI | undefined;

	constructor(protected _client: CrossStorageClientI, protected _fallback?: CrossStorageClientI) {}

	onConnect(): Promise<CrossStorageClientI> {
		const connected: CrossStorageClientI | undefined = this.client;
		if (connected) return connected.onConnect().then(() => connected);
		// Both branches assign, so the chain always resolves to a client.
		return this._client.onConnect()
			.then(() => this.client = this._client, () => this.client = this._fallback ?? this._client);
	}

	set(key: string, value: any): Promise<any> {
		return this.onConnect().then((client) => client.set(key, value));
	}

	get(key: string): Promise<any> {return this.onConnect().then((client) => client.get(key)); }

	clear(key?: string): Promise<any> {return this.onConnect().then((client) => client.clear(key)); }

	del(key?: string): Promise<any> {return this.onConnect().then((client) => client.del(key)); }

}

export {CrossStorageClientFacade};

export const CROSS_STORAGE: InjectionToken<CrossStorageClientI> = new InjectionToken<CrossStorageClientI>('cross_storage_facade');

export function getCrossStorage(client: CrossStorageClientI, fallback: CrossStorageClientI) {
	return new CrossStorageClientFacade(client, fallback);
}

export const CrossStorageProvider: FactoryProvider = {
	provide: CROSS_STORAGE,
	useFactory: getCrossStorage,
	deps: [CROSS_STORAGE_CLIENT, CROSS_STORAGE_LOCAL_STORAGE_FALLBACK],
};

