# Migration guides

`ngx-webstorage` follows the Angular major version: `ngx-webstorage` v*N* targets Angular v*N*.
Most major bumps are Angular-compatibility releases only and need no code change on your side.
The versions below are the ones that changed the public API.

Release-by-release notes live in [CHANGELOG.md](./CHANGELOG.md).

---

## v21.x → v22

v22 is built against Angular 22, but its peer range is `>=21.0.0 <23.0.0`: an Angular 21
application can install it. Most consumers have nothing to change. Read steps 2, 5, 6 and 7.

### 1. Angular and Node

Update to Angular 21 or 22. Angular 22 requires Node `^22.22.3`.

### 2. `strict` mode requires a definite assignment assertion

```typescript
// before
@LocalStorage() value: string;
// after
@LocalStorage() value!: string;
```

The decorators install a prototype accessor rather than a class field, so the property
genuinely has no initializer and TypeScript reports `TS2564`. The behaviour is not new —
TypeScript 6.0 turns `strict` on by default, so more projects now see it.

### 3. Change detection: nothing to do

Angular 22 makes every component `OnPush` by default. That would have stopped decorated
bindings from repainting when storage changes outside the component — most visibly on the
cross-tab `storage` event, and always under zoneless. The decorators are now signal-backed,
so this keeps working in zoned and zoneless applications alike, with no change on your side.

### 4. `StorageStrategy` implementors: `keyChanges` is unchanged

`keyChanges` stays `Subject<string>`. It emits `null` at runtime to mean "everything was
cleared"; the declared type does not say so, because widening it breaks every *subscriber*,
not only implementors, and this release serves Angular 21 consumers. Deferred to v23.

### 5. `StrategyIndex.get()` throws instead of returning `undefined`

It now throws `invalid_strategy` when a strategy is registered but unavailable and no
in-memory fallback is registered. It previously returned `undefined` and failed later with
`cannot read properties of undefined`. If you relied on the silent `undefined`, handle the
exception.

### 6. An explicitly `undefined` config value is now ignored

On v21, `withNgxWebstorageConfig({prefix: undefined})` set the prefix to `undefined` and
every key was persisted literally as `undefined|<key>`. The same call now keeps the default
`ngx-webstorage` prefix.

**If your v21 app stored data under `undefined|`-prefixed keys** — typically a prefix read
from an optional source — migrate those entries, or pass the literal string `'undefined'`
as prefix to keep reading them.

### 7. `del()` and `clear()` emit `undefined` instead of `null`

Their declared type was always `Observable<void>`. A subscriber comparing the emitted value
to `null`, or a test asserting `toBeNull()` on it, must be updated. The `cross-storage`
strategy still resolves to `null`.

### Breaking type changes

Enabling `strict` added types to a public surface that previously had none. These affect only
code that **implements or subclasses** the library's primitives. The
`LocalStorageService` / `SessionStorageService` / decorator paths are unchanged.

| Symbol | v21 | v22 |
|---|---|---|
| `StorageService.clear(key?)` | `any` | `void` |
| `BaseSyncStorageStrategy._isAvailable` (protected) | `boolean` | `boolean \| undefined` |
| `StrategyIndex.set(name, strategy)` | `strategy: any` | `strategy: StorageStrategy<any>` |
| `@LocalStorage` / `@SessionStorage` | `propName: any` | `propName: string` |

> **Keep `"useDefineForClassFields": false`** in your tsconfig if you set it explicitly.
> Under ES2022 `[[Define]]` semantics, decorated fields become own properties initialised to
> `undefined` that shadow the accessor, and every binding silently returns `undefined` with
> no compile error.

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
