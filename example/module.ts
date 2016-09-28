import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Webstorage, KeyStorageHelper} from '../lib/app';
import {App} from './components/app';
import {AppForm} from './components/appForm';
import {AppView} from './components/appView';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {Ng2Webstorage} from '../index';

//KeyStorageHelper.setStorageKeyPrefix('foobar');
@NgModule({
	declarations: [App, AppView, AppForm],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		Ng2Webstorage
	],
	bootstrap: [App],
})
export class AppModule {
}
