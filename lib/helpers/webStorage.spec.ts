import {WebStorageHelper} from './webStorage';
import {STORAGE} from '../enums/storage';
import {StorageObserverHelper} from './storageObserver';
import {KeyStorageHelper} from './keyStorage';

describe('helper:webStorage', () => {

	describe('store', () => {

		it('should store the value in the given sessionStorage', () => {

			let value = 'session value';

			WebStorageHelper.store(STORAGE.session, 'webStorage:session:key', value);
			expect(sessionStorage.getItem('webStorage:session:key')).toEqual(JSON.stringify(value));

		});

		it('should store the value in the given localStorage', () => {

			let value = 'local value';

			WebStorageHelper.store(STORAGE.local, 'webStorage:local:key', value);
			expect(localStorage.getItem('webStorage:local:key')).toEqual(JSON.stringify(value));

		});

		it('should emit an event to the subscribers', (done) => {

			let event = StorageObserverHelper.observe(STORAGE.local, 'webStorage:local:key'),
				value = 'session value';

			let sub = event.subscribe((data) => {
				expect(data).toEqual(value);
				done();
			});

			WebStorageHelper.store(STORAGE.local, 'webStorage:local:key', value);
		});


	});

	describe('retrieve', () => {

		beforeAll(() => {
			sessionStorage.clear();
			localStorage.clear();
		});

		it('should retrieve a value from the localStorage', () => {

			let value = 'value', key = 'webStorage:local:key2';
			localStorage.setItem(key, JSON.stringify(value));
			expect(WebStorageHelper.retrieve(STORAGE.local, key)).toEqual(value);

		});

		it('should retrieve a value from the sessionStorage', () => {

			let value = 'value', key = 'webStorage:session:key2';
			sessionStorage.setItem(key, JSON.stringify(value));
			expect(WebStorageHelper.retrieve(STORAGE.session, key)).toEqual(value);

		});

		it('should retrieve a value from the cache', () => {

			let value = 'value', key = 'webStorage:session:key2';
			sessionStorage.setItem(key, JSON.stringify('other value'));
			expect(WebStorageHelper.retrieve(STORAGE.session, key)).toEqual(value);

		});

	});

	describe('clearAll', () => {

		let key1 = KeyStorageHelper.genKey('webStorage:key'),
			key2 = KeyStorageHelper.genKey('webStorage:key2');

		beforeAll(() => {

			WebStorageHelper.store(STORAGE.session, key1, 'value');
			WebStorageHelper.store(STORAGE.session, key2, 'value');

			WebStorageHelper.store(STORAGE.local, key1, 'value');
			WebStorageHelper.store(STORAGE.local, key2, 'value');

		});

		it('should clear the session storage and the associated cache', () => {

			expect(WebStorageHelper.retrieve(STORAGE.session, key1)).toEqual('value');
			expect(WebStorageHelper.retrieve(STORAGE.session, key2)).toEqual('value');

			WebStorageHelper.clearAll(STORAGE.session);

			expect(WebStorageHelper.retrieve(STORAGE.session, key1)).toEqual(null);
			expect(WebStorageHelper.retrieve(STORAGE.session, key2)).toEqual(null);

		});

		it('should clear the local storage and the associated cache', () => {

			expect(WebStorageHelper.retrieve(STORAGE.local, key1)).toEqual('value');
			expect(WebStorageHelper.retrieve(STORAGE.local, key2)).toEqual('value');

			WebStorageHelper.clearAll(STORAGE.local);

			expect(WebStorageHelper.retrieve(STORAGE.local, key1)).toEqual(null);
			expect(WebStorageHelper.retrieve(STORAGE.local, key2)).toEqual(null);

		});


	});

	describe('clear', () => {

		let key1 = KeyStorageHelper.genKey('webStorage:key');

		beforeAll(() => {

			WebStorageHelper.store(STORAGE.session, key1, 'value');
			WebStorageHelper.store(STORAGE.local, key1, 'value');

		});

		it('should clear the session storage and the associated cache', () => {

			expect(WebStorageHelper.retrieve(STORAGE.session, key1)).toEqual('value');

			WebStorageHelper.clearAll(STORAGE.session);

			expect(WebStorageHelper.retrieve(STORAGE.session, key1)).toEqual(null);

		});

		it('should clear the local storage and the associated cache', () => {

			expect(WebStorageHelper.retrieve(STORAGE.local, key1)).toEqual('value');

			WebStorageHelper.clearAll(STORAGE.local);

			expect(WebStorageHelper.retrieve(STORAGE.local, key1)).toEqual(null);

		});

		it('should emit an event to the subscribers', (done) => {

			let event = StorageObserverHelper.observe(STORAGE.local, key1),
				result = null;

			let sub = event.subscribe((data) => {
				expect(data).toEqual(result);
				done();
			});

			event.emit(null);

		});

	});

	describe('getWStorage', () => {

		it('should return the localstorage', () => {

			expect(WebStorageHelper.getWStorage(STORAGE.local) === localStorage).toBe(true);

		});

		it('should return the sessionstorage', () => {

			expect(WebStorageHelper.getWStorage(STORAGE.session) === sessionStorage).toBe(true);

		});

	});

});
