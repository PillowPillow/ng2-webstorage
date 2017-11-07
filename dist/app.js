import { NgModule, NgZone, Inject, Optional, InjectionToken } from '@angular/core';
import { LIB_KEY, LIB_KEY_SEPARATOR, LIB_KEY_CASE_SENSITIVE } from './constants/lib';
import { STORAGE } from './enums/storage';
import { LocalStorageService, SessionStorageService } from './services/index';
import { WebStorageHelper } from './helpers/webStorage';
import { WebstorageConfig } from './interfaces/config';
import { KeyStorageHelper } from './helpers/keyStorage';
export * from './interfaces/index';
export * from './decorators/index';
export * from './services/index';
export var WEBSTORAGE_CONFIG = new InjectionToken('WEBSTORAGE_CONFIG');
var Ng2Webstorage = (function () {
    function Ng2Webstorage(ngZone, config) {
        this.ngZone = ngZone;
        if (config) {
            KeyStorageHelper.setStorageKeyPrefix(config.prefix);
            KeyStorageHelper.setStorageKeySeparator(config.separator);
            KeyStorageHelper.setCaseSensitivity(config.caseSensitive);
        }
        this.initStorageListener();
    }
    Ng2Webstorage.forRoot = function (config) {
        return {
            ngModule: Ng2Webstorage,
            providers: [
                {
                    provide: WEBSTORAGE_CONFIG,
                    useValue: config
                },
                {
                    provide: WebstorageConfig,
                    useFactory: provideConfig,
                    deps: [
                        WEBSTORAGE_CONFIG
                    ]
                }
            ]
        };
    };
    Ng2Webstorage.prototype.initStorageListener = function () {
        var _this = this;
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', function (event) { return _this.ngZone.run(function () {
                var storage = window.sessionStorage === event.storageArea ? STORAGE.session : STORAGE.local;
                WebStorageHelper.refresh(storage, event.key);
            }); });
        }
    };
    return Ng2Webstorage;
}());
export { Ng2Webstorage };
Ng2Webstorage.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                providers: [SessionStorageService, LocalStorageService],
                imports: []
            },] },
];
/** @nocollapse */
Ng2Webstorage.ctorParameters = function () { return [
    { type: NgZone, },
    { type: WebstorageConfig, decorators: [{ type: Optional }, { type: Inject, args: [WebstorageConfig,] },] },
]; };
export function provideConfig(config) {
    return new WebstorageConfig(config);
}
export function configure(_a) {
    var _b = _a === void 0 ? {
        caseSensitive: LIB_KEY_CASE_SENSITIVE,
        prefix: LIB_KEY,
        separator: LIB_KEY_SEPARATOR
    } : _a, prefix = _b.prefix, separator = _b.separator, caseSensitive = _b.caseSensitive;
    /*@Deprecation*/
    console.warn('[ng2-webstorage:deprecation] The configure method is deprecated since the v1.5.0, consider to use forRoot instead');
    KeyStorageHelper.setStorageKeyPrefix(prefix);
    KeyStorageHelper.setStorageKeySeparator(separator);
    KeyStorageHelper.setCaseSensitivity(caseSensitive);
}
//# sourceMappingURL=app.js.map