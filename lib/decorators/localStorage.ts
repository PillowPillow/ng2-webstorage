import {WebStorageDecorator} from './webStorage';
import {STORAGE} from '../enums/storage';

export function LocalStorage(webSKey?:string, defaultValue?:any) {
	return function(targetedClass:Object, raw:string) {
		WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw, defaultValue);
	};
}
