import {LocalStorageService, SessionStorageService} from './services/index';
export * from './decorators/index';
export * from './interfaces/index';
export * from './services/index';
export * from './helpers/keyStorage';

export const NG2_WEBSTORAGE = [
	SessionStorageService,
	LocalStorageService
];
