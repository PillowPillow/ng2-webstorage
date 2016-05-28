import {IWebStorage} from '../interfaces/webStorage';
import {STORAGE} from '../enums/storage';
import {StorageObserverHelper} from './storageObserver';
import {KeyStorageHelper} from './keyStorage';

export class WebStorageHelper {
	
	static cached = {[STORAGE.local]:{}, [STORAGE.session]:{}};

	static store(sType:STORAGE, sKey:string, value:string):void {
		this.getWStorage(sType).setItem(sKey, value);
		this.cached[sType][sKey] = value;
		StorageObserverHelper.emit(sType, sKey, value);
	}

	static retrieve(sType:STORAGE, sKey:string):string {
		if(sKey in this.cached[sType])
			return this.cached[sType][sKey];
		return this.cached[sType][sKey] = this.getWStorage(sType).getItem(sKey);
	}

	static clearAll(sType:STORAGE):void {
		let storage:IWebStorage = this.getWStorage(sType);
		KeyStorageHelper.retrieveKeysFromStorage(storage)
		.forEach((sKey) => {
			storage.removeItem(sKey);
			delete this.cached[sType][sKey];
			StorageObserverHelper.emit(sType, sKey, null);
		});
	}

	static clear(sType:STORAGE, sKey:string):void {
		this.getWStorage(sType).removeItem(sKey);
		delete this.cached[sType][sKey];
	}

	static getWStorage(sType:STORAGE):IWebStorage {
		switch(sType) {
			case STORAGE.local:
				return localStorage;
				break;
			case STORAGE.session:
				return sessionStorage;
				break;
			default:
				throw Error('invalid storage type');
		}
	}

}