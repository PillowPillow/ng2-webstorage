import {StorageKeyManager} from './storageKeyManager';
import {DefaultIsCaseSensitive, DefaultPrefix, DefaultSeparator} from '../constants/config';

describe('Helpers : StorageKeyManager', () => {
	
	beforeEach(() => {
		StorageKeyManager.prefix = DefaultPrefix;
		StorageKeyManager.separator = DefaultSeparator;
		StorageKeyManager.isCaseSensitive = DefaultIsCaseSensitive;
	});
	
	it('should update the prefix used by the normalization process', () => {
		expect(StorageKeyManager.prefix).toEqual(DefaultPrefix);
		StorageKeyManager.setPrefix('new_prefix');
		expect(StorageKeyManager.prefix).toEqual('new_prefix');
	});
	
	it('should update the separator used by the normalization process', () => {
		expect(StorageKeyManager.separator).toEqual(DefaultSeparator);
		StorageKeyManager.setSeparator('new_separator');
		expect(StorageKeyManager.separator).toEqual('new_separator');
	});
	
	it('should update the case sensitive option used by the normalization process', () => {
		expect(StorageKeyManager.isCaseSensitive).toEqual(DefaultIsCaseSensitive);
		StorageKeyManager.setCaseSensitive(!DefaultIsCaseSensitive);
		expect(StorageKeyManager.isCaseSensitive).toEqual(!DefaultIsCaseSensitive);
	});
	
	it('should update the options by consuming the given configuration', () => {
		StorageKeyManager.consumeConfiguration({
			caseSensitive: !DefaultPrefix,
			prefix: 'new_prefix',
			separator: 'new_separator'
		});
		expect(StorageKeyManager.prefix).toEqual('new_prefix');
		expect(StorageKeyManager.isCaseSensitive).toEqual(!DefaultPrefix);
		expect(StorageKeyManager.separator).toEqual('new_separator');
	});
	
	it('should determine if the given key is a managed key', () => {
		
		expect(StorageKeyManager.isNormalizedKey('random_key')).toBeFalsy();
		expect(StorageKeyManager.isNormalizedKey(`${StorageKeyManager.prefix}--random_key`)).toBeFalsy();
		
		const key: string = StorageKeyManager.normalize('random_key');
		expect(StorageKeyManager.isNormalizedKey(key)).toBeTruthy();
		
	});
	
	it('should normalize the given key', () => {
		expect(StorageKeyManager.normalize('RANDOM_KEY')).toEqual(`${StorageKeyManager.prefix}${StorageKeyManager.separator}random_key`);
		StorageKeyManager.setCaseSensitive(true);
		expect(StorageKeyManager.normalize('RANDOM_KEY')).toEqual(`${StorageKeyManager.prefix}${StorageKeyManager.separator}RANDOM_KEY`);
	});
	
});
