import {NgModule, NgZone, ModuleWithProviders, OpaqueToken, Inject, Optional} from '@angular/core';
import {LIB_KEY, LIB_KEY_SEPARATOR, LIB_KEY_CASE_SENSITIVE} from './constants/lib';
import {STORAGE} from './enums/storage';
import {LocalStorageService, SessionStorageService} from './services/index';
import {WebStorageHelper} from './helpers/webStorage';
import {WebstorageConfig, IWebstorageConfig} from './interfaces/config';
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

	static forRoot(config?:IWebstorageConfig):ModuleWithProviders {
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
		if(config) {
			KeyStorageHelper.setStorageKeyPrefix(config.prefix);
			KeyStorageHelper.setStorageKeySeparator(config.separator);
			KeyStorageHelper.setCaseSensitivity(config.caseSensitive);
		}

		this.initStorageListener();
	}

	private initStorageListener() {
		if(typeof window !== 'undefined') {
			window.addEventListener('storage', (event:StorageEvent) => this.ngZone.run(() => {
				let storage:STORAGE = window.sessionStorage === event.storageArea ? STORAGE.session : STORAGE.local;
				if (event.key == null) {
					WebStorageHelper.clearAll(storage);
				}
				else {
					WebStorageHelper.refresh(storage, event.key);
				}
			}));
		}
	}
}

export function provideConfig(config:IWebstorageConfig):WebstorageConfig {
	return new WebstorageConfig(config);
}

export function configure({prefix, separator, caseSensitive}:IWebstorageConfig = {
	caseSensitive: LIB_KEY_CASE_SENSITIVE,
	prefix: LIB_KEY,
	separator: LIB_KEY_SEPARATOR
}) {
	/*@Deprecation*/
	console.warn('[ng2-webstorage:deprecation] The configure method is deprecated since the v1.5.0, consider to use forRoot instead');

	KeyStorageHelper.setStorageKeyPrefix(prefix);
	KeyStorageHelper.setStorageKeySeparator(separator);
	KeyStorageHelper.setCaseSensitivity(caseSensitive);
}
