/*
 * Public API Surface of ngx-webstorage
 */

export * from './lib/core/templates/syncStorage';
export * from './lib/core/templates/asyncStorage';
export * from './lib/strategies/localStorage';
export * from './lib/strategies/sessionStorage';
export * from './lib/strategies/inMemory';
export * from './lib/services/strategyIndex';

export {LocalStorageService} from './lib/services/localStorage';
export {SessionStorageService} from './lib/services/sessionStorage';
export * from './lib/decorators';
export * from './lib/module';




