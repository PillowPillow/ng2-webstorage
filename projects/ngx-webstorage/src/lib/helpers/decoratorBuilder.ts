import {signal, untracked, WritableSignal} from '@angular/core';
import {StrategyIndex} from '../services/strategyIndex';
import {StorageStrategies} from '../constants/strategy';
import {KEY_CLEARED} from '../constants/keyChanges';
import {StorageKeyManager} from './storageKeyManager';
import {StorageStrategy} from '../core/interfaces/storageStrategy';
import {noop} from './noop';

/**
 * Per-strategy-instance, per-key revision signals.
 *
 * Angular 22 made OnPush the default change detection strategy for every
 * component, and these decorators install a plain property accessor: reading it
 * from a template registers no dependency, so a storage change that happens
 * outside the component never marks the view dirty and the binding goes stale.
 * Under zoneless it is worse — no tick is scheduled at all.
 *
 * Reading a signal inside the getter makes the consuming view a reactive
 * consumer of that signal, so bumping it on a `keyChanges` notification
 * schedules change detection in zoned and zoneless applications alike, with no
 * change required in consumer code.
 *
 * Keyed by strategy instance (not by name) so that a bootstrap registering a
 * fresh strategy instance gets fresh signals rather than bumping another
 * instance's. Note this is only about correctness of the fan-out, not about
 * releasing memory: strategy instances are effectively immortal anyway — the
 * static StrategyIndex keeps the registered instance, and Local/Session
 * strategies register a window 'storage' listener that is never removed — so
 * each instance permanently retains its subscription and its per-key signal
 * map (one small Map per instance; bounded by the decorated keys ever read).
 */
const revisions: WeakMap<StorageStrategy<any>, Map<string, WritableSignal<number>>> = new WeakMap();

function revisionOf(strategy: StorageStrategy<any>, storageKey: string): WritableSignal<number> {
	let byKey: Map<string, WritableSignal<number>> | undefined = revisions.get(strategy);
	if (byKey === undefined) {
		const created: Map<string, WritableSignal<number>> = new Map();
		byKey = created;
		revisions.set(strategy, created);
		// One subscription per strategy instance, fanned out to the per-key signals.
		// A null key (KEY_CLEARED) means "everything was cleared".
		// The bumps run synchronously inside keyChanges.next(), i.e. inside the
		// storage WRITE's call stack. `untracked` lifts Angular's reactive-context
		// write guard so a write issued from a guarded context (a `computed()`, a
		// template expression) updates the revision instead of throwing NG0600.
		strategy.keyChanges.subscribe((changed: string | null) => untracked(() => {
			if (changed === KEY_CLEARED) created.forEach((revision: WritableSignal<number>) => revision.update((n: number) => n + 1));
			else created.get(changed as string)?.update((n: number) => n + 1);
		}));
	}

	let revision: WritableSignal<number> | undefined = byKey.get(storageKey);
	if (revision === undefined) byKey.set(storageKey, revision = signal(0));
	return revision;
}

class DecoratorBuilder {

	static buildSyncStrategyDecorator(strategyName: string | StorageStrategies, prototype: any, propName: string, key?: string, defaultValue: any = null) {
		const rawKey: string = key || propName;
		let storageKey: string;

		Object.defineProperty(prototype, propName, {
			get: function() {
				const strategy: StorageStrategy<any> = StrategyIndex.get(strategyName);
				// Registers the reading view as a consumer; see `revisions` above.
				revisionOf(strategy, getKey())();
				let value: any;
				strategy.get(getKey()).subscribe((result) => value = result);
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

export {DecoratorBuilder};
