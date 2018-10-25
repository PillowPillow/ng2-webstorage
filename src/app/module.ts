import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RootComponent} from './_components/root/root';
import {Components} from './_components';
import {SharedModule} from './shared/module';

import {NgxWebstorageModule, STORAGE_STRATEGIES, StorageStrategyStub, LocalStorageStrategy} from './lib';
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
		})
	],
	providers: [
		//{provide: STORAGE_STRATEGIES, useFactory: () => new StorageStrategyStub(LocalStorageStrategy.strategyName), multi: true}
	],
	bootstrap: [RootComponent]
})
export class AppModule {
}
