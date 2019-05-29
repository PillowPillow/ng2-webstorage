import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const ROUTES: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				loadChildren: () => import('./lazy/module').then(m => m.LazyModule)
			},
			{
				path: '**',
				redirectTo: ''
			}
		]
	}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
