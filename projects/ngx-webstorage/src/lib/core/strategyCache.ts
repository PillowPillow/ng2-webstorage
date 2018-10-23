import {Injectable} from '@angular/core';

export interface StrategyCache {
	[key: string]: any;
}

@Injectable({providedIn: 'root'})
export class StrategyCacheService {

	protected caches: { [name: string]: StrategyCache } = {};

	get(strategyName: string, key: string) {
		return this.getCacheStore(strategyName)[key];
	}

	set(strategyName: string, key: string, value: any) {
		this.getCacheStore(strategyName)[key] = value;
	}

	del(strategyName: string, key: string) {
		delete this.getCacheStore(strategyName)[key];
	}

	clear(strategyName: string) {
		this.caches[strategyName] = {} as StrategyCache;
	}

	protected getCacheStore(strategyName: string): StrategyCache {
		if (strategyName in this.caches) return this.caches[strategyName];
		return this.caches[strategyName] = {} as StrategyCache;
	}
}
