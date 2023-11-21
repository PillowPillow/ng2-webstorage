import {WebStorage} from '../core/interfaces/webStorage';

class CompatHelper {

	static isStorageAvailable(storage: WebStorage): boolean {
		let available = true;
		try {
			if (typeof storage === 'object') {
				storage.setItem('test-storage', 'foobar');
				storage.removeItem('test-storage');
			} else available = false;
		} catch(e) {
			available = false;
		}
		return available;
	}

}

export {CompatHelper};
