# ng2-webstorage
###Local and session storage - angular2 service (*typescript*)
=======================

This library provides an easy to use service to manage the web storages (local and session) from your ng2 application.
It provides also two decorators to synchronize the component attributes and the web storages.

------------

#### Index:
* [Getting Started](#gstart)
* [Services](#services):
	* [LocalStorageService](#s_localstorage)
	* [SessionStorageService](#s_sessionstorage)
* [Decorators](#decorators):
	* [@LocalStorage](#d_localstorage)
	* [@SessionStorage](#d_sessionStorage)
* [Modify and build](#modifBuild)

------------

### <a name="gstart">Getting Started</a>

1. Download the library using npm `npm install --save ng2-webstorage`
2. Register the library in your module

	```typescript
	import {NgModule} from '@angular/core';
	import {BrowserModule} from '@angular/platform-browser';
	import {Ng2Webstorage} from 'ng2-webstorage';

	@NgModule({
		declarations: [...],
		imports: [
			BrowserModule,
			Ng2Webstorage,
			//Ng2Webstorage.forRoot({ prefix: 'custom', separator: '.' }) The forRoot method allows to configure the prefix and the separator used by the library
		],
		bootstrap: [...]
	})
	export class AppModule {
	}

	```
		
	If you're using systemJS, you have to reference the umd version of the lib in your config.
	```` typescript
		System.config({
			map: { 
				...,
				'ng2-webstorage': 'node_modules/ng2-webstorage'
			},
			packages: {
				...,
				'ng2-webstorage': {main: 'bundles/core.umd.js', defaultExtension: 'js'}
			}
		});
	````
	

3. Inject the services you want in your components and/or use the available decorators

	```typescript
	import {Component} from '@angular/core';
	import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';

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
	import {LocalStorage, SessionStorage} from 'ng2-webstorage';

	@Component({
		selector: 'foo',
		template: `{{boundValue}}`,
	})
	export class FooComponent {

		@LocalStorage()
		public boundValue;

	}
	```

### <a name="services">Services</a>
--------------------

###<a name="s_localstorage">`LocalStorageService`</a>

#### Store( key:`string`, value:`any` ):`void`
> create or update an item in the local storage

##### Params:
- **key**:     String.   localStorage key.
- **value**:     Serializable.   value to store.

##### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';

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
import {LocalStorageService} from 'ng2-webstorage';

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
import {LocalStorageService, LocalStorage} from 'ng2-webstorage';

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

#### Observe( key?:`string` ):`EventEmitter`

##### Params:
- **key**:     String.   localStorage key.

##### Result:
- Observable; instance of EventEmitter

##### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorageService, LocalStorage} from 'ng2-webstorage';

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


###<a name="s_sessionstorage">`SessionStorageService`</a>
> The api is identical as the LocalStorageService's

### <a name="decorators">Decorators</a>
--------------------

###<a name="d_localstorage">`@LocalStorage`</a>
> Synchronize the decorated attribute with a given value in the localStorage

#### Params:
 - **storage key**: *(Optional)*    String.   localStorage key, by default the decorator will take the attribute name.

#### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorage, SessionStorage} from 'ng2-webstorage';

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

###<a name="d_sessionStorage">`@SessionStorage`</a>
> Synchronize the decorated attribute with a given value in the sessionStorage

#### Params:
 - **storage key**: *(Optional)*    String.   SessionStorage key, by default the decorator will take the attribute name.

#### Usage:
````typescript
import {Component} from '@angular/core';
import {LocalStorage, SessionStorage} from 'ng2-webstorage';

@Component({
	selector: 'foo',
	template: `{{randomName}}`,
})
export class FooComponent {

	@SessionStorage('AnotherBoundAttribute')
	public randomName;

}
````

### <a name="modifBuild">Modify and build</a>
--------------------

`npm install`

*Start the unit tests:* `npm run test`

*Start the unit tests:* `npm run test:watch`

*Start the dev server:* `npm run dev` then go to *http://localhost:8080/webpack-dev-server/index.html*

