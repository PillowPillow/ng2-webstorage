import {WebStorage} from './webStorage';
import {STORAGE} from '../enums/storage';

export function LocalStorage(webstorageKey?:string) {
	return WebStorage(webstorageKey, STORAGE.local);
}
