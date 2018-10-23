import {StrategyCacheService} from '../core/strategyCache';
import {BaseSyncStorageStrategy} from './baseSyncStorage';
import {Inject, NgZone, PLATFORM_ID} from '@angular/core';
import {LOCAL_STORAGE} from '../core/nativeStorage';
import {StorageStrategyType} from '../constants/strategy';
import {isPlatformBrowser} from '@angular/common';

export class LocalStorageStrategy extends BaseSyncStorageStrategy {
	readonly name: string = StorageStrategyType.Local;
	
	constructor(@Inject(LOCAL_STORAGE) protected storage: Storage,
	            protected cache: StrategyCacheService,
	            @Inject(PLATFORM_ID) protected platformId: any,
	            protected zone: NgZone) {
		super(storage, cache);
		this.listenExternalChanges();
	}
	
	protected listenExternalChanges() {
		if (!isPlatformBrowser(this.platformId)) return;
		
		window.addEventListener('storage', (event: StorageEvent) => this.zone.run(() => {
			if (event.storageArea !== this.storage) return;
			if (event.key !== null) this.cache.del(this.name, event.key);
			else this.cache.clear(this.name);
		}));
	}
	
}
