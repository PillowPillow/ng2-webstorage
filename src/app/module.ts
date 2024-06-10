import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
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
		{
			provide: APP_INITIALIZER,
			useFactory: (storage: LocalStorageService) => {
				console.log('app init');
				return () => {
					console.log(storage);
				};
			},
			deps: [LocalStorageService],
			multi: true
		},
		//{provide: STORAGE_STRATEGIES, useFactory: () => new StorageStrategyStub(LocalStorageStrategy.strategyName), multi: true}
	],
	bootstrap: [RootComponent]
})
export class AppModule {
}
