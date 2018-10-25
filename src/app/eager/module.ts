import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {Components} from './components';
import {LocalStorageService} from '../lib';

@NgModule({
	imports: [
		SharedModule,
	],
	exports: [...Components],
	declarations: [...Components],
})
export class EagerModule {
	constructor(storage: LocalStorageService) {
		console.log(storage);
	}

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: EagerModule,
			providers: []
		};
	}
}
