'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Ng2Webstorage = exports.WEBSTORAGE_CONFIG = undefined;

var _index = require('./interfaces/index');

Object.keys(_index).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _index[key];
        }
    });
});

var _index2 = require('./decorators/index');

Object.keys(_index2).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _index2[key];
        }
    });
});

var _index3 = require('./services/index');

Object.keys(_index3).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _index3[key];
        }
    });
});
exports.provideConfig = provideConfig;

var _core = require('@angular/core');

var _storage = require('./enums/storage');

var _webStorage = require('./helpers/webStorage');

var _config = require('./interfaces/config');

var _keyStorage = require('./helpers/keyStorage');

var _storageObserver = require('./helpers/storageObserver');

var WEBSTORAGE_CONFIG = exports.WEBSTORAGE_CONFIG = new _core.InjectionToken('WEBSTORAGE_CONFIG');
var Ng2Webstorage = function () {
    function Ng2Webstorage(ngZone, config) {
        this.ngZone = ngZone;
        if (config) {
            _keyStorage.KeyStorageHelper.setStorageKeyPrefix(config.prefix);
            _keyStorage.KeyStorageHelper.setStorageKeySeparator(config.separator);
            _keyStorage.KeyStorageHelper.setCaseSensitivity(config.caseSensitive);
        }
        this.initStorageListener();
        _storageObserver.StorageObserverHelper.initStorage();
    }
    Ng2Webstorage.forRoot = function (config) {
        return {
            ngModule: Ng2Webstorage,
            providers: [{
                provide: WEBSTORAGE_CONFIG,
                useValue: config
            }, {
                provide: _config.WebstorageConfig,
                useFactory: provideConfig,
                deps: [WEBSTORAGE_CONFIG]
            }]
        };
    };
    Ng2Webstorage.prototype.initStorageListener = function () {
        var _this = this;
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', function (event) {
                return _this.ngZone.run(function () {
                    var storage = window.sessionStorage === event.storageArea ? _storage.STORAGE.session : _storage.STORAGE.local;
                    if (event.key === null) _webStorage.WebStorageHelper.refreshAll(storage);else _webStorage.WebStorageHelper.refresh(storage, event.key);
                });
            });
        }
    };
    Ng2Webstorage.decorators = [{ type: _core.NgModule, args: [{
            declarations: [],
            providers: [_index3.SessionStorageService, _index3.LocalStorageService],
            imports: []
        }] }];
    /** @nocollapse */
    Ng2Webstorage.ctorParameters = function () {
        return [{ type: _core.NgZone }, { type: _config.WebstorageConfig, decorators: [{ type: _core.Optional }, { type: _core.Inject, args: [_config.WebstorageConfig] }] }];
    };
    return Ng2Webstorage;
}();
exports.Ng2Webstorage = Ng2Webstorage;
function provideConfig(config) {
    return new _config.WebstorageConfig(config);
}
//# sourceMappingURL=app.js.map