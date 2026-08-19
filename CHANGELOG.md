# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
The major version tracks the Angular major version: `ngx-webstorage` v*N* targets Angular v*N*,
so this project does **not** follow [Semantic Versioning](https://semver.org/) for its major digit.

Step-by-step upgrade instructions with before/after code live in [MIGRATION.md](./MIGRATION.md).

> **History gap:** releases from v1.8.0 to v20.x are not recorded in this file.
> For those versions, see the [commit history](https://github.com/PillowPillow/ng2-webstorage/commits/master)
> and the [tag list](https://github.com/PillowPillow/ng2-webstorage/tags).
> The 1.x entries are kept at the bottom under [Legacy](#legacy-ng2-webstorage-1x).

## [Unreleased]

## [22.0.0] - 2026-08-19

Angular 22 support for `ngx-webstorage` and `ngx-webstorage-cross-storage`.
Upgrade guide: [MIGRATION.md — v21.x → v22](./MIGRATION.md#v21x--v22).

### BREAKING CHANGES

* **`strict` mode:** `@LocalStorage() value: string;` now reports `TS2564`. Add a definite
  assignment assertion: `@LocalStorage() value!: string;`. The decorators install a prototype
  accessor, so the property has no initializer. TypeScript 6.0 turns `strict` on by default.
* **`StrategyIndex.get()`** throws `invalid_strategy` when a strategy is registered but
  unavailable and no in-memory fallback is registered. It previously returned `undefined` and
  failed later with `cannot read properties of undefined`.
* **Config values set to `undefined` are ignored** instead of applied. On v21,
  `withNgxWebstorageConfig({prefix: undefined})` persisted every key as `undefined|<key>`;
  the same call now keeps the default prefix. Data stored under `undefined|`-prefixed keys
  needs a manual migration.
* **`del()` / `clear()` observables emit `undefined`** instead of `null`, matching their
  declared `Observable<void>`. The `cross-storage` strategy still resolves to `null`.
* **Type narrowings on the public surface**, from enabling `strict`. They affect only code
  that implements or subclasses the library's primitives:
  `StorageService.clear(key?)` `any` → `void`,
  `BaseSyncStorageStrategy._isAvailable` `boolean` → `boolean | undefined`,
  `StrategyIndex.set(name, strategy)` `any` → `StorageStrategy<any>`,
  `@LocalStorage` / `@SessionStorage` `propName: any` → `propName: string`.
* **Node `^22.22.3`** is required to build against Angular 22.
* **Keep `"useDefineForClassFields": false`** if you set it explicitly. Under ES2022
  `[[Define]]` semantics, decorated fields become own properties initialised to `undefined`
  that shadow the accessor, and every binding silently returns `undefined` with no compile
  error. See [MIGRATION.md](./MIGRATION.md#v21x--v22).

`StorageStrategy.keyChanges` deliberately stays `Subject<string>`, although it emits `null` on
clear. Widening it breaks every subscriber, not only implementors. Deferred to v23.

### Changed

* **Peer dependencies:** both packages move to `@angular/common` and `@angular/core`
  `>=21.0.0 <23.0.0`, and `ngx-webstorage-cross-storage` to `ngx-webstorage >=21.0.0 <23.0.0`.
  The v22 build therefore serves Angular 21 and Angular 22 applications. This holds while
  neither library ships a `@Component`, `@Directive` or `@Pipe`: those declarations carry a
  `minVersion` at the emitting major's floor, which a v21 linker rejects. Treat "no renderable
  declarations" as a maintained invariant.
* **Angular 22.1.x** and `@angular/build` replace `@angular-devkit/build-angular`, deprecated
  at 22.x. All nine builder strings move over; the option blocks are unchanged.
* **TypeScript ~6.0** with `strict: true`. `baseUrl` is removed and every `paths` entry is
  `./`-relative, because `baseUrl` is a hard `TS5101` error under TypeScript 6.
* **ESLint flat config** (`eslint.config.js`) with eslint 10, typescript-eslint 8 and
  angular-eslint 22. `.eslintrc.json` is dropped.
* **Karma toolchain:** jasmine-core 6.3, karma-jasmine 5.1, `@angular/build:karma`. The karma
  configs no longer reach into the webpack builder. JUnit reporting is unconditional.
* **Library build targets** set `defaultConfiguration: production`, so a local `ng build <lib>`
  emits partial mode and matches the published artifact. Without it, only CI's explicit
  `--configuration=production` produced publishable output.
* **Package metadata:** both libraries get a `description`, `ngx-webstorage-cross-storage`
  gets `bugs` and `homepage`, and the stale `angular13` keyword becomes `angular`.
* **CI** pins `cimg/node:22.22.3`.
* **Dev toolchain:** the unused `protractor` devDependency and the dead `overrides` block are
  removed. These are build-time dependencies and do not affect consumers.

### Fixed

* **Decorated bindings stay reactive under Angular 22.** Angular 22 makes every component
  `OnPush` by default, which left `@LocalStorage` / `@SessionStorage` bindings stale when
  storage changed outside the component — most visibly on the cross-tab `storage` event, and
  always under zoneless. The decorators are now signal-backed: a revision signal per strategy
  instance and key, read inside the getter and bumped from `keyChanges`. No consumer change.
* **`NG0600` on writes from a reactive context.** `keyChanges.next()` runs synchronously in the
  storage write's call stack, so a write issued from a `computed()` or a template expression
  made the revision update throw. The bump now runs inside `untracked()`.
* **`StorageEvent.key` is `null` on clear.** The handlers declared it `string` and then tested
  it against `null`.

## [21.0.1] - 2025-11-24

### Changed

* **ngx-webstorage:** republished with no source change (version bump only). No git tag was
  pushed for this release.

## [21.0.0] - 2025-11-24

### Changed

* **ngx-webstorage / ngx-webstorage-cross-storage:** peer dependencies raised to `@angular/common@^21.0.0` and `@angular/core@^21.0.0`.

[Unreleased]: https://github.com/PillowPillow/ng2-webstorage/compare/v22.0.0...HEAD
[22.0.0]: https://github.com/PillowPillow/ng2-webstorage/compare/v21.0.0...v22.0.0
[21.0.1]: https://github.com/PillowPillow/ng2-webstorage/commit/746f6e1
[21.0.0]: https://github.com/PillowPillow/ng2-webstorage/compare/v20.0.0...v21.0.0

---

## Legacy (ng2-webstorage 1.x)

The package was named `ng2-webstorage` until v2.0.0. The entries below are kept for users still on that line.

<a name="1.8.0">v1.8.0</a>

### Features 

* **Decorators:** The decorators now handle a default value [#43](https://github.com/PillowPillow/ng2-webstorage/issues/43)
- Example:
  * Before: 
  ```typescript
		import {LocalStorage} from 'ng2-webstorage';

		@Component({...})
		class FooComponent implements OnInit {
			@LocalStorage('foobar') foobar; 
	
			ngOnInit() {
				let storedValue = this.storage.retrieve('foobar');
				if(!storedValue) this.foobar = 'default value';
			}
		}
	```

  * After: 
  ```typescript
		import {LocalStorage} from 'ng2-webstorage';

		@Component({...})
		class FooComponent implements OnInit {
			@LocalStorage('foobar', 'default value') foobar; 
		}
  ```
 

<a name="1.7.0">v1.7.0</a>

### Features 

* **Options:** The library offers a new options *caseSensitive* [#42](https://github.com/PillowPillow/ng2-webstorage/issues/42)
- Example:
  * Before: 
  ```typescript
		import {Ng2Webstorage, LocalStorage} from 'ng2-webstorage';

		@NgModule({
			imports: [
				Ng2Webstorage.forRoot({
					caseSensitive: true
				})
			],
		})
		export class AppModule {}

		@Component({...})
		class FooComponent {
			@LocalStorage('foobar') foobar; 
			@LocalStorage('Foobar') Foobar; 
			// Before 1.7 the two binding above had the same value
		}
	```

  * After: 
  ```typescript
		import {Ng2Webstorage, LocalStorage} from 'ng2-webstorage';

		@NgModule({
			imports: [
				Ng2Webstorage.forRoot({
					caseSensitive: true
				})
			],
		})
		export class AppModule {}

		@Component({...})
		class FooComponent {
			@LocalStorage('foobar') foobar = 2; 
			@LocalStorage('Foobar') Foobar = 3;
	
	 		show() {
				console.log(this.foobar); // 2		
				console.log(this.Foobar); // 3
			} 
		}
  ```


<a name="1.6.0">v1.6.0</a>

### Features 

* **ANGULAR 4 Compliant:** The library is now compliant with the ng4 compiler [#23](https://github.com/PillowPillow/ng2-webstorage/issues/23)

### PEER-DEPENDENCY UPDATES ###

* **angular**: @angular/...4.0.1

<a name="1.5.0">v1.5.0</a>

### Deprecation 

* **AoT compilation:** Fixed forRoot method to be compliant with AoT compilations
- Example:
  * Before: 
  ```typescript
		import {Ng2Webstorage, configure as WebstorageConfigure} from 'ng2-webstorage';

		WebstorageConfigure({
			separator: '.',
			prefix: 'custom'
		});
		
		@NgModule({
			imports: [Ng2Webstorage],
		})
		export class AppModule {}
	```

  * After: 
  ```typescript
		import {Ng2Webstorage} from 'ng2-webstorage';

		@NgModule({
			imports: [
				Ng2Webstorage.forRoot({
					separator: '.',
					prefix: 'custom'
				})
			],
		})
		export class AppModule {}
  ```

<a name="1.4.3">v1.4.3</a>

### Features 

* **AoT compilation:** Add *configure* method replacing the forRoot one for the AoT compilations [#27](https://github.com/PillowPillow/ng2-webstorage/issues/27)
- Example:
  * Before: 
  ```typescript
		import {Ng2Webstorage} from 'ng2-webstorage';

		@NgModule({
			imports: [
				Ng2Webstorage.forRoot({
					separator: '.',
					prefix: 'custom'
				})
			],
		})
		export class AppModule {}
  ```
  * After: 
  ```typescript
		import {Ng2Webstorage, configure as WebstorageConfigure} from 'ng2-webstorage';

		WebstorageConfigure({
			separator: '.',
			prefix: 'custom'
		});
		
		@NgModule({
			imports: [Ng2Webstorage],
		})
		export class AppModule {}
    ```


### PEER-DEPENDENCY UPDATES ###

* **angular**: @angular/...2.4.1


<a name="1.4.2">v1.4.2</a>

### Fix 

* **source map:** temporarily remove source map from umd version [source-map-loader issue](https://github.com/webpack/source-map-loader/pull/21)


<a name="1.4.0">v1.4.0</a>

### Features 

* **listener:** Now listen the changes made from other windows (Localstorage only) and devtool panel [#23](https://github.com/PillowPillow/ng2-webstorage/issues/23)

### PEER-DEPENDENCY UPDATES ###

* **angular**: @angular/...2.2.0

### BREAKING CHANGES 

* KeyStorageHelper: - This service is not exposed anymore. Use the module's method `forRoot` instead to configure the web storage options.
- Example:
  * Before: 
  ```typescript
		KeyStorageHelper.setStorageKeyPrefix('custom');
		KeyStorageHelper.setStorageKeySeparator('.');
  ```
  * After: 
  ```typescript
		@NgModule({
			imports: [
				Ng2Webstorage.forRoot({
					separator: '.',
					prefix: 'custom'
				})
			]
		})
		class AppModule {}
    ```
