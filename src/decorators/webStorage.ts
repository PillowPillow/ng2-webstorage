import {KeyStorageHelper} from '../helpers';
import {STORAGE} from '../enums/storage';
import {WebStorageHelper, StorageObserverHelper} from '../helpers';

export function WebStorage(webSKey:string, sType:STORAGE) {
	return (targetedClass:Object, raw:string) => {
		let key = webSKey || raw,
			sKey = KeyStorageHelper.genKey(key);

		Object.defineProperty(targetedClass, raw, {
			get: function() {
				return WebStorageHelper.retrieve(sType, sKey);
			},
			set: function(value) {
				this[sKey] = value;
				WebStorageHelper.store(sType, sKey, value);
			}
		});
	};
}
