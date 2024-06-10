import {APP_INITIALIZER, EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from '@angular/core';
import {LocalStorageProvider, SessionStorageProvider} from './core/nativeStorage';
import {Services} from './services/index';
import {Strategies} from './strategies/index';
import {StrategyIndex} from './services/strategyIndex';
import {NgxWebstorageConfiguration} from './config';
import {StorageKeyManager} from './helpers/storageKeyManager';
import {StorageStrategy} from './core/interfaces/storageStrategy';

export const LIB_CONFIG: InjectionToken<NgxWebstorageConfiguration> = new InjectionToken<NgxWebstorageConfiguration>('ngx_webstorage_config');

export function appInit(index: StrategyIndex) {
	index.indexStrategies();
	return (): { [name: string]: StorageStrategy<any> } => {
		return StrategyIndex.index;
	};
}

export function provideNgxWebstorage(config: NgxWebstorageConfiguration = {}): EnvironmentProviders {
	if (config) StorageKeyManager.consumeConfiguration(config);

	return makeEnvironmentProviders([
		{
			provide: LIB_CONFIG,
			useValue: config,
		},
		LocalStorageProvider,
		SessionStorageProvider,
		...Services,
		...Strategies,
		{
			provide: APP_INITIALIZER,
			useFactory: appInit,
			deps: [StrategyIndex],
			multi: true
		}
	]);
}
