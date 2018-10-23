import {StrategyIndex} from '../../services/strategyIndex';
import {StorageStrategyStub} from '../../../stubs/storageStrategy.stub';
import {AsyncStorage} from './asyncStorage';
import {StorageKeyManager} from '../../helpers/storageKeyManager';
import {noop} from '../../helpers/noop';

describe('Core/Templates : AsyncStorage', () => {
	
	let storageStrategy: StorageStrategyStub;
	let storage: AsyncStorage;
	
	beforeEach(() => {
		storageStrategy = new StorageStrategyStub();
		StrategyIndex.set(storageStrategy.name, storageStrategy);
		storage = new AsyncStorage(storageStrategy);
	});
	
	it('should retrieve a value by querying the strategy store', () => {
		
		storageStrategy.store = {
			[StorageKeyManager.normalize('prop')]: 'value'
		};
		
		let data: any;
		storage.retrieve('prop').subscribe((result) => data = result);
		expect(data).toEqual('value');
		
		data = undefined;
		storage.retrieve('prop2').subscribe((result) => data = result);
		expect(data).toEqual(null);
	});
	
	it('should store the given value to the strategy storage', () => {
		storage.store('prop', 'value').subscribe(noop);
		expect(storageStrategy.store[StorageKeyManager.normalize('prop')]).toEqual('value');
	});
	
	it('should clear the strategy store for the given key', () => {
		storageStrategy.store = {
			[StorageKeyManager.normalize('prop')]: 'value',
			[StorageKeyManager.normalize('prop2')]: 'value2',
		};
		storage.clear('prop').subscribe(noop);
		
		let data: any;
		storage.retrieve('prop').subscribe((result) => data = result);
		expect(data).toEqual(null);
		
		data = undefined;
		storage.retrieve('prop2').subscribe((result) => data = result);
		expect(data).toEqual('value2');
	});
	
	it('should clear the strategy store', () => {
		storageStrategy.store = {
			[StorageKeyManager.normalize('prop')]: 'value',
			[StorageKeyManager.normalize('prop2')]: 'value2',
		};
		storage.clear().subscribe(noop);
		
		
		let data: any;
		storage.retrieve('prop').subscribe((result) => data = result);
		expect(data).toEqual(null);
		
		data = undefined;
		storage.retrieve('prop2').subscribe((result) => data = result);
		expect(data).toEqual(null);
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
