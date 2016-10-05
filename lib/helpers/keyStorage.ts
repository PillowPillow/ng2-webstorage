import {IWebStorage} from '../interfaces/webStorage';
import {LIB_KEY, LIB_KEY_SEPARATOR} from '../constants/lib';
var CUSTOM_LIB_KEY = LIB_KEY;
var CUSTOM_LIB_KEY_SEPARATOR = LIB_KEY_SEPARATOR;

export class KeyStorageHelper {

	static retrieveKeysFromStorage(storage:IWebStorage):Array<string> {
		return Object.keys(storage).filter((key) => key.indexOf(CUSTOM_LIB_KEY) === 0);
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
