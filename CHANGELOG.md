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
