export * from './lib/provider';

export {CrossStorageServiceProvider, CrossStorageService} from './lib/services/cross-storage';
export {CrossStorageStrategyProvider, CrossStorageStrategy} from './lib/strategies/cross-storage';
export {CrossStorageClientStub} from './lib/stubs/cross-storage-client.stub';
export {CROSS_STORAGE_CLIENT, CrossStorageClientI} from './lib/utils/cross-storage-client';
export {CROSS_STORAGE_LOCAL_STORAGE_FALLBACK} from './lib/utils/cross-storage-local-storage-fallback';
export {CROSS_STORAGE, CrossStorageClientFacade} from './lib/utils/cross-storage-facade';
