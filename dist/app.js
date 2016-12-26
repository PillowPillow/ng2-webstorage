import { NgModule, NgZone } from '@angular/core';
import { LIB_KEY, LIB_KEY_SEPARATOR } from './constants/lib';
import { STORAGE } from './enums/storage';
import { LocalStorageService, SessionStorageService } from './services/index';
import { WebStorageHelper } from './helpers/webStorage';
import { KeyStorageHelper } from './helpers/keyStorage';
export * from './interfaces/index';
export * from './decorators/index';
export * from './services/index';
export var Ng2Webstorage = (function () {
    function Ng2Webstorage(ngZone) {
        this.ngZone = ngZone;
        this.initStorageListener();
    }
    Ng2Webstorage.forRoot = function (_a) {
        var _b = _a === void 0 ? { prefix: LIB_KEY, separator: LIB_KEY_SEPARATOR } : _a, prefix = _b.prefix, separator = _b.separator;
        KeyStorageHelper.setStorageKeyPrefix(prefix);
        KeyStorageHelper.setStorageKeySeparator(separator);
        return { ngModule: Ng2Webstorage, providers: [] };
    };
    Ng2Webstorage.prototype.initStorageListener = function () {
        var _this = this;
        if (window)
            window.addEventListener('storage', function (event) { return _this.ngZone.run(function () {
                var storage = window.sessionStorage === event.storageArea ? STORAGE.session : STORAGE.local;
                WebStorageHelper.refresh(storage, event.key);
            }); });
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
    ]; };
    return Ng2Webstorage;
}());
export function configure(_a) {
    var _b = _a === void 0 ? { prefix: LIB_KEY, separator: LIB_KEY_SEPARATOR } : _a, prefix = _b.prefix, separator = _b.separator;
    KeyStorageHelper.setStorageKeyPrefix(prefix);
    KeyStorageHelper.setStorageKeySeparator(separator);
}
//# sourceMappingURL=app.js.map