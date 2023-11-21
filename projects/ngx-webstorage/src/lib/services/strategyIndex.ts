import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {Subject} from 'rxjs';
import {Inject, Injectable, Optional} from '@angular/core';
import {STORAGE_STRATEGIES} from '../strategies';
import {StorageStrategies} from '../constants/strategy';

export const InvalidStrategyError = 'invalid_strategy';

@Injectable({providedIn: 'root'})
export class StrategyIndex {

	static index: { [name: string]: StorageStrategy<any> } = {};
	readonly registration$: Subject<string> = new Subject();

	constructor(@Optional() @Inject(STORAGE_STRATEGIES) protected strategies: StorageStrategy<any>[]) {
		if (!strategies) strategies = [];
		this.strategies = strategies.reverse()
			.map((strategy: StorageStrategy<any>, index, arr) => strategy.name)
			.map((name: string, index, arr) => arr.indexOf(name) === index ? index : null)
			.filter((index: number) => index !== null)
			.map((index: number) => strategies[index]);
	}

	static get(name: string): StorageStrategy<any> {
		if (!this.isStrategyRegistered(name)) throw Error(InvalidStrategyError);
		let strategy: StorageStrategy<any> = this.index[name];
		if (!strategy.isAvailable) {
			strategy = this.index[StorageStrategies.InMemory];
		}
		return strategy;
	}

	static set(name: string, strategy): void {
		this.index[name] = strategy;
	}

	static clear(name?: string): void {
		if (name !== undefined) delete this.index[name];
		else this.index = {};
	}

	static isStrategyRegistered(name: string): boolean {
		return name in this.index;
	}

	static hasRegistredStrategies(): boolean {
		return Object.keys(this.index).length > 0;
	}

	public getStrategy(name: string): StorageStrategy<any> {
		return StrategyIndex.get(name);
	}

	public indexStrategies() {
		this.strategies.forEach((strategy: StorageStrategy<any>) => this.register(strategy.name, strategy));
	}

	public indexStrategy(name: string, overrideIfExists: boolean = false): StorageStrategy<any> {
		if (StrategyIndex.isStrategyRegistered(name) && !overrideIfExists) return StrategyIndex.get(name);
		const strategy: StorageStrategy<any> = this.strategies.find((strategy: StorageStrategy<any>) => strategy.name === name);
		if (!strategy) throw new Error(InvalidStrategyError);
		this.register(name, strategy, overrideIfExists);
		return strategy;
	}

	public register(name: string, strategy: StorageStrategy<any>, overrideIfExists: boolean = false) {
		if (!StrategyIndex.isStrategyRegistered(name) || overrideIfExists) {
			StrategyIndex.set(name, strategy);
			this.registration$.next(name);
		}
	}

}

export {StorageStrategy};
