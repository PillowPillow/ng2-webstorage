import {LocalStorageService, SessionStorageService} from './services';

export * from './decorators';
export * from './interfaces';
export * from './services';

export const NG2_WEBSTORAGES = [
	SessionStorageService,
	LocalStorageService
];
