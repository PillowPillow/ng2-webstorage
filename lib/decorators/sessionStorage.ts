import {WebStorage} from './webStorage';
import {STORAGE} from '../enums/storage';

export function SessionStorage(webstorageKey?:string) {
	return WebStorage(webstorageKey, STORAGE.session);
}
