import {LocalStorageServiceProvider} from './localStorage';
import {Provider} from '@angular/core';
import {SessionStorageServiceProvider} from './sessionStorage';

export const Services: Provider[] = [
	LocalStorageServiceProvider,
	SessionStorageServiceProvider
];
