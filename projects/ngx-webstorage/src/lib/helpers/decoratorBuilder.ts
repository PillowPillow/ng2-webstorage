import {StrategyIndex} from '../services/strategyIndex';
import {StorageStrategies} from '../constants/strategy';
import {StorageKeyManager} from './storageKeyManager';
import {noop} from './noop';

export class DecoratorBuilder {
	
	static buildSyncStrategyDecorator(strategyName: string | StorageStrategies, prototype, propName: string, key?: string, defaultValue: any = null) {
		const rawKey: string = key || propName;
		let storageKey: string;
		
		Object.defineProperty(prototype, propName, {
			get: function() {
				let value: any;
				StrategyIndex.get(strategyName).get(getKey()).subscribe((result) => value = result);
				return value === undefined ? defaultValue : value;
			},
			set: function(value) {
				StrategyIndex.get(strategyName).set(getKey(), value).subscribe(noop);
			}
		});
		
		function getKey() {
			if (storageKey !== undefined) return storageKey;
			return storageKey = StorageKeyManager.normalize(rawKey);
		}
	}
}

