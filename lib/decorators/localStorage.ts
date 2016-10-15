import {WebStorage} from './webStorage';
import {STORAGE} from '../enums/storage';

export const LocalStorage = function LocalStorageDecorator(webstorageKey?:string) {
	return WebStorage(webstorageKey, STORAGE.local);
};