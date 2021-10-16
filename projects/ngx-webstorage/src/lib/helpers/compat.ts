import {WebStorage} from '../core/interfaces/webStorage';

export class CompatHelper {

	static isStorageAvailable(storage: WebStorage): boolean {
		let available = true;
		try {
			if (typeof storage === 'object') {
				storage.setItem('test-storage', 'foobar');
				storage.removeItem('test-storage');
			}
			else available = false;
		} catch(e) {
			available = false;
		}
		return available;
	}

	static getUTCTime(): number {
		const d = new Date()
		return (d.getTime() + d.getTimezoneOffset()*60*1000)/1000;
	}	

}


