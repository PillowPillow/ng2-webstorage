import {FactoryProvider} from '@angular/core';
import {SyncStorage} from '../core/templates/syncStorage';
import {StrategyIndex} from './strategyIndex';
import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {StorageStrategies} from '../constants/strategy';

class SessionStorageService extends SyncStorage {}

export {SessionStorageService};

export function buildService(index: StrategyIndex) {
	const strategy: StorageStrategy<any> = index.indexStrategy(StorageStrategies.Session);
	return new SyncStorage(strategy);
}

export const SessionStorageServiceProvider: FactoryProvider = {
	provide: SessionStorageService,
	useFactory: buildService,
	deps: [StrategyIndex]
};
