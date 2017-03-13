(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
    (factory((global.ng2Webstorage = global.ng2Webstorage || {}),global.ng.core));
}(this, (function (exports,_angular_core) { 'use strict';

var STORAGE;
(function (STORAGE) {
    STORAGE[STORAGE["local"] = 0] = "local";
    STORAGE[STORAGE["session"] = 1] = "session";
})(STORAGE || (STORAGE = {}));

var LIB_KEY = 'ng2-webstorage';
var LIB_KEY_SEPARATOR = '|';
var STORAGE_NAMES = (_a = {},
    _a[STORAGE.local] = 'local',
    _a[STORAGE.session] = 'session',
    _a
);
var _a;

var CUSTOM_LIB_KEY = LIB_KEY;
var CUSTOM_LIB_KEY_SEPARATOR = LIB_KEY_SEPARATOR;
var KeyStorageHelper = (function () {
    function KeyStorageHelper() {
    }
    KeyStorageHelper.isManagedKey = function (sKey) {
        return sKey.indexOf(CUSTOM_LIB_KEY + CUSTOM_LIB_KEY_SEPARATOR) === 0;
    };
    KeyStorageHelper.retrieveKeysFromStorage = function (storage) {
        return Object.keys(storage).filter(function (key) { return key.indexOf(CUSTOM_LIB_KEY) === 0; });
    };
    KeyStorageHelper.genKey = function (raw) {
        if (typeof raw !== 'string')
            throw Error('attempt to generate a storage key with a non string value');
        return "" + CUSTOM_LIB_KEY + CUSTOM_LIB_KEY_SEPARATOR + raw.toString().toLowerCase();
    };
    KeyStorageHelper.setStorageKeyPrefix = function (key) {
        if (key === void 0) { key = LIB_KEY; }
        CUSTOM_LIB_KEY = key;
    };
    KeyStorageHelper.setStorageKeySeparator = function (separator) {
        if (separator === void 0) { separator = LIB_KEY_SEPARATOR; }
        CUSTOM_LIB_KEY_SEPARATOR = separator;
    };
    return KeyStorageHelper;
}());

var StorageObserverHelper = (function () {
    function StorageObserverHelper() {
    }
    StorageObserverHelper.observe = function (sType, sKey) {
        var oKey = this.genObserverKey(sType, sKey);
        if (oKey in this.observers)
            return this.observers[oKey];
        return this.observers[oKey] = new _angular_core.EventEmitter();
    };
    StorageObserverHelper.emit = function (sType, sKey, value) {
        var oKey = this.genObserverKey(sType, sKey);
        if (oKey in this.observers)
            this.observers[oKey].emit(value);
    };
    StorageObserverHelper.genObserverKey = function (sType, sKey) {
        return sType + "|" + sKey;
    };
    StorageObserverHelper.observers = {};
    return StorageObserverHelper;
}());

var MockStorageHelper = (function () {
    function MockStorageHelper() {
    }
    MockStorageHelper.isSecuredField = function (field) {
        return !!~MockStorageHelper.securedFields.indexOf(field);
    };
    MockStorageHelper.getStorage = function (sType) {
        if (!this.mockStorages[sType])
            this.mockStorages[sType] = MockStorageHelper.generateStorage();
        return this.mockStorages[sType];
    };
    MockStorageHelper.generateStorage = function () {
        var storage = {};
        Object.defineProperties(storage, {
            setItem: {
                writable: false,
                enumerable: false,
                configurable: false,
                value: function (key, value) {
                    if (!MockStorageHelper.isSecuredField(key))
                        this[key] = value;
                },
            },
            getItem: {
                writable: false,
                enumerable: false,
                configurable: false,
                value: function (key) {
                    return !MockStorageHelper.isSecuredField(key) ? this[key] || null : null;
                },
            },
            removeItem: {
                writable: false,
                enumerable: false,
                configurable: false,
                value: function (key) {
                    if (!MockStorageHelper.isSecuredField(key))
                        delete this[key];
                },
            },
            length: {
                enumerable: false,
                configurable: false,
                get: function () {
                    return Object.keys(this).length;
                }
            }
        });
        return storage;
    };
    MockStorageHelper.securedFields = ['setItem', 'getItem', 'removeItem', 'length'];
    MockStorageHelper.mockStorages = {};
    return MockStorageHelper;
}());

var WebStorageHelper = (function () {
    function WebStorageHelper() {
    }
    WebStorageHelper.store = function (sType, sKey, value) {
        this.getStorage(sType).setItem(sKey, JSON.stringify(value));
        this.cached[sType][sKey] = value;
        StorageObserverHelper.emit(sType, sKey, value);
    };
    WebStorageHelper.retrieve = function (sType, sKey) {
        if (this.cached[sType][sKey])
            return this.cached[sType][sKey];
        return this.cached[sType][sKey] = WebStorageHelper.retrieveFromStorage(sType, sKey);
    };
    WebStorageHelper.retrieveFromStorage = function (sType, sKey) {
        var data = null;
        try {
            data = JSON.parse(this.getStorage(sType).getItem(sKey));
        }
        catch (err) {
            console.warn("invalid value for " + sKey);
        }
        return data;
    };
    WebStorageHelper.refresh = function (sType, sKey) {
        if (!KeyStorageHelper.isManagedKey(sKey))
            return;
        var value = WebStorageHelper.retrieveFromStorage(sType, sKey);
        if (value === null) {
            delete this.cached[sType][sKey];
            StorageObserverHelper.emit(sType, sKey, null);
        }
        else if (value !== this.cached[sType][sKey]) {
            this.cached[sType][sKey] = value;
            StorageObserverHelper.emit(sType, sKey, value);
        }
    };
    WebStorageHelper.clearAll = function (sType) {
        var _this = this;
        var storage = this.getStorage(sType);
        KeyStorageHelper.retrieveKeysFromStorage(storage)
            .forEach(function (sKey) {
            storage.removeItem(sKey);
            delete _this.cached[sType][sKey];
            StorageObserverHelper.emit(sType, sKey, null);
        });
    };
    WebStorageHelper.clear = function (sType, sKey) {
        this.getStorage(sType).removeItem(sKey);
        delete this.cached[sType][sKey];
        StorageObserverHelper.emit(sType, sKey, null);
    };
    WebStorageHelper.getStorage = function (sType) {
        return this.isStorageAvailable(sType) ? this.getWStorage(sType) : MockStorageHelper.getStorage(sType);
    };
    WebStorageHelper.getWStorage = function (sType) {
        var storage;
        switch (sType) {
            case STORAGE.local:
                storage = localStorage;
                break;
            case STORAGE.session:
                storage = sessionStorage;
                break;
            default:
                throw Error('invalid storage type');
        }
        return storage;
    };
    WebStorageHelper.isStorageAvailable = function (sType) {
        if (typeof this.storageAvailability[sType] === 'boolean')
            return this.storageAvailability[sType];
        var isAvailable = true, storage = this.getWStorage(sType);
        if (typeof storage === 'object') {
            try {
                storage.setItem('test-storage', 'foobar');
                storage.removeItem('test-storage');
            }
            catch (e) {
                isAvailable = false;
            }
        }
        else
            isAvailable = false;
        if (!isAvailable)
            console.warn(STORAGE_NAMES[sType] + " storage unavailable, Ng2Webstorage will use a fallback strategy instead");
        return this.storageAvailability[sType] = isAvailable;
    };
    WebStorageHelper.cached = (_a = {}, _a[STORAGE.local] = {}, _a[STORAGE.session] = {}, _a);
    WebStorageHelper.storageAvailability = (_b = {}, _b[STORAGE.local] = null, _b[STORAGE.session] = null, _b);
    return WebStorageHelper;
    var _a, _b;
}());

var WebStorageService = (function () {
    function WebStorageService(sType) {
        if (sType === void 0) { sType = null; }
        this.sType = sType;
        this.sType = sType;
    }
    WebStorageService.prototype.store = function (raw, value) {
        var sKey = KeyStorageHelper.genKey(raw);
        WebStorageHelper.store(this.sType, sKey, value);
    };
    WebStorageService.prototype.retrieve = function (raw) {
        var sKey = KeyStorageHelper.genKey(raw);
        return WebStorageHelper.retrieve(this.sType, sKey);
    };
    WebStorageService.prototype.clear = function (raw) {
        if (raw)
            WebStorageHelper.clear(this.sType, KeyStorageHelper.genKey(raw));
        else
            WebStorageHelper.clearAll(this.sType);
    };
    WebStorageService.prototype.observe = function (raw) {
        var sKey = KeyStorageHelper.genKey(raw);
        return StorageObserverHelper.observe(this.sType, sKey);
    };
    return WebStorageService;
}());

var __extends = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LocalStorageService = (function (_super) {
    __extends(LocalStorageService, _super);
    function LocalStorageService() {
        _super.call(this, STORAGE.local);
    }
    LocalStorageService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    LocalStorageService.ctorParameters = function () { return []; };
    return LocalStorageService;
}(WebStorageService));

var __extends$1 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SessionStorageService = (function (_super) {
    __extends$1(SessionStorageService, _super);
    function SessionStorageService() {
        _super.call(this, STORAGE.session);
    }
    SessionStorageService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    SessionStorageService.ctorParameters = function () { return []; };
    return SessionStorageService;
}(WebStorageService));

var WebstorageConfig = (function () {
    function WebstorageConfig(config) {
        this.prefix = LIB_KEY;
        this.separator = LIB_KEY_SEPARATOR;
        if (config && config.prefix !== undefined) {
            this.prefix = config.prefix;
        }
        if (config && config.separator !== undefined) {
            this.separator = config.separator;
        }
    }
    return WebstorageConfig;
}());

function WebStorage(webSKey, sType) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw);
    };
}

function WebStorageDecorator(webSKey, sType, targetedClass, raw) {
    var key = webSKey || raw;
    Object.defineProperty(targetedClass, raw, {
        get: function () {
            var sKey = KeyStorageHelper.genKey(key);
            return WebStorageHelper.retrieve(sType, sKey);
        },
        set: function (value) {
            var sKey = KeyStorageHelper.genKey(key);
            this[sKey] = value;
            WebStorageHelper.store(sType, sKey, value);
        }
    });
}

function LocalStorage(webSKey) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw);
    };
}

function SessionStorage(webSKey) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.session, targetedClass, raw);
    };
}

var WEBSTORAGE_CONFIG = new _angular_core.OpaqueToken('WEBSTORAGE_CONFIG');
var Ng2Webstorage = (function () {
    function Ng2Webstorage(ngZone, config) {
        this.ngZone = ngZone;
        if (config) {
            KeyStorageHelper.setStorageKeyPrefix(config.prefix);
            KeyStorageHelper.setStorageKeySeparator(config.separator);
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
        if (window) {
            window.addEventListener('storage', function (event) { return _this.ngZone.run(function () {
                var storage = window.sessionStorage === event.storageArea ? STORAGE.session : STORAGE.local;
                WebStorageHelper.refresh(storage, event.key);
            }); });
        }
    };
    Ng2Webstorage.decorators = [
        { type: _angular_core.NgModule, args: [{
                    declarations: [],
                    providers: [SessionStorageService, LocalStorageService],
                    imports: []
                },] },
    ];
    /** @nocollapse */
    Ng2Webstorage.ctorParameters = function () { return [
        { type: _angular_core.NgZone, },
        { type: WebstorageConfig, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [WebstorageConfig,] },] },
    ]; };
    return Ng2Webstorage;
}());
function provideConfig(config) {
    return new WebstorageConfig(config);
}
function configure(_a) {
    var _b = _a === void 0 ? { prefix: LIB_KEY, separator: LIB_KEY_SEPARATOR } : _a, prefix = _b.prefix, separator = _b.separator;
    /*@Deprecation*/
    console.warn('[ng2-webstorage:deprecation] The configure method is deprecated since the v1.5.0, consider to use forRoot instead');
    KeyStorageHelper.setStorageKeyPrefix(prefix);
    KeyStorageHelper.setStorageKeySeparator(separator);
}

exports.WEBSTORAGE_CONFIG = WEBSTORAGE_CONFIG;
exports.Ng2Webstorage = Ng2Webstorage;
exports.provideConfig = provideConfig;
exports.configure = configure;
exports.WebstorageConfig = WebstorageConfig;
exports.LocalStorage = LocalStorage;
exports.SessionStorage = SessionStorage;
exports.WebStorage = WebStorage;
exports.WebStorageDecorator = WebStorageDecorator;
exports.WebStorageService = WebStorageService;
exports.LocalStorageService = LocalStorageService;
exports.SessionStorageService = SessionStorageService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS51bWQuanMiLCJzb3VyY2VzIjpbIi4uL2Rpc3QvZW51bXMvc3RvcmFnZS5qcyIsIi4uL2Rpc3QvY29uc3RhbnRzL2xpYi5qcyIsIi4uL2Rpc3QvaGVscGVycy9rZXlTdG9yYWdlLmpzIiwiLi4vZGlzdC9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlci5qcyIsIi4uL2Rpc3QvaGVscGVycy9tb2NrU3RvcmFnZS5qcyIsIi4uL2Rpc3QvaGVscGVycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy9sb2NhbFN0b3JhZ2UuanMiLCIuLi9kaXN0L3NlcnZpY2VzL3Nlc3Npb25TdG9yYWdlLmpzIiwiLi4vZGlzdC9pbnRlcmZhY2VzL2NvbmZpZy5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9kZWNvcmF0b3JzL2xvY2FsU3RvcmFnZS5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL2Rpc3QvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgU1RPUkFHRTtcclxuKGZ1bmN0aW9uIChTVE9SQUdFKSB7XHJcbiAgICBTVE9SQUdFW1NUT1JBR0VbXCJsb2NhbFwiXSA9IDBdID0gXCJsb2NhbFwiO1xyXG4gICAgU1RPUkFHRVtTVE9SQUdFW1wic2Vzc2lvblwiXSA9IDFdID0gXCJzZXNzaW9uXCI7XHJcbn0pKFNUT1JBR0UgfHwgKFNUT1JBR0UgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuZXhwb3J0IHZhciBMSUJfS0VZID0gJ25nMi13ZWJzdG9yYWdlJztcclxuZXhwb3J0IHZhciBMSUJfS0VZX1NFUEFSQVRPUiA9ICd8JztcclxuZXhwb3J0IHZhciBTVE9SQUdFX05BTUVTID0gKF9hID0ge30sXHJcbiAgICBfYVtTVE9SQUdFLmxvY2FsXSA9ICdsb2NhbCcsXHJcbiAgICBfYVtTVE9SQUdFLnNlc3Npb25dID0gJ3Nlc3Npb24nLFxyXG4gICAgX2FcclxuKTtcclxudmFyIF9hO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1saWIuanMubWFwIiwiaW1wb3J0IHsgTElCX0tFWSwgTElCX0tFWV9TRVBBUkFUT1IgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcclxudmFyIENVU1RPTV9MSUJfS0VZID0gTElCX0tFWTtcclxudmFyIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUiA9IExJQl9LRVlfU0VQQVJBVE9SO1xyXG5leHBvcnQgdmFyIEtleVN0b3JhZ2VIZWxwZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gS2V5U3RvcmFnZUhlbHBlcigpIHtcclxuICAgIH1cclxuICAgIEtleVN0b3JhZ2VIZWxwZXIuaXNNYW5hZ2VkS2V5ID0gZnVuY3Rpb24gKHNLZXkpIHtcclxuICAgICAgICByZXR1cm4gc0tleS5pbmRleE9mKENVU1RPTV9MSUJfS0VZICsgQ1VTVE9NX0xJQl9LRVlfU0VQQVJBVE9SKSA9PT0gMDtcclxuICAgIH07XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnJldHJpZXZlS2V5c0Zyb21TdG9yYWdlID0gZnVuY3Rpb24gKHN0b3JhZ2UpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoc3RvcmFnZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleS5pbmRleE9mKENVU1RPTV9MSUJfS0VZKSA9PT0gMDsgfSk7XHJcbiAgICB9O1xyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkgPSBmdW5jdGlvbiAocmF3KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByYXcgIT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignYXR0ZW1wdCB0byBnZW5lcmF0ZSBhIHN0b3JhZ2Uga2V5IHdpdGggYSBub24gc3RyaW5nIHZhbHVlJyk7XHJcbiAgICAgICAgcmV0dXJuIFwiXCIgKyBDVVNUT01fTElCX0tFWSArIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUiArIHJhdy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9O1xyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5UHJlZml4ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGlmIChrZXkgPT09IHZvaWQgMCkgeyBrZXkgPSBMSUJfS0VZOyB9XHJcbiAgICAgICAgQ1VTVE9NX0xJQl9LRVkgPSBrZXk7XHJcbiAgICB9O1xyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5U2VwYXJhdG9yID0gZnVuY3Rpb24gKHNlcGFyYXRvcikge1xyXG4gICAgICAgIGlmIChzZXBhcmF0b3IgPT09IHZvaWQgMCkgeyBzZXBhcmF0b3IgPSBMSUJfS0VZX1NFUEFSQVRPUjsgfVxyXG4gICAgICAgIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUiA9IHNlcGFyYXRvcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gS2V5U3RvcmFnZUhlbHBlcjtcclxufSgpKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2V5U3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuZXhwb3J0IHZhciBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3RvcmFnZU9ic2VydmVySGVscGVyKCkge1xyXG4gICAgfVxyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLm9ic2VydmUgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcclxuICAgICAgICB2YXIgb0tleSA9IHRoaXMuZ2VuT2JzZXJ2ZXJLZXkoc1R5cGUsIHNLZXkpO1xyXG4gICAgICAgIGlmIChvS2V5IGluIHRoaXMub2JzZXJ2ZXJzKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnNbb0tleV07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2ZXJzW29LZXldID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgfTtcclxuICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0ID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBvS2V5ID0gdGhpcy5nZW5PYnNlcnZlcktleShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgaWYgKG9LZXkgaW4gdGhpcy5vYnNlcnZlcnMpXHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzW29LZXldLmVtaXQodmFsdWUpO1xyXG4gICAgfTtcclxuICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5nZW5PYnNlcnZlcktleSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xyXG4gICAgICAgIHJldHVybiBzVHlwZSArIFwifFwiICsgc0tleTtcclxuICAgIH07XHJcbiAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIub2JzZXJ2ZXJzID0ge307XHJcbiAgICByZXR1cm4gU3RvcmFnZU9ic2VydmVySGVscGVyO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yYWdlT2JzZXJ2ZXIuanMubWFwIiwiZXhwb3J0IHZhciBNb2NrU3RvcmFnZUhlbHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBNb2NrU3RvcmFnZUhlbHBlcigpIHtcclxuICAgIH1cclxuICAgIE1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkID0gZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgcmV0dXJuICEhfk1vY2tTdG9yYWdlSGVscGVyLnNlY3VyZWRGaWVsZHMuaW5kZXhPZihmaWVsZCk7XHJcbiAgICB9O1xyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuZ2V0U3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5tb2NrU3RvcmFnZXNbc1R5cGVdKVxyXG4gICAgICAgICAgICB0aGlzLm1vY2tTdG9yYWdlc1tzVHlwZV0gPSBNb2NrU3RvcmFnZUhlbHBlci5nZW5lcmF0ZVN0b3JhZ2UoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2NrU3RvcmFnZXNbc1R5cGVdO1xyXG4gICAgfTtcclxuICAgIE1vY2tTdG9yYWdlSGVscGVyLmdlbmVyYXRlU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3RvcmFnZSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0b3JhZ2UsIHtcclxuICAgICAgICAgICAgc2V0SXRlbToge1xyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFNb2NrU3RvcmFnZUhlbHBlci5pc1NlY3VyZWRGaWVsZChrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldEl0ZW06IHtcclxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFNb2NrU3RvcmFnZUhlbHBlci5pc1NlY3VyZWRGaWVsZChrZXkpID8gdGhpc1trZXldIHx8IG51bGwgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVtb3ZlSXRlbToge1xyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIU1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkKGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZW5ndGg6IHtcclxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgIH07XHJcbiAgICBNb2NrU3RvcmFnZUhlbHBlci5zZWN1cmVkRmllbGRzID0gWydzZXRJdGVtJywgJ2dldEl0ZW0nLCAncmVtb3ZlSXRlbScsICdsZW5ndGgnXTtcclxuICAgIE1vY2tTdG9yYWdlSGVscGVyLm1vY2tTdG9yYWdlcyA9IHt9O1xyXG4gICAgcmV0dXJuIE1vY2tTdG9yYWdlSGVscGVyO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2NrU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VPYnNlcnZlckhlbHBlciB9IGZyb20gJy4vc3RvcmFnZU9ic2VydmVyJztcclxuaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciB9IGZyb20gJy4va2V5U3RvcmFnZSc7XHJcbmltcG9ydCB7IE1vY2tTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi9tb2NrU3RvcmFnZSc7XHJcbmltcG9ydCB7IFNUT1JBR0VfTkFNRVMgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcclxuZXhwb3J0IHZhciBXZWJTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYlN0b3JhZ2VIZWxwZXIoKSB7XHJcbiAgICB9XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0U3RvcmFnZShzVHlwZSkuc2V0SXRlbShzS2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCB2YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlZFtzVHlwZV1bc0tleV0pXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZFtzVHlwZV1bc0tleV07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XSA9IFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmVGcm9tU3RvcmFnZShzVHlwZSwgc0tleSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZUZyb21TdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMuZ2V0U3RvcmFnZShzVHlwZSkuZ2V0SXRlbShzS2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiaW52YWxpZCB2YWx1ZSBmb3IgXCIgKyBzS2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5yZWZyZXNoID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgaWYgKCFLZXlTdG9yYWdlSGVscGVyLmlzTWFuYWdlZEtleShzS2V5KSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmVGcm9tU3RvcmFnZShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlZFtzVHlwZV1bc0tleV07XHJcbiAgICAgICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT09IHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlZFtzVHlwZV1bc0tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5jbGVhckFsbCA9IGZ1bmN0aW9uIChzVHlwZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpO1xyXG4gICAgICAgIEtleVN0b3JhZ2VIZWxwZXIucmV0cmlldmVLZXlzRnJvbVN0b3JhZ2Uoc3RvcmFnZSlcclxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHNLZXkpIHtcclxuICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHNLZXkpO1xyXG4gICAgICAgICAgICBkZWxldGUgX3RoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XTtcclxuICAgICAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXIgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcclxuICAgICAgICB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpLnJlbW92ZUl0ZW0oc0tleSk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XTtcclxuICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdChzVHlwZSwgc0tleSwgbnVsbCk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5nZXRTdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTdG9yYWdlQXZhaWxhYmxlKHNUeXBlKSA/IHRoaXMuZ2V0V1N0b3JhZ2Uoc1R5cGUpIDogTW9ja1N0b3JhZ2VIZWxwZXIuZ2V0U3RvcmFnZShzVHlwZSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5nZXRXU3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xyXG4gICAgICAgIHZhciBzdG9yYWdlO1xyXG4gICAgICAgIHN3aXRjaCAoc1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTVE9SQUdFLmxvY2FsOlxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNUT1JBR0Uuc2Vzc2lvbjpcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ2ludmFsaWQgc3RvcmFnZSB0eXBlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuaXNTdG9yYWdlQXZhaWxhYmxlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN0b3JhZ2VBdmFpbGFiaWxpdHlbc1R5cGVdID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VBdmFpbGFiaWxpdHlbc1R5cGVdO1xyXG4gICAgICAgIHZhciBpc0F2YWlsYWJsZSA9IHRydWUsIHN0b3JhZ2UgPSB0aGlzLmdldFdTdG9yYWdlKHNUeXBlKTtcclxuICAgICAgICBpZiAodHlwZW9mIHN0b3JhZ2UgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0oJ3Rlc3Qtc3RvcmFnZScsICdmb29iYXInKTtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSgndGVzdC1zdG9yYWdlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGlzQXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBpc0F2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghaXNBdmFpbGFibGUpXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihTVE9SQUdFX05BTUVTW3NUeXBlXSArIFwiIHN0b3JhZ2UgdW5hdmFpbGFibGUsIE5nMldlYnN0b3JhZ2Ugd2lsbCB1c2UgYSBmYWxsYmFjayBzdHJhdGVneSBpbnN0ZWFkXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VBdmFpbGFiaWxpdHlbc1R5cGVdID0gaXNBdmFpbGFibGU7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5jYWNoZWQgPSAoX2EgPSB7fSwgX2FbU1RPUkFHRS5sb2NhbF0gPSB7fSwgX2FbU1RPUkFHRS5zZXNzaW9uXSA9IHt9LCBfYSk7XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JhZ2VBdmFpbGFiaWxpdHkgPSAoX2IgPSB7fSwgX2JbU1RPUkFHRS5sb2NhbF0gPSBudWxsLCBfYltTVE9SQUdFLnNlc3Npb25dID0gbnVsbCwgX2IpO1xyXG4gICAgcmV0dXJuIFdlYlN0b3JhZ2VIZWxwZXI7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IEtleVN0b3JhZ2VIZWxwZXIsIFdlYlN0b3JhZ2VIZWxwZXIsIFN0b3JhZ2VPYnNlcnZlckhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvaW5kZXgnO1xyXG5leHBvcnQgdmFyIFdlYlN0b3JhZ2VTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYlN0b3JhZ2VTZXJ2aWNlKHNUeXBlKSB7XHJcbiAgICAgICAgaWYgKHNUeXBlID09PSB2b2lkIDApIHsgc1R5cGUgPSBudWxsOyB9XHJcbiAgICAgICAgdGhpcy5zVHlwZSA9IHNUeXBlO1xyXG4gICAgICAgIHRoaXMuc1R5cGUgPSBzVHlwZTtcclxuICAgIH1cclxuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5zdG9yZSA9IGZ1bmN0aW9uIChyYXcsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpO1xyXG4gICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuc3RvcmUodGhpcy5zVHlwZSwgc0tleSwgdmFsdWUpO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5yZXRyaWV2ZSA9IGZ1bmN0aW9uIChyYXcpIHtcclxuICAgICAgICB2YXIgc0tleSA9IEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KHJhdyk7XHJcbiAgICAgICAgcmV0dXJuIFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmUodGhpcy5zVHlwZSwgc0tleSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIGlmIChyYXcpXHJcbiAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXIodGhpcy5zVHlwZSwgS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBXZWJTdG9yYWdlSGVscGVyLmNsZWFyQWxsKHRoaXMuc1R5cGUpO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KTtcclxuICAgICAgICByZXR1cm4gU3RvcmFnZU9ic2VydmVySGVscGVyLm9ic2VydmUodGhpcy5zVHlwZSwgc0tleSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFdlYlN0b3JhZ2VTZXJ2aWNlO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJTdG9yYWdlLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn07XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5pbXBvcnQgeyBXZWJTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vd2ViU3RvcmFnZSc7XHJcbmV4cG9ydCB2YXIgTG9jYWxTdG9yYWdlU2VydmljZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoTG9jYWxTdG9yYWdlU2VydmljZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIExvY2FsU3RvcmFnZVNlcnZpY2UoKSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgU1RPUkFHRS5sb2NhbCk7XHJcbiAgICB9XHJcbiAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLmRlY29yYXRvcnMgPSBbXHJcbiAgICAgICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXHJcbiAgICBdO1xyXG4gICAgLyoqIEBub2NvbGxhcHNlICovXHJcbiAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XHJcbiAgICByZXR1cm4gTG9jYWxTdG9yYWdlU2VydmljZTtcclxufShXZWJTdG9yYWdlU2VydmljZSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2NhbFN0b3JhZ2UuanMubWFwIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufTtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XHJcbmltcG9ydCB7IFdlYlN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi93ZWJTdG9yYWdlJztcclxuZXhwb3J0IHZhciBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFNlc3Npb25TdG9yYWdlU2VydmljZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFNlc3Npb25TdG9yYWdlU2VydmljZSgpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBTVE9SQUdFLnNlc3Npb24pO1xyXG4gICAgfVxyXG4gICAgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLmRlY29yYXRvcnMgPSBbXHJcbiAgICAgICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXHJcbiAgICBdO1xyXG4gICAgLyoqIEBub2NvbGxhcHNlICovXHJcbiAgICBTZXNzaW9uU3RvcmFnZVNlcnZpY2UuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcclxuICAgIHJldHVybiBTZXNzaW9uU3RvcmFnZVNlcnZpY2U7XHJcbn0oV2ViU3RvcmFnZVNlcnZpY2UpKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Vzc2lvblN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgTElCX0tFWSwgTElCX0tFWV9TRVBBUkFUT1IgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcclxuZXhwb3J0IHZhciBXZWJzdG9yYWdlQ29uZmlnID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYnN0b3JhZ2VDb25maWcoY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSBMSUJfS0VZO1xyXG4gICAgICAgIHRoaXMuc2VwYXJhdG9yID0gTElCX0tFWV9TRVBBUkFUT1I7XHJcbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcucHJlZml4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBjb25maWcucHJlZml4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5zZXBhcmF0b3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcGFyYXRvciA9IGNvbmZpZy5zZXBhcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFdlYnN0b3JhZ2VDb25maWc7XHJcbn0oKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJpbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyLCBXZWJTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9pbmRleCc7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuZXhwb3J0IGZ1bmN0aW9uIFdlYlN0b3JhZ2Uod2ViU0tleSwgc1R5cGUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0ZWRDbGFzcywgcmF3KSB7XHJcbiAgICAgICAgV2ViU3RvcmFnZURlY29yYXRvcih3ZWJTS2V5LCBTVE9SQUdFLmxvY2FsLCB0YXJnZXRlZENsYXNzLCByYXcpO1xyXG4gICAgfTtcclxufVxyXG47XHJcbmV4cG9ydCBmdW5jdGlvbiBXZWJTdG9yYWdlRGVjb3JhdG9yKHdlYlNLZXksIHNUeXBlLCB0YXJnZXRlZENsYXNzLCByYXcpIHtcclxuICAgIHZhciBrZXkgPSB3ZWJTS2V5IHx8IHJhdztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXRlZENsYXNzLCByYXcsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgc0tleSA9IEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KGtleSk7XHJcbiAgICAgICAgICAgIHRoaXNbc0tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5zdG9yZShzVHlwZSwgc0tleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2ViU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBXZWJTdG9yYWdlRGVjb3JhdG9yIH0gZnJvbSAnLi93ZWJTdG9yYWdlJztcclxuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5leHBvcnQgZnVuY3Rpb24gTG9jYWxTdG9yYWdlKHdlYlNLZXkpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0ZWRDbGFzcywgcmF3KSB7XHJcbiAgICAgICAgV2ViU3RvcmFnZURlY29yYXRvcih3ZWJTS2V5LCBTVE9SQUdFLmxvY2FsLCB0YXJnZXRlZENsYXNzLCByYXcpO1xyXG4gICAgfTtcclxufVxyXG47XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2FsU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBXZWJTdG9yYWdlRGVjb3JhdG9yIH0gZnJvbSAnLi93ZWJTdG9yYWdlJztcclxuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5leHBvcnQgZnVuY3Rpb24gU2Vzc2lvblN0b3JhZ2Uod2ViU0tleSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXRlZENsYXNzLCByYXcpIHtcclxuICAgICAgICBXZWJTdG9yYWdlRGVjb3JhdG9yKHdlYlNLZXksIFNUT1JBR0Uuc2Vzc2lvbiwgdGFyZ2V0ZWRDbGFzcywgcmF3KTtcclxuICAgIH07XHJcbn1cclxuO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXNzaW9uU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBOZ01vZHVsZSwgTmdab25lLCBPcGFxdWVUb2tlbiwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMSUJfS0VZLCBMSUJfS0VZX1NFUEFSQVRPUiB9IGZyb20gJy4vY29uc3RhbnRzL2xpYic7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuL2VudW1zL3N0b3JhZ2UnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZUhlbHBlciB9IGZyb20gJy4vaGVscGVycy93ZWJTdG9yYWdlJztcclxuaW1wb3J0IHsgV2Vic3RvcmFnZUNvbmZpZyB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25maWcnO1xyXG5pbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL2tleVN0b3JhZ2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZXMvaW5kZXgnO1xyXG5leHBvcnQgKiBmcm9tICcuL2RlY29yYXRvcnMvaW5kZXgnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcclxuZXhwb3J0IHZhciBXRUJTVE9SQUdFX0NPTkZJRyA9IG5ldyBPcGFxdWVUb2tlbignV0VCU1RPUkFHRV9DT05GSUcnKTtcclxuZXhwb3J0IHZhciBOZzJXZWJzdG9yYWdlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE5nMldlYnN0b3JhZ2Uobmdab25lLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLm5nWm9uZSA9IG5nWm9uZTtcclxuICAgICAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgICAgICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVByZWZpeChjb25maWcucHJlZml4KTtcclxuICAgICAgICAgICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5U2VwYXJhdG9yKGNvbmZpZy5zZXBhcmF0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRTdG9yYWdlTGlzdGVuZXIoKTtcclxuICAgIH1cclxuICAgIE5nMldlYnN0b3JhZ2UuZm9yUm9vdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTmcyV2Vic3RvcmFnZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogV0VCU1RPUkFHRV9DT05GSUcsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBXZWJzdG9yYWdlQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHByb3ZpZGVDb25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXRUJTVE9SQUdFX0NPTkZJR1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgTmcyV2Vic3RvcmFnZS5wcm90b3R5cGUuaW5pdFN0b3JhZ2VMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh3aW5kb3cpIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0b3JhZ2UgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UgPT09IGV2ZW50LnN0b3JhZ2VBcmVhID8gU1RPUkFHRS5zZXNzaW9uIDogU1RPUkFHRS5sb2NhbDtcclxuICAgICAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIucmVmcmVzaChzdG9yYWdlLCBldmVudC5rZXkpO1xyXG4gICAgICAgICAgICB9KTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE5nMldlYnN0b3JhZ2UuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzOiBbU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLCBMb2NhbFN0b3JhZ2VTZXJ2aWNlXSxcclxuICAgICAgICAgICAgICAgICAgICBpbXBvcnRzOiBbXVxyXG4gICAgICAgICAgICAgICAgfSxdIH0sXHJcbiAgICBdO1xyXG4gICAgLyoqIEBub2NvbGxhcHNlICovXHJcbiAgICBOZzJXZWJzdG9yYWdlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xyXG4gICAgICAgIHsgdHlwZTogTmdab25lLCB9LFxyXG4gICAgICAgIHsgdHlwZTogV2Vic3RvcmFnZUNvbmZpZywgZGVjb3JhdG9yczogW3sgdHlwZTogT3B0aW9uYWwgfSwgeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtXZWJzdG9yYWdlQ29uZmlnLF0gfSxdIH0sXHJcbiAgICBdOyB9O1xyXG4gICAgcmV0dXJuIE5nMldlYnN0b3JhZ2U7XHJcbn0oKSk7XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQ29uZmlnKGNvbmZpZykge1xyXG4gICAgcmV0dXJuIG5ldyBXZWJzdG9yYWdlQ29uZmlnKGNvbmZpZyk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShfYSkge1xyXG4gICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHsgcHJlZml4OiBMSUJfS0VZLCBzZXBhcmF0b3I6IExJQl9LRVlfU0VQQVJBVE9SIH0gOiBfYSwgcHJlZml4ID0gX2IucHJlZml4LCBzZXBhcmF0b3IgPSBfYi5zZXBhcmF0b3I7XHJcbiAgICAvKkBEZXByZWNhdGlvbiovXHJcbiAgICBjb25zb2xlLndhcm4oJ1tuZzItd2Vic3RvcmFnZTpkZXByZWNhdGlvbl0gVGhlIGNvbmZpZ3VyZSBtZXRob2QgaXMgZGVwcmVjYXRlZCBzaW5jZSB0aGUgdjEuNS4wLCBjb25zaWRlciB0byB1c2UgZm9yUm9vdCBpbnN0ZWFkJyk7XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlQcmVmaXgocHJlZml4KTtcclxuICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVNlcGFyYXRvcihzZXBhcmF0b3IpO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXAiXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwidGhpcyIsIkluamVjdGFibGUiLCJfX2V4dGVuZHMiLCJPcGFxdWVUb2tlbiIsIk5nTW9kdWxlIiwiTmdab25lIiwiT3B0aW9uYWwiLCJJbmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLElBQUksT0FBTyxDQUFDO0FBQ25CLENBQUMsVUFBVSxP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
