/*
 * Public API Surface of ngx-webstorage
 */

export * from './lib/constants/strategy';

export * from './lib/helpers/compat';

export * from './lib/core/templates/syncStorage';
export * from './lib/core/templates/asyncStorage';
export * from './lib/core/strategyCache';
export {LOCAL_STORAGE, SESSION_STORAGE} from './lib/core/nativeStorage';

export {STORAGE_STRATEGIES} from './lib/strategies/index';
export * from './lib/strategies/localStorage';
export * from './lib/strategies/sessionStorage';
export * from './lib/strategies/inMemory';
export * from './stubs/storageStrategy.stub';
export * from './stubs/storage.stub';

export * from './lib/services/strategyIndex';
export {LocalStorageService} from './lib/services/localStorage';
export {SessionStorageService} from './lib/services/sessionStorage';

export * from './lib/core/interfaces/storageStrategy';
export * from './lib/decorators';
export * from './lib/provider';




