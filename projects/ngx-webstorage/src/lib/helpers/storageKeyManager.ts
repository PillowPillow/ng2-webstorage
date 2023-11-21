import {DefaultIsCaseSensitive, DefaultPrefix, DefaultSeparator} from '../constants/config';
import {NgxWebstorageConfiguration} from '../config';

class StorageKeyManager {

	static prefix = DefaultPrefix;
	static separator = DefaultSeparator;
	static isCaseSensitive = DefaultIsCaseSensitive;

	static normalize(raw: string) {
		raw = StorageKeyManager.isCaseSensitive ? raw : raw.toLowerCase();
		return `${StorageKeyManager.prefix}${StorageKeyManager.separator}${raw}`;
	}

	static isNormalizedKey(key: string) {
		return key.indexOf(StorageKeyManager.prefix + StorageKeyManager.separator) === 0;
	}

	static setPrefix(prefix: string) {
		StorageKeyManager.prefix = prefix;
	}

	static setSeparator(separator: string) {
		StorageKeyManager.separator = separator;
	}

	static setCaseSensitive(enable: boolean) {
		StorageKeyManager.isCaseSensitive = enable;
	}

	static consumeConfiguration(config: NgxWebstorageConfiguration) {
		if ('prefix' in config) this.setPrefix(config.prefix);
		if ('separator' in config) this.setSeparator(config.separator);
		if ('caseSensitive' in config) this.setCaseSensitive(config.caseSensitive);
	}
}

export {StorageKeyManager};
