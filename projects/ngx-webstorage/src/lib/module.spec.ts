import {inject, TestBed} from '@angular/core/testing';
import {NgxWebstorageModule} from './module';
import {StrategyIndex} from './services/strategyIndex';
import {STORAGE_STRATEGIES} from './strategies';
import {StorageStrategy} from './core/interfaces/storageStrategy';
import {StorageStrategyStub} from '../stubs/storageStrategy.stub';
import {LocalStorageStrategy} from './strategies/localStorage';

describe('Module', () => {

	let strategyStub: StorageStrategy<any>;

	beforeEach(() => {
		strategyStub = new StorageStrategyStub(LocalStorageStrategy.strategyName);

		TestBed.configureTestingModule({
			imports: [
				NgxWebstorageModule.forRoot()
			],
			providers: [
				{provide: STORAGE_STRATEGIES, useFactory: () => strategyStub, multi: true},
			]
		});
	});

	it('should index the storage strategies', inject([], () => {
		expect(StrategyIndex.hasRegistredStrategies()).toBeTruthy();
	}));

	it('should override the local strategy', inject([StrategyIndex], (index: StrategyIndex) => {
		const strategy = index.getStrategy(LocalStorageStrategy.strategyName);
		expect(strategy).toEqual(strategyStub);
	}));

});

