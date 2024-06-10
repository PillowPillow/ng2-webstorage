import {CROSS_STORAGE_CONFIG, CrossStorageConfig} from './config';
import {CrossStorageServiceProvider} from './services/cross-storage';
import {CrossStorageStrategyProvider} from './strategies/cross-storage';
import {CrossStorageClientProvider} from './utils/cross-storage-client';
import {CrossStorageProvider} from './utils/cross-storage-facade';
import {CrossStorageLocalStorageFallbackProvider} from './utils/cross-storage-local-storage-fallback';
import {makeNgxWebstorageFeature} from 'ngx-webstorage';

const CROSS_STORAGE_FEATURE_KIND = 'cross_storage_feature';

export function withCrossStorage(config: CrossStorageConfig) {
	return makeNgxWebstorageFeature(CROSS_STORAGE_FEATURE_KIND, [
		{provide: CROSS_STORAGE_CONFIG, useValue: config},
		CrossStorageClientProvider,
		CrossStorageLocalStorageFallbackProvider,
		CrossStorageProvider,
		CrossStorageServiceProvider,
		CrossStorageStrategyProvider
	]);
}
