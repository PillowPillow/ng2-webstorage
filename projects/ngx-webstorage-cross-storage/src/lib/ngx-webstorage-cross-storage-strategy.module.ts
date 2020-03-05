import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CROSS_STORAGE_CONFIG, CrossStorageConfig} from './config';
import {CrossStorageClientProvider} from './cross-storage-client';
import {CrossStorageServiceProvider} from './services/cross-storage';
import {CrossStorageStrategyProvider} from './strategies/cross-storage';

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
				CrossStorageServiceProvider,
				CrossStorageStrategyProvider
			],
		};
	}
}
