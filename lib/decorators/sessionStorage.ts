import {WebStorage} from './webStorage';
import {STORAGE} from '../enums/storage';

export const SessionStorage = function SessionStorageDecorator(webstorageKey?:string) {
	return WebStorage(webstorageKey, STORAGE.session);
};
