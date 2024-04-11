import {InjectionToken, Provider} from '@angular/core';
import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {LocalStorageStrategy} from './localStorage';
import {SessionStorageStrategy} from './sessionStorage';
import {InMemoryStorageStrategy} from './inMemory';

export const STORAGE_STRATEGIES: InjectionToken<StorageStrategy<any>> = new InjectionToken<StorageStrategy<any>>('STORAGE_STRATEGIES');

export const Strategies: Provider[] = [
	{provide: STORAGE_STRATEGIES, useClass: InMemoryStorageStrategy, multi: true},
	{provide: STORAGE_STRATEGIES, useClass: LocalStorageStrategy, multi: true},
	{provide: STORAGE_STRATEGIES, useClass: SessionStorageStrategy, multi: true},
];

export const [InMemoryStorageStrategyProvider, LocalStorageStrategyProvider, SessionStorageStrategyProvider] = Strategies;
