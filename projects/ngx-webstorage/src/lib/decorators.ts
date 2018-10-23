import {StorageStrategyType} from './constants/strategy';
import {DecoratorBuilder} from './helpers/decoratorBuilder';

export function LocalStorage(key?: string, defaultValue?: any) {
	return function(prototype, propName) {
		DecoratorBuilder.buildSyncStrategyDecorator(StorageStrategyType.Local, prototype, propName, key, defaultValue);
	};
}

export function SessionStorage(key?: string, defaultValue?: any) {
	return function(prototype, propName) {
		DecoratorBuilder.buildSyncStrategyDecorator(StorageStrategyType.Session, prototype, propName, key, defaultValue);
	};
}
