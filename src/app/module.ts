import {BrowserModule} from '@angular/platform-browser';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
import {RootComponent} from './_components/root/root';
import {Components} from './_components';
import {SharedModule} from './shared/module';

// import {LocalStorageService, provideNgxWebstorage} from 'ngx-webstorage';
import {LocalStorageService, provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage} from './lib';
import {Routing} from './routing';
import {EagerModule} from './eager/module';

@NgModule({
	declarations: [
		...Components
	],
	imports: [
		BrowserModule,
		SharedModule,
		Routing,
		EagerModule,
	],
	providers: [
		provideNgxWebstorage(
			withNgxWebstorageConfig({
				prefix: 'prefix',
				separator: '--'
			}),
			withSessionStorage(),
			withLocalStorage(),
			// withCrossStorage({
			// 	host: 'http://localhost.crosstorage'
			// })
		),
		provideAppInitializer(() => {
        const initializerFn = ((storage: LocalStorageService) => {
				console.log('app init');
				return () => {
					console.log(storage);
				};
			})(inject(LocalStorageService));
        return initializerFn();
      }),
		//{provide: STORAGE_STRATEGIES, useFactory: () => new StorageStrategyStub(LocalStorageStrategy.strategyName), multi: true}
	],
	bootstrap: [RootComponent]
})
export class AppModule {
}
