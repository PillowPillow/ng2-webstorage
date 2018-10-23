import {Inject, InjectionToken, ModuleWithProviders, NgModule, Optional} from '@angular/core';
import {LocalStorageProvider, SessionStorageProvider} from './core/nativeStorage';
import {Services} from './services/index';
import {Strategies} from './strategies/index';
import {StrategyIndex} from './services/strategyIndex';
import {NgxWebstorageConfiguration} from './config';
import {StorageKeyManager} from './helpers/storageKeyManager';

export const LIB_CONFIG: InjectionToken<Storage> = new InjectionToken<Storage>('ngx_webstorage_config');

@NgModule({})
export class NgxWebstorageModule {

	constructor(index: StrategyIndex, @Optional() @Inject(LIB_CONFIG) config: NgxWebstorageConfiguration) {
		if (config) StorageKeyManager.consumeConfiguration(config);
		else console.error('NgxWebstorage : Possible misconfiguration (The forRoot method usage is mandatory since the 3.0.0)');
		index.indexStrategies();
	}

	static forRoot(config: NgxWebstorageConfiguration = {}): ModuleWithProviders {
		return {
			ngModule: NgxWebstorageModule,
			providers: [
				{
					provide: LIB_CONFIG,
					useValue: config,
				},
				LocalStorageProvider,
				SessionStorageProvider,
				...Services,
				...Strategies
			]
		};
	}

}
