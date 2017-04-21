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
