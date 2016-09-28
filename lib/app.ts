import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocalStorageService, SessionStorageService} from './services/index';

export * from './decorators/index';
export * from './interfaces/index';
export * from './services/index';
export * from './helpers/keyStorage';

@NgModule({
	declarations: [],
	providers: [SessionStorageService, LocalStorageService],
	imports: [BrowserModule]
})
export class Ng2Webstorage {
}
