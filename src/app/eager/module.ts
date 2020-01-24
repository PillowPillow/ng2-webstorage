import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {Components} from './components';
import {LocalStorageService, SessionStorageService, StrategyIndex} from '../lib';

@NgModule({
	imports: [
		SharedModule,
	],
	exports: [...Components],
	declarations: [...Components],
	providers: []
})
export class EagerModule {
	constructor(storage: LocalStorageService) {
	}

	static forRoot(): ModuleWithProviders<EagerModule> {
		return {
			ngModule: EagerModule,
			providers: []
		};
	}
}
