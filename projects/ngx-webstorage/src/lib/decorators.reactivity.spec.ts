import {Component, provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {LocalStorage} from './decorators';
import {LocalStorageService} from './services/localStorage';
import {provideNgxWebstorage, withLocalStorage} from './provider';
import {StrategyIndex} from './services/strategyIndex';

/**
 * Angular 22 made OnPush the default for every component. These tests pin the
 * behaviour that change implicitly broke: a decorated property must repaint
 * when the underlying storage changes, without the consumer calling
 * markForCheck and without relying on zone.js.
 */
describe('Decorators : change detection', () => {

	@Component({selector: 'lib-reactive-host', template: '{{ bound }}'})
	class ReactiveHostComponent {
		@LocalStorage('reactivity-probe') bound!: string;
	}

	beforeEach(() => {
		// Both sides of the isolation: StrategyIndex.index is static and
		// register() never overrides an existing entry, so a strategy left behind
		// by any spec — including this one — is silently reused by the next.
		StrategyIndex.clear();
		localStorage.clear();
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			providers: [
				provideZonelessChangeDetection(),
				provideNgxWebstorage(withLocalStorage()),
			],
		});
	});

	afterEach(() => {
		// StrategyIndex.index is static. Leaving 'local' registered would hand this
		// spec's real-storage strategy to every later spec that expects a stub,
		// because register() does not override an existing entry.
		StrategyIndex.clear();
		localStorage.clear();
	});

	it('a component with no explicit strategy really is OnPush under Angular 22', () => {
		// If this ever fails, Angular changed the default back and the rest of
		// this file is testing something other than what it claims to.
		expect((ReactiveHostComponent as any).ɵcmp.onPush).toBe(true);
	});

	it('repaints an OnPush view when storage changes, with no markForCheck', async () => {
		const storage: LocalStorageService = TestBed.inject(LocalStorageService);
		storage.store('reactivity-probe', 'first');

		const fixture = TestBed.createComponent(ReactiveHostComponent);
		await fixture.whenStable();
		expect(fixture.nativeElement.textContent).toBe('first');

		storage.store('reactivity-probe', 'second');
		await fixture.whenStable();
		expect(fixture.nativeElement.textContent).toBe('second');
	});

	it('keeps repainting on further changes', async () => {
		const storage: LocalStorageService = TestBed.inject(LocalStorageService);
		const fixture = TestBed.createComponent(ReactiveHostComponent);
		await fixture.whenStable();

		storage.store('reactivity-probe', 'a');
		await fixture.whenStable();
		storage.store('reactivity-probe', 'b');
		await fixture.whenStable();
		expect(fixture.nativeElement.textContent).toBe('b');
	});

	it('repaints when the key is cleared', async () => {
		const storage: LocalStorageService = TestBed.inject(LocalStorageService);
		storage.store('reactivity-probe', 'value');

		const fixture = TestBed.createComponent(ReactiveHostComponent);
		await fixture.whenStable();
		expect(fixture.nativeElement.textContent).toBe('value');

		storage.clear();
		await fixture.whenStable();
		expect(fixture.nativeElement.textContent).toBe('');
	});

	it('installs the binding as a prototype accessor, not an own field', () => {
		// Guards tsconfig.json's `useDefineForClassFields: false`. If that flag is
		// flipped, ES2022 [[Define]] semantics give every decorated field an own
		// property initialised to undefined, shadowing this accessor, and every
		// binding silently returns undefined with no compile error.
		const descriptor = Object.getOwnPropertyDescriptor(ReactiveHostComponent.prototype, 'bound')!;
		expect(descriptor).toBeDefined();
		expect(typeof descriptor.get).toBe('function');
		expect(Object.prototype.hasOwnProperty.call(new ReactiveHostComponent(), 'bound')).toBe(false);
	});

});
