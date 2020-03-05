import {FactoryProvider, InjectionToken} from '@angular/core';
import {CrossStorageClient} from 'cross-storage';
import {CROSS_STORAGE_CONFIG, CrossStorageConfig} from './config';

export interface CrossStorageClientI {

	onConnect(): Promise<any>;

	set(key: string, value: any): Promise<any>;

	get(key: string): Promise<any>;

	clear(key?: string): Promise<any>;

	del(key?: string): Promise<any>;

}

export const CROSS_STORAGE_CLIENT: InjectionToken<CrossStorageClientI> = new InjectionToken<CrossStorageClientI>('cross_storage_client');

export function getCrossStorageClient({host}: CrossStorageConfig) {
	return new CrossStorageClient(host);
}

export const CrossStorageClientProvider: FactoryProvider = {
	provide: CROSS_STORAGE_CLIENT,
	useFactory: getCrossStorageClient,
	deps: [CROSS_STORAGE_CONFIG],
};
