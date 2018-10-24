import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {Routing} from './routing';
import {Components} from './components';
import {NgxWebstorageModule} from '../lib';

@NgModule({
	imports: [
		SharedModule,
		Routing
	],
	exports: [],
	declarations: [...Components],
	providers: [],
})
export class LazyModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: LazyModule,
			providers: []
		};
	}
}
