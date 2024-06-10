import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {withCrossStorage} from './provider';
import {Component} from '@angular/core';
import {CrossStorageClientStub} from './stubs/cross-storage-client.stub';
import {
	LocalStorage, LocalStorageStrategy, provideNgxWebstorage, SessionStorageStrategy, StrategyIndex, withLocalStorage, withSessionStorage
} from 'ngx-webstorage';
import {CrossStorageStrategy} from './strategies/cross-storage';
import {CrossStorageService} from './services/cross-storage';
import {CROSS_STORAGE_CONFIG, CrossStorageConfig} from './config';
import {CROSS_STORAGE_CLIENT} from './utils/cross-storage-client';

describe('NgxWebstorageCrossStorageStrategyModule', () => {

	@Component({selector: 'mock', template: ''})
	class LocalMockComponent {
		@LocalStorage() prop: string;
	}

	let testFixture: ComponentFixture<LocalMockComponent>;
	let testComponent: LocalMockComponent;
	let clientStub: CrossStorageClientStub;

	beforeEach(() => {
		clientStub = new CrossStorageClientStub();
		TestBed.configureTestingModule({
			providers: [
				provideNgxWebstorage(
					withCrossStorage({
						host: 'http://foo.bar',
					}),
					withLocalStorage(),
					withSessionStorage()
				),
				{provide: CROSS_STORAGE_CLIENT, useValue: clientStub},
			],
			declarations: [
				LocalMockComponent,
			],
		}).compileComponents();
		testFixture = TestBed.createComponent(LocalMockComponent);
		testComponent = testFixture.debugElement.componentInstance;
	});

	afterEach(() => StrategyIndex.clear());

	it('should have indexed strategies',
		inject([], () => {
			expect(StrategyIndex.hasRegistredStrategies()).toBeTruthy();
		}),
	);

	it('should index the native strategies',
		inject([], () => {
			expect(StrategyIndex.isStrategyRegistered(LocalStorageStrategy.strategyName)).toBeTruthy();
			expect(StrategyIndex.isStrategyRegistered(SessionStorageStrategy.strategyName)).toBeTruthy();
		}),
	);

	it('should index the crossStorageStrategy',
		inject([], () => {
			expect(StrategyIndex.isStrategyRegistered(CrossStorageStrategy.strategyName)).toBeTruthy();
		}),
	);

	it('should provide the cross storage service',
		inject([CrossStorageService], (storage: CrossStorageService) => {
			expect(storage).toBeDefined();
			expect(storage instanceof CrossStorageService).toBeTruthy();
		}),
	);

	it('should configure the cross storage client',
		inject([CROSS_STORAGE_CONFIG], (conf: CrossStorageConfig) => {
			expect(conf.host).toEqual('http://foo.bar');
		}),
	);

});
