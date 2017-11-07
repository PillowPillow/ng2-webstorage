import { IWebstorageConfig } from '../../dist/interfaces/config';
import { KeyStorageHelper } from '../helpers/keyStorage';

export function WebStorageConfig(config: IWebstorageConfig) {

	return function(targetedClass:Object, raw:string) {
		KeyStorageHelper.setCaseSensitivity(config.caseSensitive);
		KeyStorageHelper.setStorageKeyPrefix(config.prefix);
		KeyStorageHelper.setStorageKeySeparator(config.separator);
	};
};
