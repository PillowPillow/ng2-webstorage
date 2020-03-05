import {inject, TestBed} from '@angular/core/testing';
import {NgxWebstorageModule, StrategyIndex} from 'ngx-webstorage';
import {CROSS_STORAGE_CLIENT} from '../cross-storage-client';
import {CrossStorageStrategy, CrossStorageStrategyProvider} from '../strategies/cross-storage';
import {CrossStorageClientStub} from '../stubs/cross-storage-client.stub';
import {CrossStorageService, CrossStorageServiceProvider} from './cross-storage';

describe('Services : CrossStorageService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NgxWebstorageModule.forRoot()],
			providers: [
				{provide: CROSS_STORAGE_CLIENT, useFactory: () => new CrossStorageClientStub()},
				CrossStorageStrategyProvider,
				CrossStorageServiceProvider,
			],
		});
	});

	beforeEach(inject([StrategyIndex], (index: StrategyIndex) => index.indexStrategies()));

	afterEach(() => StrategyIndex.clear());

	it('should provide the crossStorageService',
		inject([CrossStorageService], (storage: CrossStorageService) => {
			expect(storage).toBeDefined();
			expect(storage.getStrategyName()).toEqual(CrossStorageStrategy.strategyName);
		}),
	);

});

