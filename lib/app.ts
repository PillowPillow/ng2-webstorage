import {NgModule, NgZone, ModuleWithProviders, OpaqueToken, Inject, Optional} from '@angular/core';
import {LIB_KEY, LIB_KEY_SEPARATOR} from './constants/lib';
import {STORAGE} from './enums/storage';
import {LocalStorageService, SessionStorageService} from './services/index';
import {WebStorageHelper} from './helpers/webStorage';
import {WebstorageConfig, WebstorageConfigInterface} from './interfaces/config';
import {KeyStorageHelper} from './helpers/keyStorage';

export * from './interfaces/index';
export * from './decorators/index';
export * from './services/index';

export const WEBSTORAGE_CONFIG = new OpaqueToken('WEBSTORAGE_CONFIG');

@NgModule({
	declarations: [],
	providers: [SessionStorageService, LocalStorageService],
	imports: []
})
export class Ng2Webstorage {

	static forRoot(config?: WebstorageConfigInterface):ModuleWithProviders {
		return {
			ngModule: Ng2Webstorage,
			providers: [
				{
					provide: WEBSTORAGE_CONFIG,
					useValue: config
				},
				{
					provide: WebstorageConfig,
					useFactory: provideConfig,
					deps: [
						WEBSTORAGE_CONFIG
					]
				}
			]
		};
	}

	constructor(private ngZone:NgZone, @Optional() @Inject(WebstorageConfig) config:WebstorageConfig) {
		this.initStorageListener();

		if(config) {
			KeyStorageHelper.setStorageKeyPrefix(config.prefix);
			KeyStorageHelper.setStorageKeySeparator(config.separator);
		}
	}

	private initStorageListener() {
		if(window) {
			window.addEventListener('storage', (event:StorageEvent) => this.ngZone.run(() => {
				let storage:STORAGE = window.sessionStorage === event.storageArea ? STORAGE.session : STORAGE.local;
				WebStorageHelper.refresh(storage, event.key);
			}));
		}
	}
}

export function provideConfig(config: WebstorageConfigInterface): WebstorageConfig {
	return new WebstorageConfig(config);
}

// This is for backwards compatibility only
export function configure({prefix, separator}:WebstorageConfigInterface = {prefix: LIB_KEY, separator: LIB_KEY_SEPARATOR}) {
	KeyStorageHelper.setStorageKeyPrefix(prefix);
	KeyStorageHelper.setStorageKeySeparator(separator);
}
