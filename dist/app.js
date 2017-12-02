import { Inject, InjectionToken, NgModule, NgZone, Optional } from '@angular/core';
import { STORAGE } from './enums/storage';
import { LocalStorageService, SessionStorageService } from './services/index';
import { WebStorageHelper } from './helpers/webStorage';
import { WebstorageConfig } from './interfaces/config';
import { KeyStorageHelper } from './helpers/keyStorage';
import { StorageObserverHelper } from './helpers/storageObserver';
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
        StorageObserverHelper.initStorage();
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
            window.addEventListener('storage', function (event) {
                return _this.ngZone.run(function () {
                    var storage = window.sessionStorage === event.storageArea ? STORAGE.session : STORAGE.local;
                    if (event.key === null)
                        WebStorageHelper.refreshAll(storage);
                    else
                        WebStorageHelper.refresh(storage, event.key);
                });
            });
        }
    };
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
    return Ng2Webstorage;
}());
export { Ng2Webstorage };
export function provideConfig(config) {
    return new WebstorageConfig(config);
}
//# sourceMappingURL=app.js.map