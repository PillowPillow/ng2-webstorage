import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {Subject} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {STORAGE_STRATEGIES} from '../strategies';
import {StorageStrategyType} from '../constants/strategy';

export const StrategyAlreadyRegiteredError = 'strategy_already_registered';
export const InvalidStrategyError = 'invalid_strategy';

@Injectable({providedIn: 'root'})
export class StrategyIndex {

	static index: { [name: string]: StorageStrategy<any> } = {};
	readonly registration$: Subject<string> = new Subject();

	constructor(@Inject(STORAGE_STRATEGIES) protected strategies: StorageStrategy<any>[]) {
	}

	static get(name: string): StorageStrategy<any> {
		if (!this.isStrategyRegistered(name)) throw Error(InvalidStrategyError);
		let strategy: StorageStrategy<any> = StrategyIndex.index[name];
		if (!strategy.isAvailable) {
			console.log(`Unable to use the strategy ${name}, fallback to InMemory strategy`);
			strategy = StrategyIndex.index[StorageStrategyType.InMemory];
		}
		return strategy;
	}

	static isStrategyRegistered(name: string): boolean {
		return name in StrategyIndex.index;
	}

	public getStrategy(name: string): StorageStrategy<any> {
		return StrategyIndex.get(name);
	}

	public indexStrategies() {
		this.strategies.forEach((strategy: StorageStrategy<any>) =>
			this.register(strategy.name, strategy)
		);
	}

	public register(name: string, strategy: StorageStrategy<any>, throwIfExists: boolean = true) {
		if (!StrategyIndex.isStrategyRegistered(name)) {
			StrategyIndex.index[name] = strategy;
			this.registration$.next(name);
		} else if (throwIfExists) {
			throw Error(StrategyAlreadyRegiteredError);
		}
	}

}

