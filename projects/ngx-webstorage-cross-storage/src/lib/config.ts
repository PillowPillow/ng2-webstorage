import {InjectionToken} from '@angular/core';

export const CROSS_STORAGE_CONFIG: InjectionToken<any> = new InjectionToken<any>('cross_storage_config');

export interface CrossStorageConfig {
	host: string;

	[prop: string]: any;
}

