import {inject, TestBed} from '@angular/core/testing';
import {StrategyCacheService} from './strategyCache';

describe('Core : StrategyCacheService', () => {
	
	let strategyCache: StrategyCacheService;
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				StrategyCacheService
			]
		});
	});
	
	beforeEach(inject([StrategyCacheService], (service: StrategyCacheService) => {
		strategyCache = service;
	}));
	
	it('should set and retrieve the given value', () => {
		strategyCache.set('name', 'prop', 'value');
		expect(strategyCache.get('name', 'prop')).toEqual('value');
		expect(strategyCache.get('name2', 'prop')).toBeUndefined();
	});
	
	it('should remove the given key-value', () => {
		strategyCache.set('name', 'prop', 'value');
		strategyCache.set('name2', 'prop2', 'value2');
		
		expect(strategyCache.get('name', 'prop')).toEqual('value');
		strategyCache.del('name2', 'prop'); // wrong namespace
		expect(strategyCache.get('name', 'prop')).toEqual('value', 'wrong namespace');
		strategyCache.del('name', 'prop2'); // wrong namespace
		expect(strategyCache.get('name', 'prop')).toEqual('value', 'wrong property');
		
		strategyCache.del('name', 'prop');
		expect(strategyCache.get('name', 'prop')).toBeUndefined();
		expect(strategyCache.get('name2', 'prop2')).toEqual('value2');
	});
	
	it('should clear the given strategy cache store', () => {
		strategyCache.set('name', 'prop', 'value');
		strategyCache.set('name', 'prop2', 'value2');
		strategyCache.set('name2', 'prop2', 'value2');
		
		strategyCache.clear('name');
		expect(strategyCache.get('name', 'prop')).toBeUndefined();
		expect(strategyCache.get('name', 'prop2')).toBeUndefined();
		expect(strategyCache.get('name2', 'prop2')).toEqual('value2');
	});
	
});
