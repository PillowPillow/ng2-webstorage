import {StrategyCacheService} from '../core/strategyCache';
import {BaseSyncStorageStrategy} from './baseSyncStorage';
import {Inject, Injectable, NgZone, PLATFORM_ID} from '@angular/core';
import {SESSION_STORAGE} from '../core/nativeStorage';
import {StorageStrategies} from '../constants/strategy';
import {KEY_CLEARED} from '../constants/keyChanges';
import {isPlatformBrowser} from '@angular/common';
import {WebStorage} from '../core/interfaces/webStorage';

@Injectable()
 class SessionStorageStrategy extends BaseSyncStorageStrategy {
	static readonly strategyName: string = StorageStrategies.Session;
	readonly name: string = SessionStorageStrategy.strategyName;

	constructor(@Inject(SESSION_STORAGE) protected storage: WebStorage,
	            protected cache: StrategyCacheService,
	            @Inject(PLATFORM_ID) protected platformId: any,
	            protected zone: NgZone) {
		super(storage, cache);
		if (isPlatformBrowser(this.platformId)) this.listenExternalChanges();
	}

	protected listenExternalChanges() {
		window.addEventListener('storage', (event: StorageEvent) => this.zone.run(() => {
			if (event.storageArea !== this.storage) return;
			const key: string | null = event.key;
			if (key !== null) this.cache.del(this.name, key);
			else this.cache.clear(this.name);
			// A remote clear() delivers a null key, meaning "everything was cleared".
			this.keyChanges.next(key ?? KEY_CLEARED);
		}));
	}

}

export {SessionStorageStrategy};
