import {IWebStorage} from '../interfaces/webStorage';
import {STORAGE} from '../enums/storage';
import {StorageObserverHelper} from './storageObserver';
import {KeyStorageHelper} from './keyStorage';
import {MockStorageHelper} from './mockStorage';
import {STORAGE_NAMES} from '../constants/lib';

export class WebStorageHelper {

	static cached = {[STORAGE.local]: {}, [STORAGE.session]: {}};
	static storageAvailability = {[STORAGE.local]: null, [STORAGE.session]: null};

	static store(sType: STORAGE, sKey: string, value: any): void {
		this.getStorage(sType).setItem(sKey, JSON.stringify(value));
		this.cached[sType][sKey] = value;
		StorageObserverHelper.emit(sType, sKey, value);
	}

	static retrieve(sType: STORAGE, sKey: string): string {
		if(this.cached[sType][sKey]) return this.cached[sType][sKey];

		let data = null;
		try {
			data = JSON.parse(this.getStorage(sType).getItem(sKey));
		} catch(err) {
			console.warn(`invalid value for ${sKey}`);
		}

		return this.cached[sType][sKey] = data;
	}

	static clearAll(sType: STORAGE): void {
		let storage: IWebStorage = this.getStorage(sType);
		KeyStorageHelper.retrieveKeysFromStorage(storage)
		.forEach((sKey) => {
			storage.removeItem(sKey);
			delete this.cached[sType][sKey];
			StorageObserverHelper.emit(sType, sKey, null);
		});
	}

	static clear(sType: STORAGE, sKey: string): void {
		this.getStorage(sType).removeItem(sKey);
		delete this.cached[sType][sKey];
		StorageObserverHelper.emit(sType, sKey, null);
	}

	static getStorage(sType: STORAGE): IWebStorage {
		return this.isStorageAvailable(sType) ? this.getWStorage(sType) : MockStorageHelper.getStorage(sType);
	}

	static getWStorage(sType: STORAGE): IWebStorage {
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

	static isStorageAvailable(sType: STORAGE) {
		if(typeof this.storageAvailability[sType] === 'boolean')
			return this.storageAvailability[sType];

		let isAvailable = true, storage = this.getWStorage(sType);

		if(typeof storage === 'object') {
			try {
				storage.setItem('test-storage', 'foobar');
				storage.removeItem('test-storage');
			} catch(e) {
				isAvailable = false;
			}
		}
		else isAvailable = false;

		if(!isAvailable) console.warn(`${STORAGE_NAMES[sType]} storage unavailable, Ng2Webstorage will use a fallback strategy instead`);
		return this.storageAvailability[sType] = isAvailable;
	}

}
