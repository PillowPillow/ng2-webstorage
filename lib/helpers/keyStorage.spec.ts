import {KeyStorageHelper} from './keyStorage';
import {LIB_KEY, LIB_KEY_SEPARATOR} from '../constants/lib';

describe('helper:keyStorage', () => {

	describe('setStorageKeyPrefix', () => {

		it('should change the storage key prefix', () => {

			let rawKey, newPrefix = 'foobar';
			rawKey = 'key';
			KeyStorageHelper.setStorageKeyPrefix(newPrefix);

			expect(KeyStorageHelper.genKey(rawKey)).not.toEqual(`${LIB_KEY}${LIB_KEY_SEPARATOR}${rawKey}`);
			expect(KeyStorageHelper.genKey(rawKey)).toEqual(`${newPrefix}${LIB_KEY_SEPARATOR}${rawKey}`);

		});

		afterAll(() => {
			KeyStorageHelper.setStorageKeyPrefix(LIB_KEY);
		});

	});

	describe('setStorageKeySeparator', () => {

		it('should change the storage key separator', () => {

			let rawKey, newSeparator = '.';
			rawKey = 'key';
			KeyStorageHelper.setStorageKeySeparator(newSeparator);

			expect(KeyStorageHelper.genKey(rawKey)).not.toEqual(`${LIB_KEY}${LIB_KEY_SEPARATOR}${rawKey}`);
			expect(KeyStorageHelper.genKey(rawKey)).toEqual(`${LIB_KEY}${newSeparator}${rawKey}`);

		});

		afterAll(() => {
			KeyStorageHelper.setStorageKeySeparator(LIB_KEY_SEPARATOR);
		});

	});

	describe('genKey', () => {

		it('should return a storage key', () => {

			let rawKey;

			rawKey = 'key';
			expect(KeyStorageHelper.genKey(rawKey)).toEqual(`${LIB_KEY}${LIB_KEY_SEPARATOR}${rawKey}`);

		});

		it('should throw an error', () => {

			let rawKey;

			rawKey = null;
			expect(() => KeyStorageHelper.genKey(rawKey)).toThrow();

			rawKey = undefined;
			expect(() => KeyStorageHelper.genKey(rawKey)).toThrow();

		});

	});

	describe('retrieveKeysFromStorage', () => {

		beforeAll(() => {
			sessionStorage.clear();
			localStorage.clear();
		});

		it('should\'nt throw any error', () => {

			expect(() => KeyStorageHelper.retrieveKeysFromStorage(sessionStorage)).not.toThrow();
			expect(() => KeyStorageHelper.retrieveKeysFromStorage(localStorage)).not.toThrow();

		});

		it('should return an empty array', () => {

			let sKeys;

			sKeys = KeyStorageHelper.retrieveKeysFromStorage(sessionStorage);
			expect(sKeys instanceof Array).toBe(true);
			expect(sKeys.length).toEqual(0);

			sKeys = KeyStorageHelper.retrieveKeysFromStorage(localStorage);
			expect(sKeys instanceof Array).toBe(true);
			expect(sKeys.length).toEqual(0);

		});

		it('should return an array of 2 elements', () => {

			let generatedKeys = [KeyStorageHelper.genKey('key1'), KeyStorageHelper.genKey('key2')], sKeys;

			localStorage.clear();
			sessionStorage.clear();

			generatedKeys.forEach((key) => sessionStorage.setItem(key, key));
			generatedKeys.forEach((key) => localStorage.setItem(key, key));


			sKeys = KeyStorageHelper.retrieveKeysFromStorage(localStorage);
			expect(sKeys.length).toEqual(generatedKeys.length);

			sKeys = KeyStorageHelper.retrieveKeysFromStorage(sessionStorage);
			expect(sKeys.length).toEqual(generatedKeys.length);

			localStorage.clear();
			sessionStorage.clear();

		});

	});
});
