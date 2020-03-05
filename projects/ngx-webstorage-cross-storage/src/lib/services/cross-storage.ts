import {FactoryProvider} from '@angular/core';
import {AsyncStorage, StorageStrategy, StrategyIndex} from 'ngx-webstorage';
import {CrossStorageStrategy} from '../strategies/cross-storage';

export class CrossStorageService extends AsyncStorage {
	constructor(strategy: StorageStrategy<any>) {
		super(strategy);
	}
}

export function buildService(index: StrategyIndex) {
	const strategy: StorageStrategy<any> = index.indexStrategy(CrossStorageStrategy.strategyName);
	return new CrossStorageService(strategy);
}

export const CrossStorageServiceProvider: FactoryProvider = {
	provide: CrossStorageService,
	useFactory: buildService,
	deps: [StrategyIndex],
};
