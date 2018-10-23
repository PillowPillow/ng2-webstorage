import {DecoratorBuilder} from './decoratorBuilder';
import {StrategyIndex} from '../services/strategyIndex';
import {StorageStrategyStub} from '../../stubs/storageStrategy.stub';
import {StorageKeyManager} from './storageKeyManager';

describe('Helpers : DecoratorBuilder', () => {
	let storageStrategy: StorageStrategyStub;
	
	beforeEach(() => {
		storageStrategy = new StorageStrategyStub();
		StrategyIndex.set(storageStrategy.name, storageStrategy);
	});
	
	afterEach(() => {
		StrategyIndex.clear(storageStrategy.name);
	});
	
	it('should add Get/Set accessors for the given propName', () => {
		const obj: any = {};
		
		DecoratorBuilder.buildSyncStrategyDecorator(storageStrategy.name, obj, 'prop');
		
		const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop');
		expect(descriptor.hasOwnProperty('get')).toBeTruthy();
		expect(descriptor.hasOwnProperty('set')).toBeTruthy();
	});
	
	it('should use the given strategy to store and retrieve values', () => {
		const obj: any = {};
		
		DecoratorBuilder.buildSyncStrategyDecorator(storageStrategy.name, obj, 'prop');
		
		obj.prop = 'value';
		expect(obj.prop).toEqual('value');
		
		const {store} = storageStrategy;
		const keys = Object.keys(store);
		const values = Object.values(store);
		
		expect(keys.length).toEqual(1);
		expect(keys[0]).toEqual(StorageKeyManager.normalize('prop'));
		expect(values[0]).toEqual('value');
	});
	
	it('should use the given key instead of the prop name', () => {
		const obj: any = {};
		
		DecoratorBuilder.buildSyncStrategyDecorator(storageStrategy.name, obj, 'prop', 'key');
		
		obj.prop = 'value';
		expect(obj.prop).toEqual('value');
		
		const {store} = storageStrategy;
		const keys = Object.keys(store);
		const values = Object.values(store);
		
		expect(keys.length).toEqual(1);
		expect(keys[0]).toEqual(StorageKeyManager.normalize('key'));
		expect(values[0]).toEqual('value');
	});
	
	it('should return the default value if there is no value in the store for the given key', () => {
		const obj: any = {};
		
		DecoratorBuilder.buildSyncStrategyDecorator(storageStrategy.name, obj, 'prop', 'key', 'default value');
		
		expect(obj.prop).toEqual('default value');
		
		const {store} = storageStrategy;
		const keys = Object.keys(store);
		expect(keys.length).toEqual(0);
	});
	
});
