import {WebStorageDecorator} from './webStorage';
import {STORAGE} from '../enums/storage';

export function SessionStorage(webSKey?:string) {
	return function(targetedClass:Object, raw:string) {
		WebStorageDecorator(webSKey, STORAGE.session, targetedClass, raw);
	};
};
