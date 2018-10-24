import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RootComponent} from './_components/root/root';
import {Components} from './_components';
import {SharedModule} from './shared/module';

import {NgxWebstorageModule} from './lib';
import {Routing} from './routing';

@NgModule({
	declarations: [
		...Components
	],
	imports: [
		BrowserModule,
		SharedModule,
		Routing,
		NgxWebstorageModule.forRoot({
			prefix: 'prefix',
			separator: '--'
		})
	],
	providers: [],
	bootstrap: [RootComponent]
})
export class AppModule {}
