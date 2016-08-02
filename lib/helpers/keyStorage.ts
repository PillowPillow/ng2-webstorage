import {IWebStorage} from '../interfaces/webStorage';
import {LIB_KEY} from '../constants/lib';
var CUSTOM_LIB_KEY = LIB_KEY;

export class KeyStorageHelper {

	static retrieveKeysFromStorage(storage:IWebStorage):Array<string> {
		return Object.keys(storage).filter((key) => key.indexOf(CUSTOM_LIB_KEY) === 0);
	}

	static genKey(raw:string):string {
		if(typeof raw !== 'string')
			throw Error('attempt to generate a storage key with a non string value');
		return `${CUSTOM_LIB_KEY}|${raw.toString().toLowerCase()}`;
	}

	static setStorageKeyPrefix(key:string = LIB_KEY) {
		CUSTOM_LIB_KEY = key;
	}
}
