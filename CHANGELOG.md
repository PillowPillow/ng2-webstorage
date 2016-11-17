<a name="1.4.0"></a>

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
