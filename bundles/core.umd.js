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
var LIB_KEY_CASE_SENSITIVE = false;
var STORAGE_NAMES = (_a = {},
    _a[STORAGE.local] = 'local',
    _a[STORAGE.session] = 'session',
    _a);
var _a;

var CUSTOM_LIB_KEY = LIB_KEY;
var CUSTOM_LIB_KEY_SEPARATOR = LIB_KEY_SEPARATOR;
var CUSTOM_LIB_KEY_CASE_SENSITIVE = LIB_KEY_CASE_SENSITIVE;
function isManagedKey(sKey) {
    return sKey.indexOf(CUSTOM_LIB_KEY + CUSTOM_LIB_KEY_SEPARATOR) === 0;
}
var KeyStorageHelper = (function () {
    function KeyStorageHelper() {
    }
    KeyStorageHelper.isManagedKey = function (sKey) {
        return sKey.indexOf(CUSTOM_LIB_KEY + CUSTOM_LIB_KEY_SEPARATOR) === 0;
    };
    KeyStorageHelper.retrieveKeysFromStorage = function (storage) {
        return Object.keys(storage).filter(isManagedKey);
    };
    KeyStorageHelper.genKey = function (raw) {
        if (typeof raw !== 'string')
            throw Error('attempt to generate a storage key with a non string value');
        return "" + CUSTOM_LIB_KEY + CUSTOM_LIB_KEY_SEPARATOR + this.formatKey(raw);
    };
    KeyStorageHelper.formatKey = function (raw) {
        var key = raw.toString();
        return CUSTOM_LIB_KEY_CASE_SENSITIVE ? key : key.toLowerCase();
    };
    KeyStorageHelper.setStorageKeyPrefix = function (key) {
        if (key === void 0) { key = LIB_KEY; }
        CUSTOM_LIB_KEY = key;
    };
    KeyStorageHelper.setCaseSensitivity = function (enable) {
        if (enable === void 0) { enable = LIB_KEY_CASE_SENSITIVE; }
        CUSTOM_LIB_KEY_CASE_SENSITIVE = enable;
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
        return sType + '|' + sKey;
    };
    StorageObserverHelper.initStorage = function () {
        StorageObserverHelper.storageInitStream.emit(true);
    };
    StorageObserverHelper.observers = {};
    StorageObserverHelper.storageInitStream = new _angular_core.EventEmitter();
    StorageObserverHelper.storageInit$ = StorageObserverHelper.storageInitStream.asObservable();
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

var CACHED = (_a$1 = {}, _a$1[STORAGE.local] = {}, _a$1[STORAGE.session] = {}, _a$1);
var STORAGE_AVAILABILITY = (_b = {}, _b[STORAGE.local] = null, _b[STORAGE.session] = null, _b);
var WebStorageHelper = (function () {
    function WebStorageHelper() {
    }
    WebStorageHelper.store = function (sType, sKey, value) {
        this.getStorage(sType).setItem(sKey, JSON.stringify(value));
        CACHED[sType][sKey] = value;
        StorageObserverHelper.emit(sType, sKey, value);
    };
    WebStorageHelper.retrieve = function (sType, sKey) {
        if (sKey in CACHED[sType])
            return CACHED[sType][sKey];
        var value = WebStorageHelper.retrieveFromStorage(sType, sKey);
        if (value !== null)
            CACHED[sType][sKey] = value;
        return value;
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
            delete CACHED[sType][sKey];
            StorageObserverHelper.emit(sType, sKey, null);
        }
        else if (value !== CACHED[sType][sKey]) {
            CACHED[sType][sKey] = value;
            StorageObserverHelper.emit(sType, sKey, value);
        }
    };
    WebStorageHelper.refreshAll = function (sType) {
        Object.keys(CACHED[sType]).forEach(function (sKey) { return WebStorageHelper.refresh(sType, sKey); });
    };
    WebStorageHelper.clearAll = function (sType) {
        var storage = this.getStorage(sType);
        KeyStorageHelper.retrieveKeysFromStorage(storage)
            .forEach(function (sKey) {
            storage.removeItem(sKey);
            delete CACHED[sType][sKey];
            StorageObserverHelper.emit(sType, sKey, null);
        });
    };
    WebStorageHelper.clear = function (sType, sKey) {
        this.getStorage(sType).removeItem(sKey);
        delete CACHED[sType][sKey];
        StorageObserverHelper.emit(sType, sKey, null);
    };
    WebStorageHelper.getStorage = function (sType) {
        if (this.isStorageAvailable(sType))
            return this.getWStorage(sType);
        else
            return MockStorageHelper.getStorage(sType);
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
        if (typeof STORAGE_AVAILABILITY[sType] === 'boolean')
            return STORAGE_AVAILABILITY[sType];
        var isAvailable = true, storage;
        try {
            storage = this.getWStorage(sType);
            if (typeof storage === 'object') {
                storage.setItem('test-storage', 'foobar');
                storage.removeItem('test-storage');
            }
            else
                isAvailable = false;
        }
        catch (e) {
            isAvailable = false;
        }
        if (!isAvailable)
            console.warn(STORAGE_NAMES[sType] + " storage unavailable, Ng2Webstorage will use a fallback strategy instead");
        return STORAGE_AVAILABILITY[sType] = isAvailable;
    };
    return WebStorageHelper;
}());
var _a$1;
var _b;

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
    WebStorageService.prototype.isStorageAvailable = function () {
        return WebStorageHelper.isStorageAvailable(this.sType);
    };
    return WebStorageService;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LocalStorageService = (function (_super) {
    __extends(LocalStorageService, _super);
    function LocalStorageService() {
        return _super.call(this, STORAGE.local) || this;
    }
    LocalStorageService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    LocalStorageService.ctorParameters = function () { return []; };
    return LocalStorageService;
}(WebStorageService));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SessionStorageService = (function (_super) {
    __extends$1(SessionStorageService, _super);
    function SessionStorageService() {
        return _super.call(this, STORAGE.session) || this;
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
        this.caseSensitive = LIB_KEY_CASE_SENSITIVE;
        if (config && config.prefix !== undefined) {
            this.prefix = config.prefix;
        }
        if (config && config.separator !== undefined) {
            this.separator = config.separator;
        }
        if (config && config.caseSensitive !== undefined) {
            this.caseSensitive = config.caseSensitive;
        }
    }
    return WebstorageConfig;
}());

function WebStorage(webSKey, sType, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, sType, targetedClass, raw, defaultValue);
    };
}
function WebStorageDecorator(webSKey, sType, targetedClass, raw, defaultValue) {
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
    if (targetedClass[raw] === null && defaultValue !== undefined) {
        var sub_1 = StorageObserverHelper.storageInit$.subscribe(function () {
            targetedClass[raw] = defaultValue;
            sub_1.unsubscribe();
        });
    }
}

function LocalStorage(webSKey, defaultValue) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw, defaultValue);
    };
}

function SessionStorage(webSKey, defaultValue) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.session, targetedClass, raw, defaultValue);
    };
}

var WEBSTORAGE_CONFIG = new _angular_core.InjectionToken('WEBSTORAGE_CONFIG');
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

exports.WEBSTORAGE_CONFIG = WEBSTORAGE_CONFIG;
exports.Ng2Webstorage = Ng2Webstorage;
exports.provideConfig = provideConfig;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS51bWQuanMiLCJzb3VyY2VzIjpbIi4uL2Rpc3QvZW51bXMvc3RvcmFnZS5qcyIsIi4uL2Rpc3QvY29uc3RhbnRzL2xpYi5qcyIsIi4uL2Rpc3QvaGVscGVycy9rZXlTdG9yYWdlLmpzIiwiLi4vZGlzdC9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlci5qcyIsIi4uL2Rpc3QvaGVscGVycy9tb2NrU3RvcmFnZS5qcyIsIi4uL2Rpc3QvaGVscGVycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy9sb2NhbFN0b3JhZ2UuanMiLCIuLi9kaXN0L3NlcnZpY2VzL3Nlc3Npb25TdG9yYWdlLmpzIiwiLi4vZGlzdC9pbnRlcmZhY2VzL2NvbmZpZy5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9kZWNvcmF0b3JzL2xvY2FsU3RvcmFnZS5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL2Rpc3QvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgU1RPUkFHRTtcclxuKGZ1bmN0aW9uIChTVE9SQUdFKSB7XHJcbiAgICBTVE9SQUdFW1NUT1JBR0VbXCJsb2NhbFwiXSA9IDBdID0gXCJsb2NhbFwiO1xyXG4gICAgU1RPUkFHRVtTVE9SQUdFW1wic2Vzc2lvblwiXSA9IDFdID0gXCJzZXNzaW9uXCI7XHJcbn0pKFNUT1JBR0UgfHwgKFNUT1JBR0UgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuZXhwb3J0IHZhciBMSUJfS0VZID0gJ25nMi13ZWJzdG9yYWdlJztcclxuZXhwb3J0IHZhciBMSUJfS0VZX1NFUEFSQVRPUiA9ICd8JztcclxuZXhwb3J0IHZhciBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFID0gZmFsc2U7XHJcbmV4cG9ydCB2YXIgU1RPUkFHRV9OQU1FUyA9IChfYSA9IHt9LFxyXG4gICAgX2FbU1RPUkFHRS5sb2NhbF0gPSAnbG9jYWwnLFxyXG4gICAgX2FbU1RPUkFHRS5zZXNzaW9uXSA9ICdzZXNzaW9uJyxcclxuICAgIF9hKTtcclxudmFyIF9hO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1saWIuanMubWFwIiwiaW1wb3J0IHsgTElCX0tFWSwgTElCX0tFWV9DQVNFX1NFTlNJVElWRSwgTElCX0tFWV9TRVBBUkFUT1IgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcclxudmFyIENVU1RPTV9MSUJfS0VZID0gTElCX0tFWTtcclxudmFyIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUiA9IExJQl9LRVlfU0VQQVJBVE9SO1xyXG52YXIgQ1VTVE9NX0xJQl9LRVlfQ0FTRV9TRU5TSVRJVkUgPSBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFO1xyXG5leHBvcnQgZnVuY3Rpb24gaXNNYW5hZ2VkS2V5KHNLZXkpIHtcclxuICAgIHJldHVybiBzS2V5LmluZGV4T2YoQ1VTVE9NX0xJQl9LRVkgKyBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IpID09PSAwO1xyXG59XHJcbnZhciBLZXlTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEtleVN0b3JhZ2VIZWxwZXIoKSB7XHJcbiAgICB9XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLmlzTWFuYWdlZEtleSA9IGZ1bmN0aW9uIChzS2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHNLZXkuaW5kZXhPZihDVVNUT01fTElCX0tFWSArIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUikgPT09IDA7XHJcbiAgICB9O1xyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5yZXRyaWV2ZUtleXNGcm9tU3RvcmFnZSA9IGZ1bmN0aW9uIChzdG9yYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHN0b3JhZ2UpLmZpbHRlcihpc01hbmFnZWRLZXkpO1xyXG4gICAgfTtcclxuICAgIEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5ID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmF3ICE9PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ2F0dGVtcHQgdG8gZ2VuZXJhdGUgYSBzdG9yYWdlIGtleSB3aXRoIGEgbm9uIHN0cmluZyB2YWx1ZScpO1xyXG4gICAgICAgIHJldHVybiBcIlwiICsgQ1VTVE9NX0xJQl9LRVkgKyBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IgKyB0aGlzLmZvcm1hdEtleShyYXcpO1xyXG4gICAgfTtcclxuICAgIEtleVN0b3JhZ2VIZWxwZXIuZm9ybWF0S2V5ID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIHZhciBrZXkgPSByYXcudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gQ1VTVE9NX0xJQl9LRVlfQ0FTRV9TRU5TSVRJVkUgPyBrZXkgOiBrZXkudG9Mb3dlckNhc2UoKTtcclxuICAgIH07XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlQcmVmaXggPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gdm9pZCAwKSB7IGtleSA9IExJQl9LRVk7IH1cclxuICAgICAgICBDVVNUT01fTElCX0tFWSA9IGtleTtcclxuICAgIH07XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldENhc2VTZW5zaXRpdml0eSA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuICAgICAgICBpZiAoZW5hYmxlID09PSB2b2lkIDApIHsgZW5hYmxlID0gTElCX0tFWV9DQVNFX1NFTlNJVElWRTsgfVxyXG4gICAgICAgIENVU1RPTV9MSUJfS0VZX0NBU0VfU0VOU0lUSVZFID0gZW5hYmxlO1xyXG4gICAgfTtcclxuICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVNlcGFyYXRvciA9IGZ1bmN0aW9uIChzZXBhcmF0b3IpIHtcclxuICAgICAgICBpZiAoc2VwYXJhdG9yID09PSB2b2lkIDApIHsgc2VwYXJhdG9yID0gTElCX0tFWV9TRVBBUkFUT1I7IH1cclxuICAgICAgICBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IgPSBzZXBhcmF0b3I7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEtleVN0b3JhZ2VIZWxwZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEtleVN0b3JhZ2VIZWxwZXIgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2V5U3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxudmFyIFN0b3JhZ2VPYnNlcnZlckhlbHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIoKSB7XHJcbiAgICB9XHJcbiAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIub2JzZXJ2ZSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xyXG4gICAgICAgIHZhciBvS2V5ID0gdGhpcy5nZW5PYnNlcnZlcktleShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgaWYgKG9LZXkgaW4gdGhpcy5vYnNlcnZlcnMpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVyc1tvS2V5XTtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnNbb0tleV0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB9O1xyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIG9LZXkgPSB0aGlzLmdlbk9ic2VydmVyS2V5KHNUeXBlLCBzS2V5KTtcclxuICAgICAgICBpZiAob0tleSBpbiB0aGlzLm9ic2VydmVycylcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNbb0tleV0uZW1pdCh2YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmdlbk9ic2VydmVyS2V5ID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHNUeXBlICsgJ3wnICsgc0tleTtcclxuICAgIH07XHJcbiAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuaW5pdFN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLnN0b3JhZ2VJbml0U3RyZWFtLmVtaXQodHJ1ZSk7XHJcbiAgICB9O1xyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLm9ic2VydmVycyA9IHt9O1xyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLnN0b3JhZ2VJbml0U3RyZWFtID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLnN0b3JhZ2VJbml0JCA9IFN0b3JhZ2VPYnNlcnZlckhlbHBlci5zdG9yYWdlSW5pdFN0cmVhbS5hc09ic2VydmFibGUoKTtcclxuICAgIHJldHVybiBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFN0b3JhZ2VPYnNlcnZlckhlbHBlciB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yYWdlT2JzZXJ2ZXIuanMubWFwIiwidmFyIE1vY2tTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vY2tTdG9yYWdlSGVscGVyKCkge1xyXG4gICAgfVxyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQgPSBmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICByZXR1cm4gISF+TW9ja1N0b3JhZ2VIZWxwZXIuc2VjdXJlZEZpZWxkcy5pbmRleE9mKGZpZWxkKTtcclxuICAgIH07XHJcbiAgICBNb2NrU3RvcmFnZUhlbHBlci5nZXRTdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vY2tTdG9yYWdlc1tzVHlwZV0pXHJcbiAgICAgICAgICAgIHRoaXMubW9ja1N0b3JhZ2VzW3NUeXBlXSA9IE1vY2tTdG9yYWdlSGVscGVyLmdlbmVyYXRlU3RvcmFnZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vY2tTdG9yYWdlc1tzVHlwZV07XHJcbiAgICB9O1xyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuZ2VuZXJhdGVTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdG9yYWdlID0ge307XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3RvcmFnZSwge1xyXG4gICAgICAgICAgICBzZXRJdGVtOiB7XHJcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIU1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkKGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0SXRlbToge1xyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIU1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkKGtleSkgPyB0aGlzW2tleV0gfHwgbnVsbCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZW1vdmVJdGVtOiB7XHJcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQoa2V5KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlbmd0aDoge1xyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfTtcclxuICAgIE1vY2tTdG9yYWdlSGVscGVyLnNlY3VyZWRGaWVsZHMgPSBbJ3NldEl0ZW0nLCAnZ2V0SXRlbScsICdyZW1vdmVJdGVtJywgJ2xlbmd0aCddO1xyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIubW9ja1N0b3JhZ2VzID0ge307XHJcbiAgICByZXR1cm4gTW9ja1N0b3JhZ2VIZWxwZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE1vY2tTdG9yYWdlSGVscGVyIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vY2tTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuaW1wb3J0IHsgU3RvcmFnZU9ic2VydmVySGVscGVyIH0gZnJvbSAnLi9zdG9yYWdlT2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi9rZXlTdG9yYWdlJztcclxuaW1wb3J0IHsgTW9ja1N0b3JhZ2VIZWxwZXIgfSBmcm9tICcuL21vY2tTdG9yYWdlJztcclxuaW1wb3J0IHsgU1RPUkFHRV9OQU1FUyB9IGZyb20gJy4uL2NvbnN0YW50cy9saWInO1xyXG52YXIgQ0FDSEVEID0gKF9hID0ge30sIF9hW1NUT1JBR0UubG9jYWxdID0ge30sIF9hW1NUT1JBR0Uuc2Vzc2lvbl0gPSB7fSwgX2EpO1xyXG52YXIgU1RPUkFHRV9BVkFJTEFCSUxJVFkgPSAoX2IgPSB7fSwgX2JbU1RPUkFHRS5sb2NhbF0gPSBudWxsLCBfYltTVE9SQUdFLnNlc3Npb25dID0gbnVsbCwgX2IpO1xyXG52YXIgV2ViU3RvcmFnZUhlbHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWJTdG9yYWdlSGVscGVyKCkge1xyXG4gICAgfVxyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5zdG9yZSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpLnNldEl0ZW0oc0tleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgICAgICBDQUNIRURbc1R5cGVdW3NLZXldID0gdmFsdWU7XHJcbiAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIHZhbHVlKTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgaWYgKHNLZXkgaW4gQ0FDSEVEW3NUeXBlXSlcclxuICAgICAgICAgICAgcmV0dXJuIENBQ0hFRFtzVHlwZV1bc0tleV07XHJcbiAgICAgICAgdmFyIHZhbHVlID0gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZUZyb21TdG9yYWdlKHNUeXBlLCBzS2V5KTtcclxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpXHJcbiAgICAgICAgICAgIENBQ0hFRFtzVHlwZV1bc0tleV0gPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZUZyb21TdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMuZ2V0U3RvcmFnZShzVHlwZSkuZ2V0SXRlbShzS2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiaW52YWxpZCB2YWx1ZSBmb3IgXCIgKyBzS2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5yZWZyZXNoID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgaWYgKCFLZXlTdG9yYWdlSGVscGVyLmlzTWFuYWdlZEtleShzS2V5KSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmVGcm9tU3RvcmFnZShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBDQUNIRURbc1R5cGVdW3NLZXldO1xyXG4gICAgICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdChzVHlwZSwgc0tleSwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9PSBDQUNIRURbc1R5cGVdW3NLZXldKSB7XHJcbiAgICAgICAgICAgIENBQ0hFRFtzVHlwZV1bc0tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5yZWZyZXNoQWxsID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoQ0FDSEVEW3NUeXBlXSkuZm9yRWFjaChmdW5jdGlvbiAoc0tleSkgeyByZXR1cm4gV2ViU3RvcmFnZUhlbHBlci5yZWZyZXNoKHNUeXBlLCBzS2V5KTsgfSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5jbGVhckFsbCA9IGZ1bmN0aW9uIChzVHlwZSkge1xyXG4gICAgICAgIHZhciBzdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKHNUeXBlKTtcclxuICAgICAgICBLZXlTdG9yYWdlSGVscGVyLnJldHJpZXZlS2V5c0Zyb21TdG9yYWdlKHN0b3JhZ2UpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChzS2V5KSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShzS2V5KTtcclxuICAgICAgICAgICAgZGVsZXRlIENBQ0hFRFtzVHlwZV1bc0tleV07XHJcbiAgICAgICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCBudWxsKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLmNsZWFyID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgdGhpcy5nZXRTdG9yYWdlKHNUeXBlKS5yZW1vdmVJdGVtKHNLZXkpO1xyXG4gICAgICAgIGRlbGV0ZSBDQUNIRURbc1R5cGVdW3NLZXldO1xyXG4gICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCBudWxsKTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLmdldFN0b3JhZ2UgPSBmdW5jdGlvbiAoc1R5cGUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1N0b3JhZ2VBdmFpbGFibGUoc1R5cGUpKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRXU3RvcmFnZShzVHlwZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gTW9ja1N0b3JhZ2VIZWxwZXIuZ2V0U3RvcmFnZShzVHlwZSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5nZXRXU3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xyXG4gICAgICAgIHZhciBzdG9yYWdlO1xyXG4gICAgICAgIHN3aXRjaCAoc1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTVE9SQUdFLmxvY2FsOlxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNUT1JBR0Uuc2Vzc2lvbjpcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ2ludmFsaWQgc3RvcmFnZSB0eXBlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuaXNTdG9yYWdlQXZhaWxhYmxlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBTVE9SQUdFX0FWQUlMQUJJTElUWVtzVHlwZV0gPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgcmV0dXJuIFNUT1JBR0VfQVZBSUxBQklMSVRZW3NUeXBlXTtcclxuICAgICAgICB2YXIgaXNBdmFpbGFibGUgPSB0cnVlLCBzdG9yYWdlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UgPSB0aGlzLmdldFdTdG9yYWdlKHNUeXBlKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdG9yYWdlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKCd0ZXN0LXN0b3JhZ2UnLCAnZm9vYmFyJyk7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rlc3Qtc3RvcmFnZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGlzQXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlzQXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNBdmFpbGFibGUpXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihTVE9SQUdFX05BTUVTW3NUeXBlXSArIFwiIHN0b3JhZ2UgdW5hdmFpbGFibGUsIE5nMldlYnN0b3JhZ2Ugd2lsbCB1c2UgYSBmYWxsYmFjayBzdHJhdGVneSBpbnN0ZWFkXCIpO1xyXG4gICAgICAgIHJldHVybiBTVE9SQUdFX0FWQUlMQUJJTElUWVtzVHlwZV0gPSBpc0F2YWlsYWJsZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlcjtcclxufSgpKTtcclxuZXhwb3J0IHsgV2ViU3RvcmFnZUhlbHBlciB9O1xyXG52YXIgX2EsIF9iO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IEtleVN0b3JhZ2VIZWxwZXIsIFdlYlN0b3JhZ2VIZWxwZXIsIFN0b3JhZ2VPYnNlcnZlckhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvaW5kZXgnO1xyXG52YXIgV2ViU3RvcmFnZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2ViU3RvcmFnZVNlcnZpY2Uoc1R5cGUpIHtcclxuICAgICAgICBpZiAoc1R5cGUgPT09IHZvaWQgMCkgeyBzVHlwZSA9IG51bGw7IH1cclxuICAgICAgICB0aGlzLnNUeXBlID0gc1R5cGU7XHJcbiAgICAgICAgdGhpcy5zVHlwZSA9IHNUeXBlO1xyXG4gICAgfVxyXG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLnN0b3JlID0gZnVuY3Rpb24gKHJhdywgdmFsdWUpIHtcclxuICAgICAgICB2YXIgc0tleSA9IEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KHJhdyk7XHJcbiAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5zdG9yZSh0aGlzLnNUeXBlLCBzS2V5LCB2YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLnJldHJpZXZlID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KTtcclxuICAgICAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZSh0aGlzLnNUeXBlLCBzS2V5KTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAocmF3KSB7XHJcbiAgICAgICAgaWYgKHJhdylcclxuICAgICAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5jbGVhcih0aGlzLnNUeXBlLCBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXJBbGwodGhpcy5zVHlwZSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAocmF3KSB7XHJcbiAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpO1xyXG4gICAgICAgIHJldHVybiBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIub2JzZXJ2ZSh0aGlzLnNUeXBlLCBzS2V5KTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUuaXNTdG9yYWdlQXZhaWxhYmxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBXZWJTdG9yYWdlSGVscGVyLmlzU3RvcmFnZUF2YWlsYWJsZSh0aGlzLnNUeXBlKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gV2ViU3RvcmFnZVNlcnZpY2U7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFdlYlN0b3JhZ2VTZXJ2aWNlIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYlN0b3JhZ2UuanMubWFwIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5pbXBvcnQgeyBXZWJTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vd2ViU3RvcmFnZSc7XHJcbnZhciBMb2NhbFN0b3JhZ2VTZXJ2aWNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhMb2NhbFN0b3JhZ2VTZXJ2aWNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTG9jYWxTdG9yYWdlU2VydmljZSgpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgU1RPUkFHRS5sb2NhbCkgfHwgdGhpcztcclxuICAgIH1cclxuICAgIExvY2FsU3RvcmFnZVNlcnZpY2UuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcclxuICAgIF07XHJcbiAgICAvKiogQG5vY29sbGFwc2UgKi9cclxuICAgIExvY2FsU3RvcmFnZVNlcnZpY2UuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcclxuICAgIHJldHVybiBMb2NhbFN0b3JhZ2VTZXJ2aWNlO1xyXG59KFdlYlN0b3JhZ2VTZXJ2aWNlKSk7XHJcbmV4cG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9jYWxTdG9yYWdlLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xyXG52YXIgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhTZXNzaW9uU3RvcmFnZVNlcnZpY2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTZXNzaW9uU3RvcmFnZVNlcnZpY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFNUT1JBR0Uuc2Vzc2lvbikgfHwgdGhpcztcclxuICAgIH1cclxuICAgIFNlc3Npb25TdG9yYWdlU2VydmljZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxyXG4gICAgXTtcclxuICAgIC8qKiBAbm9jb2xsYXBzZSAqL1xyXG4gICAgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XHJcbiAgICByZXR1cm4gU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlO1xyXG59KFdlYlN0b3JhZ2VTZXJ2aWNlKSk7XHJcbmV4cG9ydCB7IFNlc3Npb25TdG9yYWdlU2VydmljZSB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXNzaW9uU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBMSUJfS0VZLCBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFLCBMSUJfS0VZX1NFUEFSQVRPUiB9IGZyb20gJy4uL2NvbnN0YW50cy9saWInO1xyXG52YXIgV2Vic3RvcmFnZUNvbmZpZyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWJzdG9yYWdlQ29uZmlnKGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gTElCX0tFWTtcclxuICAgICAgICB0aGlzLnNlcGFyYXRvciA9IExJQl9LRVlfU0VQQVJBVE9SO1xyXG4gICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZSA9IExJQl9LRVlfQ0FTRV9TRU5TSVRJVkU7XHJcbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcucHJlZml4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBjb25maWcucHJlZml4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5zZXBhcmF0b3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcGFyYXRvciA9IGNvbmZpZy5zZXBhcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLmNhc2VTZW5zaXRpdmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhc2VTZW5zaXRpdmUgPSBjb25maWcuY2FzZVNlbnNpdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gV2Vic3RvcmFnZUNvbmZpZztcclxufSgpKTtcclxuZXhwb3J0IHsgV2Vic3RvcmFnZUNvbmZpZyB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciwgV2ViU3RvcmFnZUhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvaW5kZXgnO1xyXG5pbXBvcnQgeyBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlcic7XHJcbmV4cG9ydCBmdW5jdGlvbiBXZWJTdG9yYWdlKHdlYlNLZXksIHNUeXBlLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHZvaWQgMCkgeyBkZWZhdWx0VmFsdWUgPSBudWxsOyB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldGVkQ2xhc3MsIHJhdykge1xyXG4gICAgICAgIFdlYlN0b3JhZ2VEZWNvcmF0b3Iod2ViU0tleSwgc1R5cGUsIHRhcmdldGVkQ2xhc3MsIHJhdywgZGVmYXVsdFZhbHVlKTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFdlYlN0b3JhZ2VEZWNvcmF0b3Iod2ViU0tleSwgc1R5cGUsIHRhcmdldGVkQ2xhc3MsIHJhdywgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICB2YXIga2V5ID0gd2ViU0tleSB8fCByYXc7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0ZWRDbGFzcywgcmF3LCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkoa2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmUoc1R5cGUsIHNLZXkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShrZXkpO1xyXG4gICAgICAgICAgICB0aGlzW3NLZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuc3RvcmUoc1R5cGUsIHNLZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICh0YXJnZXRlZENsYXNzW3Jhd10gPT09IG51bGwgJiYgZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB2YXIgc3ViXzEgPSBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuc3RvcmFnZUluaXQkLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRhcmdldGVkQ2xhc3NbcmF3XSA9IGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgc3ViXzEudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IFdlYlN0b3JhZ2VEZWNvcmF0b3IgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XHJcbmV4cG9ydCBmdW5jdGlvbiBMb2NhbFN0b3JhZ2Uod2ViU0tleSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldGVkQ2xhc3MsIHJhdykge1xyXG4gICAgICAgIFdlYlN0b3JhZ2VEZWNvcmF0b3Iod2ViU0tleSwgU1RPUkFHRS5sb2NhbCwgdGFyZ2V0ZWRDbGFzcywgcmF3LCBkZWZhdWx0VmFsdWUpO1xyXG4gICAgfTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2NhbFN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgV2ViU3RvcmFnZURlY29yYXRvciB9IGZyb20gJy4vd2ViU3RvcmFnZSc7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuZXhwb3J0IGZ1bmN0aW9uIFNlc3Npb25TdG9yYWdlKHdlYlNLZXksIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXRlZENsYXNzLCByYXcpIHtcclxuICAgICAgICBXZWJTdG9yYWdlRGVjb3JhdG9yKHdlYlNLZXksIFNUT1JBR0Uuc2Vzc2lvbiwgdGFyZ2V0ZWRDbGFzcywgcmF3LCBkZWZhdWx0VmFsdWUpO1xyXG4gICAgfTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXNzaW9uU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGlvblRva2VuLCBOZ01vZHVsZSwgTmdab25lLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi9lbnVtcy9zdG9yYWdlJztcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSwgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XHJcbmltcG9ydCB7IFdlYlN0b3JhZ2VIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvd2ViU3RvcmFnZSc7XHJcbmltcG9ydCB7IFdlYnN0b3JhZ2VDb25maWcgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZmlnJztcclxuaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciB9IGZyb20gJy4vaGVscGVycy9rZXlTdG9yYWdlJztcclxuaW1wb3J0IHsgU3RvcmFnZU9ic2VydmVySGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcy9pbmRleCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZGVjb3JhdG9ycy9pbmRleCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xyXG5leHBvcnQgdmFyIFdFQlNUT1JBR0VfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuKCdXRUJTVE9SQUdFX0NPTkZJRycpO1xyXG52YXIgTmcyV2Vic3RvcmFnZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOZzJXZWJzdG9yYWdlKG5nWm9uZSwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUgPSBuZ1pvbmU7XHJcbiAgICAgICAgaWYgKGNvbmZpZykge1xyXG4gICAgICAgICAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlQcmVmaXgoY29uZmlnLnByZWZpeCk7XHJcbiAgICAgICAgICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVNlcGFyYXRvcihjb25maWcuc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgS2V5U3RvcmFnZUhlbHBlci5zZXRDYXNlU2Vuc2l0aXZpdHkoY29uZmlnLmNhc2VTZW5zaXRpdmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRTdG9yYWdlTGlzdGVuZXIoKTtcclxuICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuaW5pdFN0b3JhZ2UoKTtcclxuICAgIH1cclxuICAgIE5nMldlYnN0b3JhZ2UuZm9yUm9vdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTmcyV2Vic3RvcmFnZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogV0VCU1RPUkFHRV9DT05GSUcsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBXZWJzdG9yYWdlQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHByb3ZpZGVDb25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXRUJTVE9SQUdFX0NPTkZJR1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgTmcyV2Vic3RvcmFnZS5wcm90b3R5cGUuaW5pdFN0b3JhZ2VMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yYWdlID0gd2luZG93LnNlc3Npb25TdG9yYWdlID09PSBldmVudC5zdG9yYWdlQXJlYSA/IFNUT1JBR0Uuc2Vzc2lvbiA6IFNUT1JBR0UubG9jYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5yZWZyZXNoQWxsKHN0b3JhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5yZWZyZXNoKHN0b3JhZ2UsIGV2ZW50LmtleSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE5nMldlYnN0b3JhZ2UuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzOiBbU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLCBMb2NhbFN0b3JhZ2VTZXJ2aWNlXSxcclxuICAgICAgICAgICAgICAgICAgICBpbXBvcnRzOiBbXVxyXG4gICAgICAgICAgICAgICAgfSxdIH0sXHJcbiAgICBdO1xyXG4gICAgLyoqIEBub2NvbGxhcHNlICovXHJcbiAgICBOZzJXZWJzdG9yYWdlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xyXG4gICAgICAgIHsgdHlwZTogTmdab25lLCB9LFxyXG4gICAgICAgIHsgdHlwZTogV2Vic3RvcmFnZUNvbmZpZywgZGVjb3JhdG9yczogW3sgdHlwZTogT3B0aW9uYWwgfSwgeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtXZWJzdG9yYWdlQ29uZmlnLF0gfSxdIH0sXHJcbiAgICBdOyB9O1xyXG4gICAgcmV0dXJuIE5nMldlYnN0b3JhZ2U7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE5nMldlYnN0b3JhZ2UgfTtcclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDb25maWcoY29uZmlnKSB7XHJcbiAgICByZXR1cm4gbmV3IFdlYnN0b3JhZ2VDb25maWcoY29uZmlnKTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsIl9hIiwidGhpcyIsIkluamVjdGFibGUiLCJfX2V4dGVuZHMiLCJJbmplY3Rpb25Ub2tlbiIsIk5nTW9kdWxlIiwiTmdab25lIiwiT3B0aW9uYWwiLCJJbmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLElBQUksT0FBTyxDQUFDO0FBQ25CLENBQUMsVUFBVSxPQUFPLEVBQUU7SUFDaEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDL0MsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEFBQzlCOztBQ0pPLElBQUksT0FBTyxHQUFHLGdCQUFnQixDQUFDO0FBQ3RDLEFBQU8sSUFBSSxpQkFBaUIsR0FBRyxHQUFHLENBQUM7QUFDbkMsQUFBTyxJQUFJLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUMxQyxBQUFPLElBQUksYUFBYSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUU7SUFDL0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPO0lBQzNCLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUztJQUMvQixFQUFFLENBQUMsQ0FBQztBQUNSLElBQUksRUFBRSxDQUFDLEFBQ1A7O0FDUkEsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDO0FBQzdCLElBQUksd0JBQXdCLEdBQUcsaUJBQWlCLENBQUM7QUFDakQsSUFBSSw2QkFBNkIsR0FBRyxzQkFBc0IsQ0FBQztBQUMzRCxBQUFPLFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRTtJQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3hFO0FBQ0QsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLFlBQVk7SUFDaEMsU0FBUyxnQkFBZ0IsR0FBRztLQUMzQjtJQUNELGdCQUFnQixDQUFDLFlBQVksR0FBRyxVQUFVLElBQUksRUFBRTtRQUM1QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hFLENBQUM7SUFDRixnQkFBZ0IsQ0FBQyx1QkFBdUIsR0FBRyxVQUFVLE9BQU8sRUFBRTtRQUMxRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BELENBQUM7SUFDRixnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUU7UUFDckMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1lBQ3ZCLE1BQU0sS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7UUFDN0UsT0FBTyxFQUFFLEdBQUcsY0FBYyxHQUFHLHdCQUF3QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDL0UsQ0FBQztJQUNGLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsRUFBRTtRQUN4QyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsT0FBTyw2QkFBNkIsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ2xFLENBQUM7SUFDRixnQkFBZ0IsQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLEdBQUcsRUFBRTtRQUNsRCxJQUFJLEdBQUcsS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBRTtRQUN0QyxjQUFjLEdBQUcsR0FBRyxDQUFDO0tBQ3hCLENBQUM7SUFDRixnQkFBZ0IsQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLE1BQU0sRUFBRTtRQUNwRCxJQUFJLE1BQU0sS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQyxFQUFFO1FBQzNELDZCQUE2QixHQUFHLE1BQU0sQ0FBQztLQUMxQyxDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsc0JBQXNCLEdBQUcsVUFBVSxTQUFTLEVBQUU7UUFDM0QsSUFBSSxTQUFTLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsRUFBRTtRQUM1RCx3QkFBd0IsR0FBRyxTQUFTLENBQUM7S0FDeEMsQ0FBQztJQUNGLE9BQU8sZ0JBQWdCLENBQUM7Q0FDM0IsRUFBRSxDQUFDLENBQUMsQUFDTCxBQUE0QixBQUM1Qjs7QUN2Q0EsSUFBSSxxQkFBcUIsR0FBRyxDQUFDLFlBQVk7SUFDckMsU0FBUyxxQkFBcUIsR0FBRztLQUNoQztJQUNELHFCQUFxQixDQUFDLE9BQU8sR0FBRyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVM7WUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJQSwwQkFBWSxFQUFFLENBQUM7S0FDcEQsQ0FBQztJQUNGLHFCQUFxQixDQUFDLElBQUksR0FBRyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO1FBQ3ZELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hDLENBQUM7SUFDRixxQkFBcUIsQ0FBQyxjQUFjLEdBQUcsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFO1FBQzFELE9BQU8sS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7S0FDN0IsQ0FBQztJQUNGLHFCQUFxQixDQUFDLFdBQVcsR0FBRyxZQUFZO1FBQzVDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0RCxDQUFDO0lBQ0YscUJBQXFCLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNyQyxxQkFBcUIsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJQSwwQkFBWSxFQUFFLENBQUM7SUFDN0QscUJBQXFCLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVGLE9BQU8scUJBQXFCLENBQUM7Q0FDaEMsRUFBRSxDQUFDLENBQUMsQUFDTCxBQUFpQyxBQUNqQzs7QUMzQkEsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLFlBQVk7SUFDakMsU0FBUyxpQkFBaUIsR0FBRztLQUM1QjtJQUNELGlCQUFpQixDQUFDLGNBQWMsR0FBRyxVQUFVLEtBQUssRUFBRTtRQUNoRCxPQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUQsQ0FBQztJQUNGLGlCQUFpQixDQUFDLFVBQVUsR0FBRyxVQUFVLEtBQUssRUFBRTtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNuRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkMsQ0FBQztJQUNGLGlCQUFpQixDQUFDLGVBQWUsR0FBRyxZQUFZO1FBQzVDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNqQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQzdCLE9BQU8sRUFBRTtnQkFDTCxRQUFRLEVBQUUsS0FBSztnQkFDZixVQUFVLEVBQUUsS0FBSztnQkFDakIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLEtBQUssRUFBRSxVQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO3dCQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUN6QjthQUNKO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixZQUFZLEVBQUUsS0FBSztnQkFDbkIsS0FBSyxFQUFFLFVBQVUsR0FBRyxFQUFFO29CQUNsQixPQUFPLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO2lCQUM1RTthQUNKO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixZQUFZLEVBQUUsS0FBSztnQkFDbkIsS0FBSyxFQUFFLFVBQVUsR0FBRyxFQUFFO29CQUNsQixJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQzt3QkFDdEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0o7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixHQUFHLEVBQUUsWUFBWTtvQkFDYixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO2lCQUNuQzthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7S0FDbEIsQ0FBQztJQUNGLGlCQUFpQixDQUFDLGFBQWEsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pGLGlCQUFpQixDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDcEMsT0FBTyxpQkFBaUIsQ0FBQztDQUM1QixFQUFFLENBQUMsQ0FBQyxBQUNMLEFBQTZCLEFBQzdCOztBQ2xEQSxJQUFJLE1BQU0sR0FBRyxDQUFDQyxJQUFFLEdBQUcsRUFBRSxFQUFFQSxJQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRUEsSUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUVBLElBQUUsQ0FBQyxDQUFDO0FBQzdFLElBQUksb0JBQW9CLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9GLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxZQUFZO0lBQ2hDLFNBQVMsZ0JBQWdCLEdBQUc7S0FDM0I7SUFDRCxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtRQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUIscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbEQsQ0FBQztJQUNGLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDL0MsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNyQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUQsSUFBSSxLQUFLLEtBQUssSUFBSTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsT0FBTyxLQUFLLENBQUM7S0FDaEIsQ0FBQztJQUNGLGdCQUFnQixDQUFDLG1CQUFtQixHQUFHLFVBQVUsS0FBSyxFQUFFLElBQUksRUFBRTtRQUMxRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSTtZQUNBLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxPQUFPLEdBQUcsRUFBRTtZQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQztLQUNmLENBQUM7SUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3BDLE9BQU87UUFDWCxJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUQsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2hCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2pEO2FBQ0ksSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDNUIscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbEQ7S0FDSixDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFVBQVUsS0FBSyxFQUFFO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUUsT0FBTyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3pHLENBQUM7SUFDRixnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsVUFBVSxLQUFLLEVBQUU7UUFDekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7YUFDNUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDakQsQ0FBQyxDQUFDO0tBQ04sQ0FBQztJQUNGLGdCQUFnQixDQUFDLEtBQUssR0FBRyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakQsQ0FBQztJQUNGLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxVQUFVLEtBQUssRUFBRTtRQUMzQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUUvQixPQUFPLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsRCxDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLFVBQVUsS0FBSyxFQUFFO1FBQzVDLElBQUksT0FBTyxDQUFDO1FBQ1osUUFBUSxLQUFLO1lBQ1QsS0FBSyxPQUFPLENBQUMsS0FBSztnQkFDZCxPQUFPLEdBQUcsWUFBWSxDQUFDO2dCQUN2QixNQUFNO1lBQ1YsS0FBSyxPQUFPLENBQUMsT0FBTztnQkFDaEIsT0FBTyxHQUFHLGNBQWMsQ0FBQztnQkFDekIsTUFBTTtZQUNWO2dCQUNJLE1BQU0sS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDM0M7UUFDRCxPQUFPLE9BQU8sQ0FBQztLQUNsQixDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxLQUFLLEVBQUU7UUFDbkQsSUFBSSxPQUFPLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVM7WUFDaEQsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQ2hDLElBQUk7WUFDQSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdEM7O2dCQUVHLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDM0I7UUFDRCxPQUFPLENBQUMsRUFBRTtZQUNOLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsV0FBVztZQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLDBFQUEwRSxDQUFDLENBQUM7UUFDcEgsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUM7S0FDcEQsQ0FBQztJQUNGLE9BQU8sZ0JBQWdCLENBQUM7Q0FDM0IsRUFBRSxDQUFDLENBQUM7QUFDTCxBQUNBLElBQUlBLElBQUU7SUFBRSxFQUFFLENBQUMsQUFDWDs7QUMxR0EsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLFlBQVk7SUFDakMsU0FBUyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7UUFDOUIsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUU7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdEI7SUFDRCxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRTtRQUN0RCxJQUFJLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ25ELENBQUM7SUFDRixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVUsR0FBRyxFQUFFO1FBQ2xELElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3RELENBQUM7SUFDRixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxFQUFFO1FBQy9DLElBQUksR0FBRztZQUNILGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztZQUVqRSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzdDLENBQUM7SUFDRixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsR0FBRyxFQUFFO1FBQ2pELElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxPQUFPLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzFELENBQUM7SUFDRixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsWUFBWTtRQUN6RCxPQUFPLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMxRCxDQUFDO0lBQ0YsT0FBTyxpQkFBaUIsQ0FBQztDQUM1QixFQUFFLENBQUMsQ0FBQyxBQUNMLEFBQTZCLEFBQzdCOztBQy9CQSxJQUFJLFNBQVMsR0FBRyxDQUFDQyxTQUFJLElBQUlBLFNBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVk7SUFDckQsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7UUFDckMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNuQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDeEYsQ0FBQztDQUNMLENBQUMsRUFBRSxDQUFDO0FBQ0wsQUFDQSxBQUNBLEFBQ0EsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLFVBQVUsTUFBTSxFQUFFO0lBQ3pDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxTQUFTLG1CQUFtQixHQUFHO1FBQzNCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQztLQUNuRDtJQUNELG1CQUFtQixDQUFDLFVBQVUsR0FBRztRQUM3QixFQUFFLElBQUksRUFBRUMsd0JBQVUsRUFBRTtLQUN2QixDQUFDOztJQUVGLG1CQUFtQixDQUFDLGNBQWMsR0FBRyxZQUFZLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2hFLE9BQU8sbUJBQW1CLENBQUM7Q0FDOUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQUFDdEIsQUFBK0IsQUFDL0I7O0FDMUJBLElBQUlDLFdBQVMsR0FBRyxDQUFDRixTQUFJLElBQUlBLFNBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVk7SUFDckQsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7UUFDckMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNuQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDeEYsQ0FBQztDQUNMLENBQUMsRUFBRSxDQUFDO0FBQ0wsQUFDQSxBQUNBLEFBQ0EsSUFBSSxxQkFBcUIsR0FBRyxDQUFDLFVBQVUsTUFBTSxFQUFFO0lBQzNDRSxXQUFTLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekMsU0FBUyxxQkFBcUIsR0FBRztRQUM3QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUM7S0FDckQ7SUFDRCxxQkFBcUIsQ0FBQyxVQUFVLEdBQUc7UUFDL0IsRUFBRSxJQUFJLEVBQUVELHdCQUFVLEVBQUU7S0FDdkIsQ0FBQzs7SUFFRixxQkFBcUIsQ0FBQyxjQUFjLEdBQUcsWUFBWSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNsRSxPQUFPLHFCQUFxQixDQUFDO0NBQ2hDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEFBQ3RCLEFBQWlDLEFBQ2pDOztBQ3pCQSxJQUFJLGdCQUFnQixHQUFHLENBQUMsWUFBWTtJQUNoQyxTQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsc0JBQXNCLENBQUM7UUFDNUMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1NBQzdDO0tBQ0o7SUFDRCxPQUFPLGdCQUFnQixDQUFDO0NBQzNCLEVBQUUsQ0FBQyxDQUFDLEFBQ0wsQUFBNEIsQUFDNUI7O0FDakJPLFNBQVMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO0lBQ3JELElBQUksWUFBWSxLQUFLLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFO0lBQ3JELE9BQU8sVUFBVSxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQ2pDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztLQUN6RSxDQUFDO0NBQ0w7QUFDRCxBQUFPLFNBQVMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRTtJQUNsRixJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksR0FBRyxDQUFDO0lBQ3pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUN0QyxHQUFHLEVBQUUsWUFBWTtZQUNiLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QyxPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDakQ7UUFDRCxHQUFHLEVBQUUsVUFBVSxLQUFLLEVBQUU7WUFDbEIsSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDbkIsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUM7S0FDSixDQUFDLENBQUM7SUFDSCxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtRQUMzRCxJQUFJLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFlBQVk7WUFDakUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUNsQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdkIsQ0FBQyxDQUFDO0tBQ047Q0FDSixBQUNEOztBQzFCTyxTQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0lBQ2hELE9BQU8sVUFBVSxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQ2pDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDakYsQ0FBQztDQUNMLEFBQ0Q7O0FDTE8sU0FBUyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtJQUNsRCxPQUFPLFVBQVUsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUNqQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQ25GLENBQUM7Q0FDTCxBQUNEOztBQ0dPLElBQUksaUJBQWlCLEdBQUcsSUFBSUUsNEJBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3ZFLElBQUksYUFBYSxHQUFHLENBQUMsWUFBWTtJQUM3QixTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksTUFBTSxFQUFFO1lBQ1IsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxRCxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN2QztJQUNELGFBQWEsQ0FBQyxPQUFPLEdBQUcsVUFBVSxNQUFNLEVBQUU7UUFDdEMsT0FBTztZQUNILFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsTUFBTTtpQkFDbkI7Z0JBQ0Q7b0JBQ0ksT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsVUFBVSxFQUFFLGFBQWE7b0JBQ3pCLElBQUksRUFBRTt3QkFDRixpQkFBaUI7cUJBQ3BCO2lCQUNKO2FBQ0o7U0FDSixDQUFDO0tBQ0wsQ0FBQztJQUNGLGFBQWEsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEdBQUcsWUFBWTtRQUN0RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDL0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEtBQUssRUFBRTtnQkFDaEQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZO29CQUNoQyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxLQUFLLEtBQUssQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUM1RixJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSTt3QkFDbEIsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzt3QkFFckMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3BELENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOO0tBQ0osQ0FBQztJQUNGLGFBQWEsQ0FBQyxVQUFVLEdBQUc7UUFDdkIsRUFBRSxJQUFJLEVBQUVDLHNCQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ2IsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDO29CQUN2RCxPQUFPLEVBQUUsRUFBRTtpQkFDZCxFQUFFLEVBQUU7S0FDaEIsQ0FBQzs7SUFFRixhQUFhLENBQUMsY0FBYyxHQUFHLFlBQVksRUFBRSxPQUFPO1FBQ2hELEVBQUUsSUFBSSxFQUFFQyxvQkFBTSxHQUFHO1FBQ2pCLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFQyxzQkFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUVDLG9CQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLEVBQUU7S0FDN0csQ0FBQyxFQUFFLENBQUM7SUFDTCxPQUFPLGFBQWEsQ0FBQztDQUN4QixFQUFFLENBQUMsQ0FBQztBQUNMLEFBQ0EsQUFBTyxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUU7SUFDbEMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3ZDLEFBQ0QsOzs7Ozs7Ozs7Ozs7LDs7LDs7In0=
