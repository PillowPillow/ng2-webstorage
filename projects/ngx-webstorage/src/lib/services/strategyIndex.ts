import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {Subject} from 'rxjs';
import {Inject, Injectable, Optional} from '@angular/core';
import {STORAGE_STRATEGIES} from '../strategies';
import {StorageStrategies} from '../constants/strategy';

export const StrategyAlreadyRegiteredError = 'strategy_already_registered';
export const InvalidStrategyError = 'invalid_strategy';

@Injectable({providedIn: 'root'})
export class StrategyIndex {

	static index: { [name: string]: StorageStrategy<any> } = {};
	readonly registration$: Subject<string> = new Subject();
	protected indexed: boolean = false;

	constructor(@Optional() @Inject(STORAGE_STRATEGIES) protected strategies: StorageStrategy<any>[]) {
		if (!this.strategies) this.strategies = [];
	}

	static get(name: string): StorageStrategy<any> {
		if (!this.isStrategyRegistered(name)) throw Error(InvalidStrategyError);
		let strategy: StorageStrategy<any> = StrategyIndex.index[name];
		if (!strategy.isAvailable) {
			strategy = StrategyIndex.index[StorageStrategies.InMemory];
		}
		return strategy;
	}

	static set(name: string, strategy): void {
		StrategyIndex.index[name] = strategy;
	}

	static clear(name?: string): void {
		if (name !== undefined) delete StrategyIndex.index[name];
		else StrategyIndex.index = {};
	}

	static isStrategyRegistered(name: string): boolean {
		return name in StrategyIndex.index;
	}

	static hasRegistredStrategies(): boolean {
		return Object.keys(StrategyIndex.index).length > 0;
	}

	public getStrategy(name: string): StorageStrategy<any> {
		return StrategyIndex.get(name);
	}

	public indexStrategies(force?: boolean) {
		if (this.indexed && force !== true) return;
		StrategyIndex.clear();
		this.strategies.forEach((strategy: StorageStrategy<any>) => this.register(strategy.name, strategy, true));
		this.indexed = true;
	}

	public register(name: string, strategy: StorageStrategy<any>, overrideIfExists: boolean = false) {
		if (!StrategyIndex.isStrategyRegistered(name) || overrideIfExists) {
			StrategyIndex.set(name, strategy);
			this.registration$.next(name);
		} else {
			throw Error(StrategyAlreadyRegiteredError);
		}
	}

}

