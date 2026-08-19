# ngx-webstorage

### Local and session storage - Angular service
This library provides an easy to use service to manage the web storages (local and session) from your Angular application.
It provides also two decorators to synchronize the component attributes and the web storages.

[![CircleCI](https://circleci.com/gh/PillowPillow/ng2-webstorage/tree/master.svg?style=svg)](https://circleci.com/gh/PillowPillow/ng2-webstorage/tree/master)
------------

#### Index:
* [Getting Started](#gstart)
    * [Provider Function](#provider_fn)
* [Services](#services):
	* [LocalStorageService](#s_localstorage)
	* [SessionStorageService](#s_sessionstorage)
* [Decorators](#decorators):
	* [@LocalStorage](#d_localstorage)
	* [@SessionStorage](#d_sessionStorage)
* [Known issues](#knownissues)
* [Modify and build](#modifBuild)

------------

### Migrate from v2.x to the v3

1. Update your project to Angular 7+
2. Rename the module usages by <b>NgxWebstorageModule.forRoot()</b> *(before: Ng2Webstorage)*
> The forRoot is now mandatory in the root module even if you don't need to configure the library


### Migrate from v13.x to the v18

1. Update your project to Angular 18+
2. Rename the module usages by <b>provideNgxWebstorage()</b> *(before: NgxWebstorageModule.forRoot())*
3. Add the new provider functions to configure the library
```typescript
	provideNgxWebstorage(
		withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
		withLocalStorage(),
		withSessionStorage()
	)
```
### Migrate from v21.x to the v22

1. Update your project to Angular 22+

2. If your project uses TypeScript's `strict` mode, add a definite assignment
   assertion to every decorated property:

	```typescript
	// before
	@LocalStorage() value: string;
	// after
	@LocalStorage() value!: string;
	```
	The decorators install a prototype accessor rather than a class field, so the
	property genuinely has no initializer and TypeScript reports TS2564. This is
	not new behaviour — TypeScript 6.0 turns `strict` on by default, so more
	projects now see it.

3. Nothing to do if you implement `StorageStrategy` yourself. `keyChanges`
   stays `Subject<string>`. Be aware it emits `null` at runtime to mean
   "everything was cleared" — the declared type does not say so, because
   widening it would be a source break for every subscriber, and this release
   supports Angular 21 consumers.

4. Nothing to do for change detection. Angular 22 makes every component OnPush
   by default, which would otherwise have stopped decorated bindings from
   repainting when storage changes outside the component — most visibly on the
   cross-tab `storage` event, and always under zoneless. The decorators are now
   signal-backed so this keeps working, in zoned and zoneless applications
   alike, with no change on your side.

5. `StrategyIndex.get()` now throws `invalid_strategy` when a strategy is
   registered but unavailable and no in-memory fallback is registered. It
   previously returned `undefined` and failed later with a confusing
   "cannot read properties of undefined". If you relied on the silent
   `undefined`, handle the exception.

6. A configuration property explicitly set to `undefined` is now ignored
   instead of applied. On v21, `withNgxWebstorageConfig({prefix: undefined})`
   set the prefix to `undefined` and every key was persisted literally as
   `undefined|<key>`; the same call now keeps the default `ngx-webstorage`
   prefix. If your v21 app stored data under `undefined|`-prefixed keys
   (typically a prefix read from an optional source), migrate those entries or
   pass the literal prefix `'undefined'` to keep reading them.

7. The observables returned by a strategy's `del()` and `clear()` now emit
   `undefined` instead of `null` (their declared type was always
   `Observable<void>`). A subscriber comparing the emitted value to `null` —
   or a test asserting `toBeNull()` on it — must be updated. The
   `cross-storage` strategy still resolves to `null`.

#### Breaking type changes in v22

Enabling `strict` added types to a public surface that previously had none. All
of these affect only code that **implements or subclasses** the library's
primitives — the `LocalStorageService` / `SessionStorageService` / decorator
paths are unchanged.

| Symbol | v21 | v22 |
|---|---|---|
| `StorageService.clear(key?)` | `any` | `void` |
| `BaseSyncStorageStrategy._isAvailable` (protected) | `boolean` | `boolean \| undefined` |
| `StrategyIndex.set(name, strategy)` | `strategy: any` | `strategy: StorageStrategy<any>` |
| `@LocalStorage` / `@SessionStorage` | `propName: any` | `propName: string` |

`StorageStrategy.keyChanges` deliberately stays `Subject<string>`. Widening it to
`Subject<string | null>` — which would match the `null` it emits on clear — was
tried and reverted, because it breaks every *subscriber*, not just implementors,
and this release supports Angular 21 consumers. Deferred to v23.

> Keep `"useDefineForClassFields": false` in your tsconfig if you set it
> explicitly. With ES2022 `[[Define]]` semantics, decorated fields become own
> properties initialised to `undefined` that shadow the accessor, and every
> binding silently returns `undefined` with no compile error.

------------

### <a name="gstart">Getting Started</a>

1. Download the library using npm `npm install --save ngx-webstorage`
2. Declare the library in your main module

	```typescript
	import {NgModule} from '@angular/core';
	import {BrowserModule} from '@angular/platform-browser';
	import {provideNgxWebstorage, withNgxWebstorageConfig} from 'ngx-webstorage';

	@NgModule({
		declarations: [...],
		imports: [
			BrowserModule
		],
		providers: [
			provideNgxWebstorage(),
			//provideNgxWebstorage(
			//  withNgxWebstorageConfig({ prefix: 'custom', separator: '.', caseSensitive:true }) 
			//)
			// The config allows to configure the prefix, the separator and the caseSensitive option used by the library
			// Default values:
			// prefix: "ngx-webstorage"
			// separator: "|"
			// caseSensitive: false 
		]
		bootstrap: [...]
	})
	export class AppModule {
	}

	```

3. Inject the services you want in your components and/or use the available decorators

	```typescript
	import {Component} from '@angular/core';
	import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

	@Component({
		selector: 'foo',
		template: `foobar`
	})
	export class FooComponent {

		constructor(private localSt:LocalStorageService) {}

		ngOnInit() {
			this.localSt.observe('key')
				.subscribe((value) => console.log('new value', value));
		}

	}
	```

	```typescript
	import {Component} from '@angular/core';
	import {LocalStorage, SessionStorage} from 'ngx-webstorage';

	@Component({
		selector: 'foo',
		template: `{{boundValue}}`,
	})
	export class FooComponent {

		@LocalStorage()
		public boundValue;

	}
	```

### <a name="provider_fn">Provider Function</a>

Since the new standalone API and angular v15+, provider functions are now the way to go to configure your application ([learn more](https://angular.dev/reference/migrations/standalone)).

1. From now on to setup your project, you can use the `provideNgxWebstorage` function.

2. You can independently add the (you can of course add them both together):
   - `localStorage` features with `withLocalStorage`
   - `sessionStorage` features with `withLocalStorage`

3. You can add a custom configuration with `withNgxWebstorageConfig`
   
```ts
bootstrapApplication(AppComponent, {
	providers: [
		// ...
		provideNgxWebstorage(
			withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
			withLocalStorage(),
			withSessionStorage()
		)
	]
})
```

### <a name="services">Services</a>
--------------------

### <a name="s_localstorage">`LocalStorageService`</a>

#### Store( key:`string`, value:`any` ):`void`
> create or update an item in the local storage

##### Params:
- **key**:     String.   localStorage key.
- **value**:     Serializable.   value to store.

##### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
	selector: 'foo',
	template: `
		<section><input type="text" [(ngModel)]="attribute"/></section>
		<section><button (click)="saveValue()">Save</button></section>
	`,
})
export class FooComponent {

    attribute;

    constructor(private storage:LocalStorageService) {}

    saveValue() {
      this.storage.store('boundValue', this.attribute);
    }

}
````

------------

#### Retrieve( key:`string` ):`any`
> retrieve a value from the local storage

##### Params:
- **key**:     String.   localStorage key.

##### Result:
- Any; value

##### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
	selector: 'foo',
	template: `
		<section>{{attribute}}</section>
		<section><button (click)="retrieveValue()">Retrieve</button></section>
	`,
})
export class FooComponent {

    attribute;

    constructor(private storage:LocalStorageService) {}

    retrieveValue() {
      this.attribute = this.storage.retrieve('boundValue');
    }

}
````

------------

#### Clear( key?:`string` ):`void`

##### Params:
- **key**: *(Optional)*     String.   localStorage key.

##### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorageService, LocalStorage} from 'ngx-webstorage';

@Component({
	selector: 'foo',
	template: `
		<section>{{boundAttribute}}</section>
		<section><button (click)="clearItem()">Clear</button></section>
	`,
})
export class FooComponent {

    @LocalStorage('boundValue')
    boundAttribute;

    constructor(private storage:LocalStorageService) {}

    clearItem() {
      this.storage.clear('boundValue');
      //this.storage.clear(); //clear all the managed storage items
    }

}
````
------------

#### IsStorageAvailable():`boolean`

##### Usage:
````typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorageService, LocalStorage} from 'ngx-webstorage';

@Component({
	selector: 'foo',
	template: `...`,
})
export class FooComponent implements OnInit {

    @LocalStorage('boundValue')
    boundAttribute;

    constructor(private storage:LocalStorageService) {}

    ngOnInit() {
      let isAvailable = this.storage.isStorageAvailable();
      console.log(isAvailable);
    }

}
````

------------

#### Observe( key?:`string` ):`EventEmitter`

##### Params:
- **key**: *(Optional)*     localStorage key.

##### Result:
- Observable; instance of EventEmitter

##### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorageService, LocalStorage} from 'ngx-webstorage';

@Component({
	selector: 'foo',
	template: `{{boundAttribute}}`,
})
export class FooComponent {

    @LocalStorage('boundValue')
    boundAttribute;

    constructor(private storage:LocalStorageService) {}

    ngOnInit() {
      this.storage.observe('boundValue')
        .subscribe((newValue) => {
          console.log(newValue);
        })
    }

}
````


### <a name="s_sessionstorage">`SessionStorageService`</a>
> The api is identical as the LocalStorageService's

### <a name="decorators">Decorators</a>
--------------------

### <a name="d_localstorage">`@LocalStorage`</a>
> Synchronize the decorated attribute with a given value in the localStorage

#### Params:
 - **storage key**: *(Optional)*    String.   localStorage key, by default the decorator will take the attribute name.
 - **default value**: *(Optional)*    Serializable.   Default value

#### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorage, SessionStorage} from 'ngx-webstorage';

@Component({
	selector: 'foo',
	template: `{{boundAttribute}}`,
})
export class FooComponent {

	@LocalStorage()
	public boundAttribute;

}
````

------------

### <a name="d_sessionStorage">`@SessionStorage`</a>
> Synchronize the decorated attribute with a given value in the sessionStorage

#### Params:
 - **storage key**: *(Optional)*    String.   SessionStorage key, by default the decorator will take the attribute name.
 - **default value**: *(Optional)*    Serializable.   Default value

#### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorage, SessionStorage} from 'ngx-webstorage';

@Component({
	selector: 'foo',
	template: `{{randomName}}`,
})
export class FooComponent {

	@SessionStorage('AnotherBoundAttribute')
	public randomName;

}
````

### <a name="knownissues">Known issues</a>
--------------------

- *Serialization doesn't work for objects:* 

NgxWebstorage's decorators are based upon accessors so the update trigger only on assignation. 
Consequence, if you change the value of a bound object's property the new model will not be store properly. The same thing will happen with a push into a bound array. 
To handle this cases you have to trigger manually the accessor.

````typescript
import {LocalStorage} from 'ngx-webstorage';

class FooBar {

    @LocalStorage('prop')
    myArray;

    updateValue() {
        this.myArray.push('foobar');
        this.myArray = this.myArray; //does the trick
    }

}
````


### <a name="modifBuild">Modify and build</a>
--------------------

`npm install`

*Start the unit tests:* `npm run test`

*Start the unit tests:* `npm run test:watch`

*Start the dev server:* `npm run dev` then go to *http://localhost:8080/webpack-dev-server/index.html*
