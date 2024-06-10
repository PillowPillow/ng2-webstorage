import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {StrategyIndex} from './services/strategyIndex';
import {STORAGE_STRATEGIES} from './strategies';
import {StorageStrategy} from './core/interfaces/storageStrategy';
import {StorageStrategyStub} from '../stubs/storageStrategy.stub';
import {LocalStorageStrategy} from './strategies/localStorage';
import {Component} from '@angular/core';
import {LocalStorage} from './decorators';
import {StorageKeyManager} from './helpers/storageKeyManager';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig } from './provider';
import { DefaultIsCaseSensitive, DefaultPrefix, DefaultSeparator } from './constants/config';

describe('Provider', () => {

	let strategyStub: StorageStrategy<any>;

	@Component({selector: 'lib-mock', template: ''})
	class LocalMockComponent {
		@LocalStorage() prop: string;
	}

	let testFixture: ComponentFixture<LocalMockComponent>;
	let testComponent: LocalMockComponent;

	beforeEach(() => {
		StorageKeyManager.setPrefix(DefaultPrefix);
		StorageKeyManager.setSeparator(DefaultSeparator);
		StorageKeyManager.setCaseSensitive(DefaultIsCaseSensitive);

		strategyStub = new StorageStrategyStub(LocalStorageStrategy.strategyName);

		TestBed.configureTestingModule({
			providers: [
				provideNgxWebstorage(withNgxWebstorageConfig({ prefix: 'new_prefix' }), withLocalStorage()),
				{provide: STORAGE_STRATEGIES, useFactory: () => strategyStub, multi: true},
			],
			declarations: [
				LocalMockComponent,
			],
		}).compileComponents();
		testFixture = TestBed.createComponent(LocalMockComponent);
		testComponent = testFixture.debugElement.componentInstance;
	});

	// The StrategyIndexer will skip indexing at the next beforeEach call if you dont clear the index
	afterEach(() => StrategyIndex.clear());

	it('should update the configuration prefix only', () => {
		expect(StorageKeyManager.prefix).toEqual('new_prefix');
		expect(StorageKeyManager.separator).toEqual(DefaultSeparator);
		expect(StorageKeyManager.isCaseSensitive).toEqual(DefaultIsCaseSensitive);
	})

	it('should index the storage strategies', inject([], () => {
		expect(StrategyIndex.hasRegistredStrategies()).toBeTruthy();
	}));

	it('should override the local strategy', inject([StrategyIndex], (index: StrategyIndex) => {
		const strategy = index.getStrategy(LocalStorageStrategy.strategyName);
		expect(strategy).toEqual(strategyStub);
	}));

	it('should access to the stub storage strategy by using decorators',
		/*The inject isn't mandatory here, it's just for example*/
		inject([StrategyIndex], (index: StrategyIndex) => {
			const strategy: StorageStrategyStub = strategyStub as StorageStrategyStub;
			// same than  const strategy: StorageStrategyStub = StorageStrategy.get(LocalStorageStrategy.strategyName) as StorageStrategyStub;
			// or  const strategy: StorageStrategyStub = index.getStrategy(LocalStorageStrategy.strategyName) as StorageStrategyStub;

			const propName: string = StorageKeyManager.normalize('prop');
			expect(strategy.store[propName]).toBeUndefined();
			testComponent.prop = 'foobar';

			expect(testComponent.prop).toEqual('foobar');
			expect(strategy.store[propName]).toEqual('foobar');
		})
	);
});

