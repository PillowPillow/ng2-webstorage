import {inject, TestBed} from '@angular/core/testing';
import {STORAGE_STRATEGIES} from './index';
import {InMemoryStorageStrategy} from './inMemory';
import {StrategyIndex} from '../services/strategyIndex';
import {StrategyCacheService} from '../core/strategyCache';
import {StorageStrategies} from '../constants/strategy';
import {noop} from '../helpers/noop';
import {CompatHelper} from '../helpers/compat';

describe('Strategies : InMemory', () => {
	
	let strategyCache: StrategyCacheService;
	let strategyIndex: StrategyIndex;
	let strategy: InMemoryStorageStrategy;
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{provide: STORAGE_STRATEGIES, useClass: InMemoryStorageStrategy, multi: true},
			]
		});
	});
	
	beforeEach(inject([StrategyIndex, StrategyCacheService], (index: StrategyIndex, cache: StrategyCacheService) => {
		index.indexStrategies();
		strategyIndex = index;
		strategyCache = cache;
		strategy = index.getStrategy(StorageStrategies.InMemory) as InMemoryStorageStrategy;
	}));
	
	afterEach(() => {
		StrategyIndex.clear();
		strategyCache.clear(StorageStrategies.InMemory);
	});
	
	it('should set the given key-value pair', () => {
		
		strategy.set('prop', 'value').subscribe(noop);
		expect(strategyCache.get(StorageStrategies.InMemory, 'prop')).toEqual('value');
		expect(strategyCache.get('other', 'prop')).toBeUndefined();
		
	});
	
	it('should retrieve a value for the given key', () => {
		
		strategy.set('prop', 'value').subscribe(noop);
		
		let data: any;
		strategy.get('prop').subscribe((result: any) => data = result);
		expect(data).toEqual('value');
		
	});
	
	it('should remove the given key', () => {
		
		strategy.set('prop', 'value').subscribe(noop);
		strategy.set('prop2', 'value2').subscribe(noop);
		strategy.del('prop2').subscribe(noop);
		
		expect(strategyCache.get(StorageStrategies.InMemory, 'prop')).toEqual('value');
		expect(strategyCache.get(StorageStrategies.InMemory, 'prop2')).toBeUndefined();
		
	});
	
	it('should clean the strategy storage', () => {
		
		strategy.set('prop', 'value').subscribe(noop);
		strategy.set('prop2', 'value2').subscribe(noop);
		strategy.clear().subscribe(noop);
		
		expect(strategyCache.get(StorageStrategies.InMemory, 'prop')).toBeUndefined();
		expect(strategyCache.get(StorageStrategies.InMemory, 'prop2')).toBeUndefined();
		
	});

	it('should set the given key-value pair with expiration as not expired yet', () => {
		
		strategy.set('prop', 'value', 10).subscribe(noop);
		const cacheValue = strategyCache.get(StorageStrategies.InMemory, 'prop');
		expect(cacheValue._v).toEqual('value');
	});

	it('should set the given key-value pair as already expired', () => {
		
		strategy.set('prop', 'value', -10).subscribe(noop);
		const cacheValue = strategyCache.get(StorageStrategies.InMemory, 'prop');
		expect(cacheValue._e_in < CompatHelper.getUTCTime()).toBeTruthy();
	});
});
