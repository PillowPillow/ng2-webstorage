import {IWebStorage} from '../interfaces/webStorage';
import {LIB_KEY, LIB_KEY_SEPARATOR} from '../constants/lib';

var CUSTOM_LIB_KEY = LIB_KEY;
var CUSTOM_LIB_KEY_SEPARATOR = LIB_KEY_SEPARATOR;

export function isManagedKey(sKey:string):boolean {
	return sKey.indexOf(CUSTOM_LIB_KEY + CUSTOM_LIB_KEY_SEPARATOR) === 0;
}

export class KeyStorageHelper {

	static isManagedKey(sKey:string):boolean {
		return sKey.indexOf(CUSTOM_LIB_KEY + CUSTOM_LIB_KEY_SEPARATOR) === 0;
	}

	static retrieveKeysFromStorage(storage:IWebStorage):Array<string> {
		return Object.keys(storage).filter(isManagedKey);
	}

	static genKey(raw:string):string {
		if(typeof raw !== 'string')
			throw Error('attempt to generate a storage key with a non string value');
		return `${CUSTOM_LIB_KEY}${CUSTOM_LIB_KEY_SEPARATOR}${raw.toString().toLowerCase()}`;
	}

	static setStorageKeyPrefix(key:string = LIB_KEY) {
		CUSTOM_LIB_KEY = key;
	}

	static setStorageKeySeparator(separator:string = LIB_KEY_SEPARATOR) {
		CUSTOM_LIB_KEY_SEPARATOR = separator;
	}
}
