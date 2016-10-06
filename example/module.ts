import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {Ng2Webstorage} from './libwrapper';

//import {Ng2Webstorage, KeyStorageHelper} from './libwrapper';
//KeyStorageHelper.setStorageKeyPrefix('foobar');
//KeyStorageHelper.setStorageKeySeparator('.');

import {App} from './components/app';
import {AppForm} from './components/appForm';
import {AppView} from './components/appView';


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
