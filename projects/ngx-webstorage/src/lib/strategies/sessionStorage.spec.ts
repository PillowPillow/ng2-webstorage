import {inject, TestBed} from '@angular/core/testing';
import {STORAGE_STRATEGIES} from './index';
import {SessionStorageStrategy} from './sessionStorage';
import {StrategyIndex} from '../services/strategyIndex';
import {StrategyCacheService} from '../core/strategyCache';
import {StorageStrategies} from '../constants/strategy';
import {noop} from '../helpers/noop';
import {SESSION_STORAGE} from '../core/nativeStorage';
import {StorageStub} from '../../stubs/storage.stub';
import {WebStorage} from '../core/interfaces/webStorage';

describe('Strategies : SessionStorage', () => {

	let strategyCache: StrategyCacheService;
	let strategyIndex: StrategyIndex;
	let strategy: SessionStorageStrategy;
	let storage: WebStorage;

	beforeEach(() => {
		storage = new StorageStub();
		TestBed.configureTestingModule({
			providers: [
				{provide: SESSION_STORAGE, useFactory: () => storage},
				{provide: STORAGE_STRATEGIES, useClass: SessionStorageStrategy, multi: true},
			]
		});
	});

	beforeEach(inject([StrategyIndex, StrategyCacheService], (index: StrategyIndex, cache: StrategyCacheService) => {
		index.indexStrategies();
		strategyIndex = index;
		strategyCache = cache;
		strategy = index.getStrategy(StorageStrategies.Session) as SessionStorageStrategy;
	}));

	afterEach(() => {
		StrategyIndex.clear();
		strategyCache.clear(StorageStrategies.Session);
	});

	it('should set the given key-value pair', () => {

		strategy.set('prop', 42).subscribe(noop);
		expect(storage.getItem('prop')).toEqual('42');
		expect(strategyCache.get(StorageStrategies.Session, 'prop')).toEqual(42);
		expect(strategyCache.get('other', 'prop')).toBeUndefined();

	});

	it('should retrieve a value for the given key', () => {

		storage.setItem('prop', '42');

		let data: any;
		strategy.get('prop').subscribe((result: any) => data = result);
		expect(data).toEqual(42);

	});

	it('should remove the given key', () => {

		strategy.set('prop', 'value').subscribe(noop);
		strategy.set('prop2', 'value2').subscribe(noop);
		strategy.del('prop2').subscribe(noop);

		expect(storage.getItem('prop')).toEqual('"value"');
		expect(storage.getItem('prop2')).toBeNull();
		expect(strategyCache.get(StorageStrategies.Session, 'prop')).toEqual('value');
		expect(strategyCache.get(StorageStrategies.Session, 'prop2')).toBeUndefined();

	});

	it('should clean the strategy storage', () => {

		strategy.set('prop', 'value').subscribe(noop);
		strategy.set('prop2', 'value2').subscribe(noop);
		strategy.clear().subscribe(noop);

		expect(storage.getItem('prop')).toBeNull();
		expect(storage.getItem('prop2')).toBeNull();
		expect(strategyCache.get(StorageStrategies.Session, 'prop')).toBeUndefined();
		expect(strategyCache.get(StorageStrategies.Session, 'prop2')).toBeUndefined();

	});

	it('should observe the storage changes for the given key', () => {
		const spyFn = jasmine.createSpy('spy');
		const sub = strategy.keyChanges.subscribe(spyFn);
		strategy.set('prop', 1);
		strategy.set('prop', 2);
		strategy.set('prop', 2);
		expect(spyFn).toHaveBeenCalledTimes(3);
		strategy.set('prop2', 2);
		strategy.del('prop');
		strategy.clear();
		sub.unsubscribe();

		expect(spyFn).toHaveBeenCalledWith('prop');
		expect(spyFn).toHaveBeenCalledWith('prop2');
		expect(spyFn).toHaveBeenCalledWith(null);
		expect(spyFn).toHaveBeenCalledTimes(6);
	});
});
