import {InjectionToken} from '@angular/core';

export const CROSS_STORAGE_CONFIG: InjectionToken<any> = new InjectionToken<any>('cross_storage_config');

interface CrossStorageConfig {
	host: string;

	[prop: string]: any;
}

export {CrossStorageConfig};
