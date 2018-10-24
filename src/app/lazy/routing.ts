import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LazyComponent} from './components/lazy/lazy';

export const ROUTES: Routes = [
	{
		path: '',
		component: LazyComponent
	},
];

export const Routing: ModuleWithProviders = RouterModule.forChild(
	ROUTES
);
