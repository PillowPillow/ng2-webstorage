import {IWebStorage} from '../interfaces/webStorage';
import {STORAGE} from '../enums/storage';
import {StorageObserverHelper} from './storageObserver';
import {KeyStorageHelper} from './keyStorage';
import {MockStorageHelper} from './mockStorage';
import {STORAGE_NAMES} from '../constants/lib';

const CACHED = {[STORAGE.local]: {}, [STORAGE.session]: {}};
const STORAGE_AVAILABILITY = {[STORAGE.local]: null, [STORAGE.session]: null};

export class WebStorageHelper {

	static store(sType:STORAGE, sKey:string, value:any):void {
		let serializedValue = value;
		if(typeof value === "object"){
			serializedValue = JSON.stringify(value);
		}
		this.getStorage(sType).setItem(sKey, serializedValue);
		CACHED[sType][sKey] = value;
		StorageObserverHelper.emit(sType, sKey, value);
	}

	static retrieve(sType:STORAGE, sKey:string):string {
		if(sKey in CACHED[sType]) return CACHED[sType][sKey];
		let value = this.retrieveFromStorage(sType, sKey);
		if(value !== null) CACHED[sType][sKey] = value;
		return value;
	}

	static retrieveFromStorage(sType:STORAGE, sKey:string) {
		let data = this.getStorage(sType).getItem(sKey);
		try {
			let parsedData = JSON.parse(data);
			if(parsedData && typeof parsedData === "object"){
				return parsedData;
			}
		} catch(err) {
			return data;
		}
		return data;
	}

	static refresh(sType:STORAGE, sKey:string) {
		if(!KeyStorageHelper.isManagedKey(sKey)) return;

		let value = WebStorageHelper.retrieveFromStorage(sType, sKey);
		if(value === null) {
			delete CACHED[sType][sKey];
			StorageObserverHelper.emit(sType, sKey, null);
		}
		else if(value !== CACHED[sType][sKey]) {
			CACHED[sType][sKey] = value;
			StorageObserverHelper.emit(sType, sKey, value);
		}
	}

	static refreshAll(sType:STORAGE):void {
		Object.keys(CACHED[sType]).forEach((sKey) => WebStorageHelper.refresh(sType, sKey));
	}

	static clearAll(sType:STORAGE):void {
		let storage:IWebStorage = this.getStorage(sType);
		KeyStorageHelper.retrieveKeysFromStorage(storage)
			.forEach((sKey) => {
				storage.removeItem(sKey);
				delete CACHED[sType][sKey];
				StorageObserverHelper.emit(sType, sKey, null);
			});
	}

	static clear(sType:STORAGE, sKey:string):void {
		this.getStorage(sType).removeItem(sKey);
		delete CACHED[sType][sKey];
		StorageObserverHelper.emit(sType, sKey, null);
	}

	static getStorage(sType:STORAGE):IWebStorage {
		if(this.isStorageAvailable(sType))
			return this.getWStorage(sType);
		else
			return MockStorageHelper.getStorage(sType);
	}

	static getWStorage(sType:STORAGE):IWebStorage {
		let storage;
		switch(sType) {
			case STORAGE.local:
				storage = localStorage;
				break;
			case STORAGE.session:
				storage = sessionStorage;
				break;
			default:
				throw Error('invalid storage type');
		}
		return storage;
	}

	static isStorageAvailable(sType:STORAGE) {
		if(typeof STORAGE_AVAILABILITY[sType] === 'boolean')
			return STORAGE_AVAILABILITY[sType];

		let isAvailable = true, storage;
		try {
			storage = this.getWStorage(sType);
			if(typeof storage === 'object') {
				storage.setItem('test-storage', 'foobar');
				storage.removeItem('test-storage');
			}
			else isAvailable = false;
		} catch(e) {
			isAvailable = false;
		}

		if(!isAvailable) console.warn(`${STORAGE_NAMES[sType]} storage unavailable, Ng2Webstorage will use a fallback strategy instead`);
		return STORAGE_AVAILABILITY[sType] = isAvailable;
	}

}
