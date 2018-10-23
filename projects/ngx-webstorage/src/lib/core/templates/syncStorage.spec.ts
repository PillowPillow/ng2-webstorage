import {StrategyIndex} from '../../services/strategyIndex';
import {StorageStrategyStub} from '../../../stubs/storageStrategy.stub';
import {SyncStorage} from './syncStorage';
import {StorageKeyManager} from '../../helpers/storageKeyManager';

describe('Core/Templates : SyncStorage', () => {
	
	let storageStrategy: StorageStrategyStub;
	let storage: SyncStorage;
	
	beforeEach(() => {
		storageStrategy = new StorageStrategyStub();
		StrategyIndex.set(storageStrategy.name, storageStrategy);
		storage = new SyncStorage(storageStrategy);
	});
	
	it('should retrieve a value by querying the strategy store', () => {
		
		storageStrategy.store = {
			[StorageKeyManager.normalize('prop')]: 'value'
		};
		expect(storage.retrieve('prop')).toEqual('value');
		expect(storage.retrieve('prop2')).toEqual(null);
	});
	
	it('should store the given value to the strategy storage', () => {
		storage.store('prop', 'value');
		expect(storageStrategy.store[StorageKeyManager.normalize('prop')]).toEqual('value');
	});
	
	it('should clear the strategy store for the given key', () => {
		storageStrategy.store = {
			[StorageKeyManager.normalize('prop')]: 'value',
			[StorageKeyManager.normalize('prop2')]: 'value2',
		};
		storage.clear('prop');
		expect(storage.retrieve('prop')).toEqual(null);
		expect(storage.retrieve('prop2')).toEqual('value2');
	});
	
	it('should clear the strategy store', () => {
		storageStrategy.store = {
			[StorageKeyManager.normalize('prop')]: 'value',
			[StorageKeyManager.normalize('prop2')]: 'value2',
		};
		storage.clear();
		expect(storage.retrieve('prop')).toEqual(null);
		expect(storage.retrieve('prop2')).toEqual(null);
	});
	
	it('should return the strategy name', () => {
		expect(storage.getStrategyName()).toEqual(storageStrategy.name);
	});
	
	it('should observe the storage changes for the given key', () => {
		const spyFn = jasmine.createSpy('spy');
		const sub = storage.observe('prop').subscribe(spyFn);
		storage.store('prop', 'value');
		storage.store('prop2', 'value'); // wrong property name
		storage.store('prop', 'value'); // same value
		storage.store('prop', 'value2');
		sub.unsubscribe();
		
		expect(spyFn).toHaveBeenCalledWith('value');
		expect(spyFn).toHaveBeenCalledWith('value2');
		expect(spyFn).toHaveBeenCalledTimes(2);
	});
	
});
