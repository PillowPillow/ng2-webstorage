import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RootComponent} from './_components/root/root';
import {Components} from './_components';
import {SharedModule} from './shared/module';

// import {LocalStorageService, NgxWebstorageModule} from 'ngx-webstorage';
import {LocalStorageService, NgxWebstorageModule} from './lib';
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
		NgxWebstorageModule.forRoot({
			prefix: 'prefix',
			separator: '--'
		}),
		// NgxWebstorageCrossStorageStrategyModule.forRoot({
		// 	host: 'http://localhost.crosstorage'
		// })
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: (session: LocalStorageService) => {
				console.log('app init');
				return () => {
					console.log(session);
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
