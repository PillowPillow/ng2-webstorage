import {inject, TestBed} from '@angular/core/testing';
import {NgxWebstorageModule, StrategyCacheService, StrategyIndex} from 'ngx-webstorage';
import {CrossStorageClientStub} from '../stubs/cross-storage-client.stub';
import {CrossStorageStrategy, CrossStorageStrategyProvider} from './cross-storage';
import {CROSS_STORAGE, CrossStorageClientFacade} from '../utils/cross-storage-facade';

describe('Strategies : CrossStorage', () => {

	let strategyCache: StrategyCacheService;
	let strategyIndex: StrategyIndex;
	let strategy: CrossStorageStrategy;
	let client: CrossStorageClientStub;

	beforeEach(() => {
		client = new CrossStorageClientStub();
		TestBed.configureTestingModule({
			imports: [NgxWebstorageModule.forRoot()],
			providers: [
				{provide: CROSS_STORAGE, useFactory: () => new CrossStorageClientFacade(client)},
				CrossStorageStrategyProvider
			],
		});
	});

	beforeEach(inject([StrategyIndex, StrategyCacheService], (index: StrategyIndex, cache: StrategyCacheService) => {
		index.indexStrategies();
		strategyIndex = index;
		strategyCache = cache;
		strategy = index.getStrategy(CrossStorageStrategy.strategyName) as CrossStorageStrategy;
	}));

	afterEach(() => {
		StrategyIndex.clear();
		strategyCache.clear(CrossStorageStrategy.strategyName);
	});

	it('should set the given key-value pair', async () => {
		await strategy.set('prop', 42).toPromise();

		const result = await client.get('prop');
		expect(result).toEqual('42');
		expect(strategyCache.get(CrossStorageStrategy.strategyName, 'prop')).toEqual(42);
		expect(strategyCache.get('other', 'prop')).toBeUndefined();
	});

	it('should retrieve a value for the given key', async () => {

		await client.set('prop', '42');

		const data: any = await strategy.get('prop').toPromise();
		expect(data).toEqual(42);

	});

	it('should remove the given key', async () => {

		await strategy.set('prop', 'value').toPromise();
		await strategy.set('prop2', 'value2').toPromise();
		await strategy.del('prop2').toPromise();

		const propVal = await client.get('prop');
		expect(propVal).toEqual('"value"');
		const prop2Val = await client.get('prop2');
		expect(prop2Val).toBeNull();
		expect(strategyCache.get(CrossStorageStrategy.strategyName, 'prop')).toEqual('value');
		expect(strategyCache.get(CrossStorageStrategy.strategyName, 'prop2')).toBeUndefined();

	});

	it('should clean the strategy storage', async () => {

		await strategy.set('prop', 'value').toPromise();
		await strategy.set('prop2', 'value2').toPromise();
		await strategy.clear().toPromise();

		const propVal = await client.get('prop');
		expect(propVal).toBeNull();
		const prop2Val = await client.get('prop2');
		expect(prop2Val).toBeNull();
		expect(strategyCache.get(CrossStorageStrategy.strategyName, 'prop')).toBeUndefined();
		expect(strategyCache.get(CrossStorageStrategy.strategyName, 'prop2')).toBeUndefined();

	});

	it('should observe the storage changes for the given key', async () => {
		const spyFn = jasmine.createSpy('spy');
		const sub = strategy.keyChanges.subscribe(spyFn);
		await strategy.set('prop', 1).toPromise();
		await strategy.set('prop', 2).toPromise();
		await strategy.set('prop', 2).toPromise();
		expect(spyFn).toHaveBeenCalledTimes(3);
		await strategy.set('prop2', 2).toPromise();
		await strategy.del('prop').toPromise();
		await strategy.clear().toPromise();
		sub.unsubscribe();

		expect(spyFn).toHaveBeenCalledWith('prop');
		expect(spyFn).toHaveBeenCalledWith('prop2');
		expect(spyFn).toHaveBeenCalledWith(null);
		expect(spyFn).toHaveBeenCalledTimes(6);
	});
});
