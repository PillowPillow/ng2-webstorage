# Migration guides

`ngx-webstorage` follows the Angular major version: `ngx-webstorage` v*N* targets Angular v*N*.
Most major bumps are Angular-compatibility releases only and need no code change on your side.
The versions below are the ones that changed the public API.

Release-by-release notes live in [CHANGELOG.md](./CHANGELOG.md).

---

## v13.x → v18

Angular 18 replaced the `NgModule` setup with provider functions.

1. Update your project to Angular 18+.
2. Replace `NgxWebstorageModule.forRoot()` with `provideNgxWebstorage()`.
3. Configure the library with the new feature functions.

**Before**

```typescript
@NgModule({
	imports: [
		NgxWebstorageModule.forRoot({ separator: ':', caseSensitive: true }),
	],
})
export class AppModule {}
```

**After**

```typescript
bootstrapApplication(AppComponent, {
	providers: [
		provideNgxWebstorage(
			withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
			withLocalStorage(),
			withSessionStorage(),
		),
	],
});
```

`withLocalStorage()` and `withSessionStorage()` are independent: add only the storages you use, or both.

---

## v2.x → v3

1. Update your project to Angular 7+.
2. Rename the module usages: `Ng2Webstorage` becomes `NgxWebstorageModule.forRoot()`.

> `forRoot()` is now mandatory in the root module, even when you do not configure the library.

**Before**

```typescript
@NgModule({
	imports: [Ng2Webstorage],
})
export class AppModule {}
```

**After**

```typescript
@NgModule({
	imports: [NgxWebstorageModule.forRoot()],
})
export class AppModule {}
```

---

## v1.x → v2

The package was renamed from `ng2-webstorage` to `ngx-webstorage`.
Guides for the 1.x line are kept in the [legacy section of CHANGELOG.md](./CHANGELOG.md#legacy-ng2-webstorage-1x).
