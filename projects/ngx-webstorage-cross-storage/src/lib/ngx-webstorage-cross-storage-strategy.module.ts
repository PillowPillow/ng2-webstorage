import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CROSS_STORAGE_CONFIG, CrossStorageConfig} from './config';
import {CrossStorageServiceProvider} from './services/cross-storage';
import {CrossStorageStrategyProvider} from './strategies/cross-storage';
import {CrossStorageClientProvider} from './utils/cross-storage-client';
import {CrossStorageProvider} from './utils/cross-storage-facade';
import {CrossStorageLocalStorageFallbackProvider} from './utils/cross-storage-local-storage-fallback';

@NgModule({
	imports: [CommonModule],
})
export class NgxWebstorageCrossStorageStrategyModule {
	static forRoot(config: CrossStorageConfig): ModuleWithProviders<NgxWebstorageCrossStorageStrategyModule> {
		return {
			ngModule: NgxWebstorageCrossStorageStrategyModule,
			providers: [
				{provide: CROSS_STORAGE_CONFIG, useValue: config},
				CrossStorageClientProvider,
				CrossStorageLocalStorageFallbackProvider,
				CrossStorageProvider,
				CrossStorageServiceProvider,
				CrossStorageStrategyProvider
			],
		};
	}
}
