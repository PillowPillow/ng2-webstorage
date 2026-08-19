import {StrategyCacheService} from '../core/strategyCache';
import {BaseSyncStorageStrategy} from './baseSyncStorage';
import {Inject, Injectable, NgZone, PLATFORM_ID} from '@angular/core';
import {LOCAL_STORAGE} from '../core/nativeStorage';
import {StorageStrategies} from '../constants/strategy';
import {isPlatformBrowser} from '@angular/common';
import {WebStorage} from '../core/interfaces/webStorage';

@Injectable()
class LocalStorageStrategy extends BaseSyncStorageStrategy {
	static readonly strategyName: string = StorageStrategies.Local;
	readonly name: string = LocalStorageStrategy.strategyName;

	constructor(@Inject(LOCAL_STORAGE) protected storage: WebStorage,
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
			// See the note in baseSyncStorage on why the public type stays string.
			this.keyChanges.next(key as unknown as string);
		}));
	}

}

export {LocalStorageStrategy};
