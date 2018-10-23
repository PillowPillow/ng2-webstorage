import {inject, TestBed} from '@angular/core/testing';
import {SESSION_STORAGE, SessionStorageProvider} from '../core/nativeStorage';
import {SessionStorageService, SessionStorageServiceProvider} from './sessionStorage';
import {StorageStrategyType} from '../constants/strategy';
import {SessionStorageStrategy} from '../strategies/sessionStorage';
import {STORAGE_STRATEGIES} from '../strategies';
import {StrategyIndex} from './strategyIndex';

describe('Services : SessionStorageService', () => {
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SessionStorageProvider,
				{provide: STORAGE_STRATEGIES, useClass: SessionStorageStrategy, multi: true},
				SessionStorageServiceProvider
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
	
	it('should provide the sessionStorageService', inject(
		[SessionStorageService],
		(storage: SessionStorageService) => {
			expect(storage).toBeDefined();
			expect(storage.getStrategyName()).toEqual(StorageStrategyType.Session);
		})
	);
	
});

