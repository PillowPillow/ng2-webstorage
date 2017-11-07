import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {Ng2Webstorage} from '../../libwrapper';

import {App} from './components/app';
import {AppForm} from './components/appForm';
import {AppView} from './components/appView';
import {CommonModule} from '@angular/common';

@NgModule({
	declarations: [App, AppView, AppForm],
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		//Ng2Webstorage.forRoot({
		//	separator: '.',
		//	prefix: 'foobar',
		//	caseSensitive: true
		//}),
		Ng2Webstorage
	],
	bootstrap: [App],
})
export class AppModule {
}
