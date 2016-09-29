import {NgModule} from '@angular/core';
import {LocalStorageService, SessionStorageService} from './services/index';

export * from './decorators/index';
export * from './interfaces/index';
export * from './services/index';
export * from './helpers/keyStorage';

@NgModule({
	declarations: [],
	providers: [SessionStorageService, LocalStorageService],
	imports: []
})
export class Ng2Webstorage {
}
