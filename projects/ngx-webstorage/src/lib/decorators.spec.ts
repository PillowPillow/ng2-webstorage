import {LocalStorage, SessionStorage} from './decorators';
import {Component} from '@angular/core';
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {STORAGE_STRATEGIES} from './strategies';
import {LocalStorageStrategy} from './strategies/localStorage';
import {LOCAL_STORAGE, SESSION_STORAGE} from './core/nativeStorage';
import {StorageStub} from '../stubs/storage.stub';
import {StrategyIndex} from './services/strategyIndex';
import {StorageKeyManager} from './helpers/storageKeyManager';
import {StrategyCacheService} from './core/strategyCache';
import {StorageStrategies} from './constants/strategy';
import {SessionStorageStrategy} from './strategies/sessionStorage';

describe('Decorators', () => {
	
	describe('LocalStorage', () => {
		
		@Component({selector: 'mock', template: ''})
		class LocalMockComponent {
			@LocalStorage() prop: string;
			
			@LocalStorage('prop_num') prop2: number;
			
			@LocalStorage('prop_def', 'default') prop3: any;
		}
		
		let testFixture: ComponentFixture<LocalMockComponent>;
		let testComponent: LocalMockComponent;
		let strategyCache: StrategyCacheService;
		let storage: Storage;
		
		beforeEach(() => {
			storage = new StorageStub();
			TestBed.configureTestingModule({
				providers: [
					{provide: LOCAL_STORAGE, useFactory: () => storage},
					{provide: STORAGE_STRATEGIES, useClass: LocalStorageStrategy, multi: true},
				],
				declarations: [
					LocalMockComponent,
				],
			}).compileComponents();
			
			testFixture = TestBed.createComponent(LocalMockComponent);
			testComponent = testFixture.debugElement.componentInstance;
			
		});
		
		beforeEach(inject(
			[StrategyIndex, StrategyCacheService],
			(index: StrategyIndex, cache: StrategyCacheService) => {
				index.indexStrategies();
				strategyCache = cache;
			}
		));
		
		afterEach(() => StrategyIndex.clear());
		
		it('should bind a prop to the local strategy', () => {
			
			expect(storage.getItem(StorageKeyManager.normalize('prop'))).toBeNull();
			testComponent.prop = 'foobar';
			
			expect(testComponent.prop).toEqual('foobar');
			expect(storage.getItem(StorageKeyManager.normalize('prop'))).toEqual('"foobar"');
			
		});
		
		it('should use the cache if possible', () => {
			strategyCache.set(StorageStrategies.Local, StorageKeyManager.normalize('prop'), 'foobar');
			expect(testComponent.prop).toEqual('foobar');
			expect(storage.getItem(StorageKeyManager.normalize('prop'))).toBeNull();
		});
		
		it('should bind a prop with the given key instead of the attribute name', () => {
			testComponent.prop2 = 12;
			
			expect(testComponent.prop2).toEqual(12);
			expect(storage.getItem(StorageKeyManager.normalize('prop_num'))).toEqual('12');
		});
		
		it('should use the default value if there is no value in the cache and the storage', () => {
			
			expect(testComponent.prop3).toEqual('default');
			
			const key: string = StorageKeyManager.normalize('prop_def');
			expect(storage.getItem(key)).toBeNull();
			expect(strategyCache.get(StorageStrategies.Local, key)).toBeUndefined();
			
			const obj: any = {attr: 42};
			testComponent.prop3 = obj;
			expect(testComponent.prop3).toEqual(obj);
			expect(storage.getItem(key)).toEqual(JSON.stringify(obj));
			expect(strategyCache.get(StorageStrategies.Local, key)).toEqual(obj);
			
			// Shouldnt fallback to the default value if we set to null the property
			testComponent.prop3 = null;
			expect(testComponent.prop3).toBeNull();
			expect(storage.getItem(key)).toEqual('null');
			expect(strategyCache.get(StorageStrategies.Local, key)).toBeNull();
			
		});
		
	});
	
	describe('SessionStorage', () => {
		
		@Component({selector: 'mock', template: ''})
		class SessionMockComponent {
			@SessionStorage() prop: string;
			
			@SessionStorage('prop_num') prop2: number;
			
			@SessionStorage('prop_def', 'default') prop3: any;
		}
		
		let testFixture: ComponentFixture<SessionMockComponent>;
		let testComponent: SessionMockComponent;
		let strategyCache: StrategyCacheService;
		let storage: Storage;
		
		beforeEach(() => {
			storage = new StorageStub();
			TestBed.configureTestingModule({
				providers: [
					{provide: SESSION_STORAGE, useFactory: () => storage},
					{provide: STORAGE_STRATEGIES, useClass: SessionStorageStrategy, multi: true},
				],
				declarations: [
					SessionMockComponent,
				],
			}).compileComponents();
			
			testFixture = TestBed.createComponent(SessionMockComponent);
			testComponent = testFixture.debugElement.componentInstance;
			
		});
		
		beforeEach(inject(
			[StrategyIndex, StrategyCacheService],
			(index: StrategyIndex, cache: StrategyCacheService) => {
				index.indexStrategies();
				strategyCache = cache;
			}
		));
		
		afterEach(() => StrategyIndex.clear());
		
		it('should bind a prop to the session strategy', () => {
			
			expect(storage.getItem(StorageKeyManager.normalize('prop'))).toBeNull();
			testComponent.prop = 'foobar';
			
			expect(testComponent.prop).toEqual('foobar');
			expect(storage.getItem(StorageKeyManager.normalize('prop'))).toEqual('"foobar"');
			
		});
		
		it('should use the cache if possible', () => {
			strategyCache.set(StorageStrategies.Session, StorageKeyManager.normalize('prop'), 'foobar');
			expect(testComponent.prop).toEqual('foobar');
			expect(storage.getItem(StorageKeyManager.normalize('prop'))).toBeNull();
		});
		
		it('should bind a prop with the given key instead of the attribute name', () => {
			testComponent.prop2 = 12;
			
			expect(testComponent.prop2).toEqual(12);
			expect(storage.getItem(StorageKeyManager.normalize('prop_num'))).toEqual('12');
		});
		
		it('should use the default value if there is no value in the cache and the storage', () => {
			
			expect(testComponent.prop3).toEqual('default');
			
			const key: string = StorageKeyManager.normalize('prop_def');
			expect(storage.getItem(key)).toBeNull();
			expect(strategyCache.get(StorageStrategies.Session, key)).toBeUndefined();
			
			const obj: any = {attr: 42};
			testComponent.prop3 = obj;
			expect(testComponent.prop3).toEqual(obj);
			expect(storage.getItem(key)).toEqual(JSON.stringify(obj));
			expect(strategyCache.get(StorageStrategies.Session, key)).toEqual(obj);
			
			// Shouldnt fallback to the default value if we set to null the property
			testComponent.prop3 = null;
			expect(testComponent.prop3).toBeNull();
			expect(storage.getItem(key)).toEqual('null');
			expect(strategyCache.get(StorageStrategies.Session, key)).toBeNull();
			
		});
		
	});
});
