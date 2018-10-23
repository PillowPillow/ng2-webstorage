import {FactoryProvider} from '@angular/core';
import {SyncStorage} from '../core/templates/syncStorage';
import {StrategyIndex} from './strategyIndex';
import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {StorageStrategyType} from '../constants/strategy';

export class LocalStorageService extends SyncStorage {}

export function buildService(index: StrategyIndex) {
	const strategy: StorageStrategy<any> = index.getStrategy(StorageStrategyType.Local);
	return new SyncStorage(strategy);
}

export const LocalStorageServiceProvider: FactoryProvider = {
	provide: LocalStorageService,
	useFactory: buildService,
	deps: [StrategyIndex]
};
