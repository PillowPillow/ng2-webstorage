import {KeyStorageHelper, WebStorageHelper} from '../helpers/index';
import {STORAGE} from '../enums/storage';

export const WebStorage = function WebStorageDecorator(webSKey:string, sType:STORAGE) {
	return (targetedClass:Object, raw:string) => {
		let key = webSKey || raw;
		Object.defineProperty(targetedClass, raw, {
			get: function() {
				let sKey = KeyStorageHelper.genKey(key);
				return WebStorageHelper.retrieve(sType, sKey);
			},
			set: function(value) {
				let sKey = KeyStorageHelper.genKey(key);
				this[sKey] = value;
				WebStorageHelper.store(sType, sKey, value);
			}
		});
	};
};
