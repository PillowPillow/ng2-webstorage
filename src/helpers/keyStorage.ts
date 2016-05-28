import {IWebStorage} from '../interfaces/webStorage';
import {LIB_KEY} from '../constants/lib';

export class KeyStorageHelper {

	static retrieveKeysFromStorage(storage:IWebStorage):Array<string> {
		return Object.keys(storage).filter((key) => key.indexOf(LIB_KEY) === 0);
	}

	static genKey(raw:string):string {
		return `${LIB_KEY}|${raw.toString().toLowerCase()}`;
	}
}