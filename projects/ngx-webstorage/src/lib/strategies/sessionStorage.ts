import {StrategyCacheService} from '../core/strategyCache';
import {BaseSyncStorageStrategy} from './baseSyncStorage';
import {Inject, NgZone, PLATFORM_ID} from '@angular/core';
import {SESSION_STORAGE} from '../core/nativeStorage';
import {StorageStrategies} from '../constants/strategy';
import {isPlatformBrowser} from '@angular/common';

export class SessionStorageStrategy extends BaseSyncStorageStrategy {
	static readonly strategyName: string = StorageStrategies.Session;
	readonly name: string = SessionStorageStrategy.strategyName;

	constructor(@Inject(SESSION_STORAGE) protected storage: Storage,
	            protected cache: StrategyCacheService,
	            @Inject(PLATFORM_ID) protected platformId: any,
	            protected zone: NgZone) {
		super(storage, cache);
		if (isPlatformBrowser(this.platformId)) this.listenExternalChanges();
	}

	protected listenExternalChanges() {
		window.addEventListener('storage', (event: StorageEvent) => this.zone.run(() => {
			if (event.storageArea !== this.storage) return;
			if (event.key !== null) this.cache.del(this.name, event.key);
			else this.cache.clear(this.name);
		}));
	}

}
