import {inject, TestBed} from '@angular/core/testing';
import {STORAGE_STRATEGIES} from '../strategies';
import {InvalidStrategyError, StrategyIndex} from './strategyIndex';
import {StorageStrategyStub, StorageStrategyStubName} from '../../stubs/storageStrategy.stub';
import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {InMemoryStorageStrategy} from '../strategies/inMemory';
import {StorageStrategies} from '../constants/strategy';

describe('Services : StrategyIndex', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{provide: STORAGE_STRATEGIES, useClass: InMemoryStorageStrategy, multi: true},
				{provide: STORAGE_STRATEGIES, useClass: StorageStrategyStub, multi: true},
			]
		});
	});

	afterEach(() => {
		StrategyIndex.clear();
	});

	it('should register the given strategy', inject(
		[StrategyIndex],
		(index: StrategyIndex) => {
			expect(() => index.getStrategy(StorageStrategyStubName)).toThrowError(InvalidStrategyError);

			let strategy: StorageStrategy<any> = new StorageStrategyStub();
			index.register(StorageStrategyStubName, strategy);
			expect(() => index.register(StorageStrategyStubName, strategy, true)).not.toThrowError();

			strategy = index.getStrategy(StorageStrategyStubName);
			expect(strategy).toBeDefined();
			expect(strategy.name).toEqual(StorageStrategyStubName);
		})
	);

	it('should index the referenced strategies', inject(
		[StrategyIndex],
		(index: StrategyIndex) => {
			expect(() => index.getStrategy(StorageStrategyStubName)).toThrowError(InvalidStrategyError);
			expect(() => index.getStrategy(StorageStrategies.InMemory)).toThrowError(InvalidStrategyError);

			index.indexStrategies();

			let strategy: StorageStrategy<any> = index.getStrategy(StorageStrategyStubName);
			expect(strategy).toBeDefined();
			expect(strategy.name).toEqual(StorageStrategyStubName);

			strategy = index.getStrategy(StorageStrategies.InMemory);
			expect(strategy).toBeDefined();
			expect(strategy.name).toEqual(StorageStrategies.InMemory);

			const strategyNames: string[] = Object.keys(StrategyIndex.index);
			expect(strategyNames.length).toEqual(2);
			expect(strategyNames).toContain(StorageStrategies.InMemory);
			expect(strategyNames).toContain(StorageStrategyStubName);
		})
	);

	describe('Registered strategy manipulation', () => {

		beforeEach(inject([StrategyIndex], (index: StrategyIndex) => index.indexStrategies()));

		it('should declare that there is registered strategies', () => {
			expect(StrategyIndex.hasRegistredStrategies).toBeTruthy();
		});

		it('should clear the index', () => {
			expect(Object.keys(StrategyIndex.index).length).toEqual(2);

			StrategyIndex.clear(StorageStrategies.InMemory);
			expect(Object.keys(StrategyIndex.index).length).toEqual(1);
			expect(StrategyIndex.index[StorageStrategyStubName]).toBeDefined();

			StrategyIndex.clear();
			expect(Object.keys(StrategyIndex.index).length).toEqual(0);
		});

		it('should retrieve the given strategy', inject(
			[StrategyIndex],
			(index: StrategyIndex) => {

				let strategy: StorageStrategy<any> = index.getStrategy(StorageStrategyStubName);
				expect(strategy).toBeDefined();
				expect(strategy.name).toEqual(StorageStrategyStubName);

				strategy = StrategyIndex.get(StorageStrategies.InMemory);
				expect(strategy).toBeDefined();
				expect(strategy.name).toEqual(StorageStrategies.InMemory);

			})
		);

		it('should overwrite a strategy by the one given', inject(
			[StrategyIndex],
			(index: StrategyIndex) => {

				const stub: StorageStrategy<any> = index.getStrategy(StorageStrategyStubName);

				StrategyIndex.set(StorageStrategies.InMemory, stub);

				const strategy: StorageStrategy<any> = index.getStrategy(StorageStrategies.InMemory);
				expect(strategy).toBeDefined();
				expect(strategy.name).toEqual(StorageStrategyStubName);
			})
		);

		it('should fallback to the InMemory strategy if the requested one is not available', inject(
			[StrategyIndex],
			(index: StrategyIndex) => {

				const stub: StorageStrategyStub = StrategyIndex.get(StorageStrategyStubName) as StorageStrategyStub;
				stub._available = false;

				const strategy: StorageStrategy<any> = index.getStrategy(StorageStrategyStubName);
				expect(strategy).toBeDefined();
				expect(strategy.name).toEqual(StorageStrategies.InMemory);
			})
		);
	});

});

