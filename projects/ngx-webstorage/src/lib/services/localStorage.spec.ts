import {inject, TestBed} from '@angular/core/testing';
import {LocalStorageProvider} from '../core/nativeStorage';
import {LocalStorageService, LocalStorageServiceProvider} from './localStorage';
import {StorageStrategyType} from '../constants/strategy';
import {LocalStorageStrategy} from '../strategies/localStorage';
import {STORAGE_STRATEGIES} from '../strategies';
import {StrategyIndex} from './strategyIndex';

describe('Services : LocalStorageService', () => {
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LocalStorageProvider,
				{provide: STORAGE_STRATEGIES, useClass: LocalStorageStrategy, multi: true},
				LocalStorageServiceProvider
			]
		});
	});
	
	beforeEach(inject(
		[StrategyIndex],
		(index: StrategyIndex) => {
			index.indexStrategies();
		})
	);
	
	afterEach(() => {
		StrategyIndex.del();
	});
	
	it('should provide the localStorageService', inject(
		[LocalStorageService],
		(storage: LocalStorageService) => {
			expect(storage).toBeDefined();
			expect(storage.getStrategyName()).toEqual(StorageStrategyType.Local);
		})
	);
	
});

