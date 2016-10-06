import {IWebStorage} from '../interfaces/webStorage';
import {STORAGE} from '../enums/storage';

export class MockStorageHelper {

	static securedFields = ['setItem', 'getItem', 'removeItem', 'length'];
	static mockStorages = {};

	static isSecuredField(field) {
		return !!~MockStorageHelper.securedFields.indexOf(field);
	}

	static getStorage(sType: STORAGE): IWebStorage {
		if(!this.mockStorages[sType])
			this.mockStorages[sType] = MockStorageHelper.generateStorage();

		return this.mockStorages[sType];
	}

	static generateStorage(): IWebStorage {
		let storage = <IWebStorage>{};

		Object.defineProperties(storage, {
			setItem: {
				writable: false,
				enumerable: false,
				configurable: false,
				value: function(key, value) {
					if(!MockStorageHelper.isSecuredField(key)) this[key] = value;
				},
			},
			getItem: {
				writable: false,
				enumerable: false,
				configurable: false,
				value: function(key) {
					return !MockStorageHelper.isSecuredField(key) ? this[key] || null : null;
				},
			},
			removeItem: {
				writable: false,
				enumerable: false,
				configurable: false,
				value: function(key) {
					if(!MockStorageHelper.isSecuredField(key)) delete this[key];
				},
			},
			length: {
				enumerable: false,
				configurable: false,
				get() {
					return Object.keys(this).length;
				}
			}
		});

		return storage;
	}

}
