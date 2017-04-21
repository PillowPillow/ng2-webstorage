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
    return StorageObserverHelper;
}());
StorageObserverHelper.observers = {};

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
    return MockStorageHelper;
}());
MockStorageHelper.securedFields = ['setItem', 'getItem', 'removeItem', 'length'];
MockStorageHelper.mockStorages = {};

var CACHED = (_a$1 = {}, _a$1[STORAGE.local] = {}, _a$1[STORAGE.session] = {}, _a$1);
var STORAGEAVAILABILITY = (_b = {}, _b[STORAGE.local] = null, _b[STORAGE.session] = null, _b);
var WebStorageHelper = (function () {
    function WebStorageHelper() {
    }
    WebStorageHelper.store = function (sType, sKey, value) {
        this.getStorage(sType).setItem(sKey, JSON.stringify(value));
        CACHED[sType][sKey] = value;
        StorageObserverHelper.emit(sType, sKey, value);
    };
    WebStorageHelper.retrieve = function (sType, sKey) {
        if (CACHED[sType][sKey])
            return CACHED[sType][sKey];
        return CACHED[sType][sKey] = WebStorageHelper.retrieveFromStorage(sType, sKey);
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
        if (typeof STORAGEAVAILABILITY[sType] === 'boolean')
            return STORAGEAVAILABILITY[sType];
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
        return STORAGEAVAILABILITY[sType] = isAvailable;
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
    return LocalStorageService;
}(WebStorageService));
LocalStorageService.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
LocalStorageService.ctorParameters = function () { return []; };

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
    return SessionStorageService;
}(WebStorageService));
SessionStorageService.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
SessionStorageService.ctorParameters = function () { return []; };

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
        WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw, defaultValue);
    };
}
function WebStorageDecorator(webSKey, sType, targetedClass, raw, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
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
    if (targetedClass[raw] === null)
        targetedClass[raw] = defaultValue;
}

function LocalStorage(webSKey, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw, defaultValue);
    };
}

function SessionStorage(webSKey, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.session, targetedClass, raw, defaultValue);
    };
}

var WEBSTORAGE_CONFIG = new _angular_core.OpaqueToken('WEBSTORAGE_CONFIG');
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
function provideConfig(config) {
    return new WebstorageConfig(config);
}
function configure(_a) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS51bWQuanMiLCJzb3VyY2VzIjpbIi4uL2Rpc3QvZW51bXMvc3RvcmFnZS5qcyIsIi4uL2Rpc3QvY29uc3RhbnRzL2xpYi5qcyIsIi4uL2Rpc3QvaGVscGVycy9rZXlTdG9yYWdlLmpzIiwiLi4vZGlzdC9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlci5qcyIsIi4uL2Rpc3QvaGVscGVycy9tb2NrU3RvcmFnZS5qcyIsIi4uL2Rpc3QvaGVscGVycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy9sb2NhbFN0b3JhZ2UuanMiLCIuLi9kaXN0L3NlcnZpY2VzL3Nlc3Npb25TdG9yYWdlLmpzIiwiLi4vZGlzdC9pbnRlcmZhY2VzL2NvbmZpZy5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9kZWNvcmF0b3JzL2xvY2FsU3RvcmFnZS5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL2Rpc3QvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgU1RPUkFHRTtcclxuKGZ1bmN0aW9uIChTVE9SQUdFKSB7XHJcbiAgICBTVE9SQUdFW1NUT1JBR0VbXCJsb2NhbFwiXSA9IDBdID0gXCJsb2NhbFwiO1xyXG4gICAgU1RPUkFHRVtTVE9SQUdFW1wic2Vzc2lvblwiXSA9IDFdID0gXCJzZXNzaW9uXCI7XHJcbn0pKFNUT1JBR0UgfHwgKFNUT1JBR0UgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuZXhwb3J0IHZhciBMSUJfS0VZID0gJ25nMi13ZWJzdG9yYWdlJztcclxuZXhwb3J0IHZhciBMSUJfS0VZX1NFUEFSQVRPUiA9ICd8JztcclxuZXhwb3J0IHZhciBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFID0gZmFsc2U7XHJcbmV4cG9ydCB2YXIgU1RPUkFHRV9OQU1FUyA9IChfYSA9IHt9LFxyXG4gICAgX2FbU1RPUkFHRS5sb2NhbF0gPSAnbG9jYWwnLFxyXG4gICAgX2FbU1RPUkFHRS5zZXNzaW9uXSA9ICdzZXNzaW9uJyxcclxuICAgIF9hKTtcclxudmFyIF9hO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1saWIuanMubWFwIiwiaW1wb3J0IHsgTElCX0tFWSwgTElCX0tFWV9DQVNFX1NFTlNJVElWRSwgTElCX0tFWV9TRVBBUkFUT1IgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcclxudmFyIENVU1RPTV9MSUJfS0VZID0gTElCX0tFWTtcclxudmFyIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUiA9IExJQl9LRVlfU0VQQVJBVE9SO1xyXG52YXIgQ1VTVE9NX0xJQl9LRVlfQ0FTRV9TRU5TSVRJVkUgPSBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFO1xyXG5leHBvcnQgZnVuY3Rpb24gaXNNYW5hZ2VkS2V5KHNLZXkpIHtcclxuICAgIHJldHVybiBzS2V5LmluZGV4T2YoQ1VTVE9NX0xJQl9LRVkgKyBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IpID09PSAwO1xyXG59XHJcbnZhciBLZXlTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEtleVN0b3JhZ2VIZWxwZXIoKSB7XHJcbiAgICB9XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLmlzTWFuYWdlZEtleSA9IGZ1bmN0aW9uIChzS2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHNLZXkuaW5kZXhPZihDVVNUT01fTElCX0tFWSArIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUikgPT09IDA7XHJcbiAgICB9O1xyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5yZXRyaWV2ZUtleXNGcm9tU3RvcmFnZSA9IGZ1bmN0aW9uIChzdG9yYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHN0b3JhZ2UpLmZpbHRlcihpc01hbmFnZWRLZXkpO1xyXG4gICAgfTtcclxuICAgIEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5ID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmF3ICE9PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ2F0dGVtcHQgdG8gZ2VuZXJhdGUgYSBzdG9yYWdlIGtleSB3aXRoIGEgbm9uIHN0cmluZyB2YWx1ZScpO1xyXG4gICAgICAgIHJldHVybiBcIlwiICsgQ1VTVE9NX0xJQl9LRVkgKyBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IgKyB0aGlzLmZvcm1hdEtleShyYXcpO1xyXG4gICAgfTtcclxuICAgIEtleVN0b3JhZ2VIZWxwZXIuZm9ybWF0S2V5ID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIHZhciBrZXkgPSByYXcudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gQ1VTVE9NX0xJQl9LRVlfQ0FTRV9TRU5TSVRJVkUgPyBrZXkgOiBrZXkudG9Mb3dlckNhc2UoKTtcclxuICAgIH07XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlQcmVmaXggPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gdm9pZCAwKSB7IGtleSA9IExJQl9LRVk7IH1cclxuICAgICAgICBDVVNUT01fTElCX0tFWSA9IGtleTtcclxuICAgIH07XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldENhc2VTZW5zaXRpdml0eSA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuICAgICAgICBpZiAoZW5hYmxlID09PSB2b2lkIDApIHsgZW5hYmxlID0gTElCX0tFWV9DQVNFX1NFTlNJVElWRTsgfVxyXG4gICAgICAgIENVU1RPTV9MSUJfS0VZX0NBU0VfU0VOU0lUSVZFID0gZW5hYmxlO1xyXG4gICAgfTtcclxuICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVNlcGFyYXRvciA9IGZ1bmN0aW9uIChzZXBhcmF0b3IpIHtcclxuICAgICAgICBpZiAoc2VwYXJhdG9yID09PSB2b2lkIDApIHsgc2VwYXJhdG9yID0gTElCX0tFWV9TRVBBUkFUT1I7IH1cclxuICAgICAgICBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IgPSBzZXBhcmF0b3I7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEtleVN0b3JhZ2VIZWxwZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEtleVN0b3JhZ2VIZWxwZXIgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2V5U3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxudmFyIFN0b3JhZ2VPYnNlcnZlckhlbHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIoKSB7XHJcbiAgICB9XHJcbiAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIub2JzZXJ2ZSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xyXG4gICAgICAgIHZhciBvS2V5ID0gdGhpcy5nZW5PYnNlcnZlcktleShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgaWYgKG9LZXkgaW4gdGhpcy5vYnNlcnZlcnMpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVyc1tvS2V5XTtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnNbb0tleV0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB9O1xyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIG9LZXkgPSB0aGlzLmdlbk9ic2VydmVyS2V5KHNUeXBlLCBzS2V5KTtcclxuICAgICAgICBpZiAob0tleSBpbiB0aGlzLm9ic2VydmVycylcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNbb0tleV0uZW1pdCh2YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmdlbk9ic2VydmVyS2V5ID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHNUeXBlICsgJ3wnICsgc0tleTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3RvcmFnZU9ic2VydmVySGVscGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgfTtcclxuU3RvcmFnZU9ic2VydmVySGVscGVyLm9ic2VydmVycyA9IHt9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yYWdlT2JzZXJ2ZXIuanMubWFwIiwidmFyIE1vY2tTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vY2tTdG9yYWdlSGVscGVyKCkge1xyXG4gICAgfVxyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQgPSBmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICByZXR1cm4gISF+TW9ja1N0b3JhZ2VIZWxwZXIuc2VjdXJlZEZpZWxkcy5pbmRleE9mKGZpZWxkKTtcclxuICAgIH07XHJcbiAgICBNb2NrU3RvcmFnZUhlbHBlci5nZXRTdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vY2tTdG9yYWdlc1tzVHlwZV0pXHJcbiAgICAgICAgICAgIHRoaXMubW9ja1N0b3JhZ2VzW3NUeXBlXSA9IE1vY2tTdG9yYWdlSGVscGVyLmdlbmVyYXRlU3RvcmFnZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vY2tTdG9yYWdlc1tzVHlwZV07XHJcbiAgICB9O1xyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuZ2VuZXJhdGVTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdG9yYWdlID0ge307XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3RvcmFnZSwge1xyXG4gICAgICAgICAgICBzZXRJdGVtOiB7XHJcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIU1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkKGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0SXRlbToge1xyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIU1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkKGtleSkgPyB0aGlzW2tleV0gfHwgbnVsbCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZW1vdmVJdGVtOiB7XHJcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQoa2V5KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlbmd0aDoge1xyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNb2NrU3RvcmFnZUhlbHBlcjtcclxufSgpKTtcclxuZXhwb3J0IHsgTW9ja1N0b3JhZ2VIZWxwZXIgfTtcclxuTW9ja1N0b3JhZ2VIZWxwZXIuc2VjdXJlZEZpZWxkcyA9IFsnc2V0SXRlbScsICdnZXRJdGVtJywgJ3JlbW92ZUl0ZW0nLCAnbGVuZ3RoJ107XHJcbk1vY2tTdG9yYWdlSGVscGVyLm1vY2tTdG9yYWdlcyA9IHt9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2NrU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VPYnNlcnZlckhlbHBlciB9IGZyb20gJy4vc3RvcmFnZU9ic2VydmVyJztcclxuaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciB9IGZyb20gJy4va2V5U3RvcmFnZSc7XHJcbmltcG9ydCB7IE1vY2tTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi9tb2NrU3RvcmFnZSc7XHJcbmltcG9ydCB7IFNUT1JBR0VfTkFNRVMgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcclxudmFyIENBQ0hFRCA9IChfYSA9IHt9LCBfYVtTVE9SQUdFLmxvY2FsXSA9IHt9LCBfYVtTVE9SQUdFLnNlc3Npb25dID0ge30sIF9hKTtcclxudmFyIFNUT1JBR0VBVkFJTEFCSUxJVFkgPSAoX2IgPSB7fSwgX2JbU1RPUkFHRS5sb2NhbF0gPSBudWxsLCBfYltTVE9SQUdFLnNlc3Npb25dID0gbnVsbCwgX2IpO1xyXG52YXIgV2ViU3RvcmFnZUhlbHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWJTdG9yYWdlSGVscGVyKCkge1xyXG4gICAgfVxyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5zdG9yZSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpLnNldEl0ZW0oc0tleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgICAgICBDQUNIRURbc1R5cGVdW3NLZXldID0gdmFsdWU7XHJcbiAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIHZhbHVlKTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgaWYgKENBQ0hFRFtzVHlwZV1bc0tleV0pXHJcbiAgICAgICAgICAgIHJldHVybiBDQUNIRURbc1R5cGVdW3NLZXldO1xyXG4gICAgICAgIHJldHVybiBDQUNIRURbc1R5cGVdW3NLZXldID0gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZUZyb21TdG9yYWdlKHNUeXBlLCBzS2V5KTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlRnJvbVN0b3JhZ2UgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IG51bGw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5nZXRTdG9yYWdlKHNUeXBlKS5nZXRJdGVtKHNLZXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJpbnZhbGlkIHZhbHVlIGZvciBcIiArIHNLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJlZnJlc2ggPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcclxuICAgICAgICBpZiAoIUtleVN0b3JhZ2VIZWxwZXIuaXNNYW5hZ2VkS2V5KHNLZXkpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdmFyIHZhbHVlID0gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZUZyb21TdG9yYWdlKHNUeXBlLCBzS2V5KTtcclxuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgZGVsZXRlIENBQ0hFRFtzVHlwZV1bc0tleV07XHJcbiAgICAgICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT09IENBQ0hFRFtzVHlwZV1bc0tleV0pIHtcclxuICAgICAgICAgICAgQ0FDSEVEW3NUeXBlXVtzS2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdChzVHlwZSwgc0tleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLmNsZWFyQWxsID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgdmFyIHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpO1xyXG4gICAgICAgIEtleVN0b3JhZ2VIZWxwZXIucmV0cmlldmVLZXlzRnJvbVN0b3JhZ2Uoc3RvcmFnZSlcclxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHNLZXkpIHtcclxuICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHNLZXkpO1xyXG4gICAgICAgICAgICBkZWxldGUgQ0FDSEVEW3NUeXBlXVtzS2V5XTtcclxuICAgICAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXIgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcclxuICAgICAgICB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpLnJlbW92ZUl0ZW0oc0tleSk7XHJcbiAgICAgICAgZGVsZXRlIENBQ0hFRFtzVHlwZV1bc0tleV07XHJcbiAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIG51bGwpO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuZ2V0U3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzU3RvcmFnZUF2YWlsYWJsZShzVHlwZSkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFdTdG9yYWdlKHNUeXBlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBNb2NrU3RvcmFnZUhlbHBlci5nZXRTdG9yYWdlKHNUeXBlKTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLmdldFdTdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgdmFyIHN0b3JhZ2U7XHJcbiAgICAgICAgc3dpdGNoIChzVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNUT1JBR0UubG9jYWw6XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU1RPUkFHRS5zZXNzaW9uOlxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZSA9IHNlc3Npb25TdG9yYWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignaW52YWxpZCBzdG9yYWdlIHR5cGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5pc1N0b3JhZ2VBdmFpbGFibGUgPSBmdW5jdGlvbiAoc1R5cGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIFNUT1JBR0VBVkFJTEFCSUxJVFlbc1R5cGVdID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHJldHVybiBTVE9SQUdFQVZBSUxBQklMSVRZW3NUeXBlXTtcclxuICAgICAgICB2YXIgaXNBdmFpbGFibGUgPSB0cnVlLCBzdG9yYWdlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UgPSB0aGlzLmdldFdTdG9yYWdlKHNUeXBlKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdG9yYWdlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKCd0ZXN0LXN0b3JhZ2UnLCAnZm9vYmFyJyk7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rlc3Qtc3RvcmFnZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGlzQXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlzQXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNBdmFpbGFibGUpXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihTVE9SQUdFX05BTUVTW3NUeXBlXSArIFwiIHN0b3JhZ2UgdW5hdmFpbGFibGUsIE5nMldlYnN0b3JhZ2Ugd2lsbCB1c2UgYSBmYWxsYmFjayBzdHJhdGVneSBpbnN0ZWFkXCIpO1xyXG4gICAgICAgIHJldHVybiBTVE9SQUdFQVZBSUxBQklMSVRZW3NUeXBlXSA9IGlzQXZhaWxhYmxlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBXZWJTdG9yYWdlSGVscGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBXZWJTdG9yYWdlSGVscGVyIH07XHJcbnZhciBfYSwgX2I7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYlN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciwgV2ViU3RvcmFnZUhlbHBlciwgU3RvcmFnZU9ic2VydmVySGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9pbmRleCc7XHJcbnZhciBXZWJTdG9yYWdlU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWJTdG9yYWdlU2VydmljZShzVHlwZSkge1xyXG4gICAgICAgIGlmIChzVHlwZSA9PT0gdm9pZCAwKSB7IHNUeXBlID0gbnVsbDsgfVxyXG4gICAgICAgIHRoaXMuc1R5cGUgPSBzVHlwZTtcclxuICAgICAgICB0aGlzLnNUeXBlID0gc1R5cGU7XHJcbiAgICB9XHJcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUuc3RvcmUgPSBmdW5jdGlvbiAocmF3LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KTtcclxuICAgICAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JlKHRoaXMuc1R5cGUsIHNLZXksIHZhbHVlKTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUucmV0cmlldmUgPSBmdW5jdGlvbiAocmF3KSB7XHJcbiAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpO1xyXG4gICAgICAgIHJldHVybiBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlKHRoaXMuc1R5cGUsIHNLZXkpO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChyYXcpIHtcclxuICAgICAgICBpZiAocmF3KVxyXG4gICAgICAgICAgICBXZWJTdG9yYWdlSGVscGVyLmNsZWFyKHRoaXMuc1R5cGUsIEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KHJhdykpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5jbGVhckFsbCh0aGlzLnNUeXBlKTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChyYXcpIHtcclxuICAgICAgICB2YXIgc0tleSA9IEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KHJhdyk7XHJcbiAgICAgICAgcmV0dXJuIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5vYnNlcnZlKHRoaXMuc1R5cGUsIHNLZXkpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBXZWJTdG9yYWdlU2VydmljZTtcclxufSgpKTtcclxuZXhwb3J0IHsgV2ViU3RvcmFnZVNlcnZpY2UgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2ViU3RvcmFnZS5qcy5tYXAiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XHJcbmltcG9ydCB7IFdlYlN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi93ZWJTdG9yYWdlJztcclxudmFyIExvY2FsU3RvcmFnZVNlcnZpY2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKExvY2FsU3RvcmFnZVNlcnZpY2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBMb2NhbFN0b3JhZ2VTZXJ2aWNlKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBTVE9SQUdFLmxvY2FsKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIExvY2FsU3RvcmFnZVNlcnZpY2U7XHJcbn0oV2ViU3RvcmFnZVNlcnZpY2UpKTtcclxuZXhwb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9O1xyXG5Mb2NhbFN0b3JhZ2VTZXJ2aWNlLmRlY29yYXRvcnMgPSBbXHJcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcclxuXTtcclxuLyoqIEBub2NvbGxhcHNlICovXHJcbkxvY2FsU3RvcmFnZVNlcnZpY2UuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9jYWxTdG9yYWdlLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xyXG52YXIgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhTZXNzaW9uU3RvcmFnZVNlcnZpY2UsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTZXNzaW9uU3RvcmFnZVNlcnZpY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFNUT1JBR0Uuc2Vzc2lvbikgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBTZXNzaW9uU3RvcmFnZVNlcnZpY2U7XHJcbn0oV2ViU3RvcmFnZVNlcnZpY2UpKTtcclxuZXhwb3J0IHsgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIH07XHJcblNlc3Npb25TdG9yYWdlU2VydmljZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXHJcbl07XHJcbi8qKiBAbm9jb2xsYXBzZSAqL1xyXG5TZXNzaW9uU3RvcmFnZVNlcnZpY2UuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Vzc2lvblN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgTElCX0tFWSwgTElCX0tFWV9DQVNFX1NFTlNJVElWRSwgTElCX0tFWV9TRVBBUkFUT1IgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcclxudmFyIFdlYnN0b3JhZ2VDb25maWcgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2Vic3RvcmFnZUNvbmZpZyhjb25maWcpIHtcclxuICAgICAgICB0aGlzLnByZWZpeCA9IExJQl9LRVk7XHJcbiAgICAgICAgdGhpcy5zZXBhcmF0b3IgPSBMSUJfS0VZX1NFUEFSQVRPUjtcclxuICAgICAgICB0aGlzLmNhc2VTZW5zaXRpdmUgPSBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFO1xyXG4gICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLnByZWZpeCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlZml4ID0gY29uZmlnLnByZWZpeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuc2VwYXJhdG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXBhcmF0b3IgPSBjb25maWcuc2VwYXJhdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5jYXNlU2Vuc2l0aXZlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXNlU2Vuc2l0aXZlID0gY29uZmlnLmNhc2VTZW5zaXRpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFdlYnN0b3JhZ2VDb25maWc7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFdlYnN0b3JhZ2VDb25maWcgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsImltcG9ydCB7IEtleVN0b3JhZ2VIZWxwZXIsIFdlYlN0b3JhZ2VIZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2luZGV4JztcclxuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5leHBvcnQgZnVuY3Rpb24gV2ViU3RvcmFnZSh3ZWJTS2V5LCBzVHlwZSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB2b2lkIDApIHsgZGVmYXVsdFZhbHVlID0gbnVsbDsgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXRlZENsYXNzLCByYXcpIHtcclxuICAgICAgICBXZWJTdG9yYWdlRGVjb3JhdG9yKHdlYlNLZXksIFNUT1JBR0UubG9jYWwsIHRhcmdldGVkQ2xhc3MsIHJhdywgZGVmYXVsdFZhbHVlKTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFdlYlN0b3JhZ2VEZWNvcmF0b3Iod2ViU0tleSwgc1R5cGUsIHRhcmdldGVkQ2xhc3MsIHJhdywgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB2b2lkIDApIHsgZGVmYXVsdFZhbHVlID0gbnVsbDsgfVxyXG4gICAgdmFyIGtleSA9IHdlYlNLZXkgfHwgcmF3O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldGVkQ2xhc3MsIHJhdywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc0tleSA9IEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlKHNUeXBlLCBzS2V5KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkoa2V5KTtcclxuICAgICAgICAgICAgdGhpc1tzS2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JlKHNUeXBlLCBzS2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAodGFyZ2V0ZWRDbGFzc1tyYXddID09PSBudWxsKVxyXG4gICAgICAgIHRhcmdldGVkQ2xhc3NbcmF3XSA9IGRlZmF1bHRWYWx1ZTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IFdlYlN0b3JhZ2VEZWNvcmF0b3IgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xyXG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XHJcbmV4cG9ydCBmdW5jdGlvbiBMb2NhbFN0b3JhZ2Uod2ViU0tleSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB2b2lkIDApIHsgZGVmYXVsdFZhbHVlID0gbnVsbDsgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXRlZENsYXNzLCByYXcpIHtcclxuICAgICAgICBXZWJTdG9yYWdlRGVjb3JhdG9yKHdlYlNLZXksIFNUT1JBR0UubG9jYWwsIHRhcmdldGVkQ2xhc3MsIHJhdywgZGVmYXVsdFZhbHVlKTtcclxuICAgIH07XHJcbn1cclxuO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2NhbFN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgV2ViU3RvcmFnZURlY29yYXRvciB9IGZyb20gJy4vd2ViU3RvcmFnZSc7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuZXhwb3J0IGZ1bmN0aW9uIFNlc3Npb25TdG9yYWdlKHdlYlNLZXksIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdm9pZCAwKSB7IGRlZmF1bHRWYWx1ZSA9IG51bGw7IH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0ZWRDbGFzcywgcmF3KSB7XHJcbiAgICAgICAgV2ViU3RvcmFnZURlY29yYXRvcih3ZWJTS2V5LCBTVE9SQUdFLnNlc3Npb24sIHRhcmdldGVkQ2xhc3MsIHJhdywgZGVmYXVsdFZhbHVlKTtcclxuICAgIH07XHJcbn1cclxuO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXNzaW9uU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBOZ01vZHVsZSwgTmdab25lLCBPcGFxdWVUb2tlbiwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMSUJfS0VZLCBMSUJfS0VZX1NFUEFSQVRPUiwgTElCX0tFWV9DQVNFX1NFTlNJVElWRSB9IGZyb20gJy4vY29uc3RhbnRzL2xpYic7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuL2VudW1zL3N0b3JhZ2UnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZUhlbHBlciB9IGZyb20gJy4vaGVscGVycy93ZWJTdG9yYWdlJztcclxuaW1wb3J0IHsgV2Vic3RvcmFnZUNvbmZpZyB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25maWcnO1xyXG5pbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL2tleVN0b3JhZ2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZXMvaW5kZXgnO1xyXG5leHBvcnQgKiBmcm9tICcuL2RlY29yYXRvcnMvaW5kZXgnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcclxuZXhwb3J0IHZhciBXRUJTVE9SQUdFX0NPTkZJRyA9IG5ldyBPcGFxdWVUb2tlbignV0VCU1RPUkFHRV9DT05GSUcnKTtcclxudmFyIE5nMldlYnN0b3JhZ2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTmcyV2Vic3RvcmFnZShuZ1pvbmUsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMubmdab25lID0gbmdab25lO1xyXG4gICAgICAgIGlmIChjb25maWcpIHtcclxuICAgICAgICAgICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5UHJlZml4KGNvbmZpZy5wcmVmaXgpO1xyXG4gICAgICAgICAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlTZXBhcmF0b3IoY29uZmlnLnNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0Q2FzZVNlbnNpdGl2aXR5KGNvbmZpZy5jYXNlU2Vuc2l0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0U3RvcmFnZUxpc3RlbmVyKCk7XHJcbiAgICB9XHJcbiAgICBOZzJXZWJzdG9yYWdlLmZvclJvb3QgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IE5nMldlYnN0b3JhZ2UsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IFdFQlNUT1JBR0VfQ09ORklHLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZVZhbHVlOiBjb25maWdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogV2Vic3RvcmFnZUNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiBwcm92aWRlQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgV0VCU1RPUkFHRV9DT05GSUdcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIE5nMldlYnN0b3JhZ2UucHJvdG90eXBlLmluaXRTdG9yYWdlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0b3JhZ2UgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UgPT09IGV2ZW50LnN0b3JhZ2VBcmVhID8gU1RPUkFHRS5zZXNzaW9uIDogU1RPUkFHRS5sb2NhbDtcclxuICAgICAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIucmVmcmVzaChzdG9yYWdlLCBldmVudC5rZXkpO1xyXG4gICAgICAgICAgICB9KTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBOZzJXZWJzdG9yYWdlO1xyXG59KCkpO1xyXG5leHBvcnQgeyBOZzJXZWJzdG9yYWdlIH07XHJcbk5nMldlYnN0b3JhZ2UuZGVjb3JhdG9ycyA9IFtcclxuICAgIHsgdHlwZTogTmdNb2R1bGUsIGFyZ3M6IFt7XHJcbiAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXJzOiBbU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLCBMb2NhbFN0b3JhZ2VTZXJ2aWNlXSxcclxuICAgICAgICAgICAgICAgIGltcG9ydHM6IFtdXHJcbiAgICAgICAgICAgIH0sXSB9LFxyXG5dO1xyXG4vKiogQG5vY29sbGFwc2UgKi9cclxuTmcyV2Vic3RvcmFnZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcclxuICAgIHsgdHlwZTogTmdab25lLCB9LFxyXG4gICAgeyB0eXBlOiBXZWJzdG9yYWdlQ29uZmlnLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBPcHRpb25hbCB9LCB7IHR5cGU6IEluamVjdCwgYXJnczogW1dlYnN0b3JhZ2VDb25maWcsXSB9LF0gfSxcclxuXTsgfTtcclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDb25maWcoY29uZmlnKSB7XHJcbiAgICByZXR1cm4gbmV3IFdlYnN0b3JhZ2VDb25maWcoY29uZmlnKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKF9hKSB7XHJcbiAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge1xyXG4gICAgICAgIGNhc2VTZW5zaXRpdmU6IExJQl9LRVlfQ0FTRV9TRU5TSVRJVkUsXHJcbiAgICAgICAgcHJlZml4OiBMSUJfS0VZLFxyXG4gICAgICAgIHNlcGFyYXRvcjogTElCX0tFWV9TRVBBUkFUT1JcclxuICAgIH0gOiBfYSwgcHJlZml4ID0gX2IucHJlZml4LCBzZXBhcmF0b3IgPSBfYi5zZXBhcmF0b3IsIGNhc2VTZW5zaXRpdmUgPSBfYi5jYXNlU2Vuc2l0aXZlO1xyXG4gICAgLypARGVwcmVjYXRpb24qL1xyXG4gICAgY29uc29sZS53YXJuKCdbbmcyLXdlYnN0b3JhZ2U6ZGVwcmVjYXRpb25dIFRoZSBjb25maWd1cmUgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgc2luY2UgdGhlIHYxLjUuMCwgY29uc2lkZXIgdG8gdXNlIGZvclJvb3QgaW5zdGVhZCcpO1xyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5UHJlZml4KHByZWZpeCk7XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlTZXBhcmF0b3Ioc2VwYXJhdG9yKTtcclxuICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0Q2FzZVNlbnNpdGl2aXR5KGNhc2VTZW5zaXRpdmUpO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXAiXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiX2EiLCJ0aGlzIiwiSW5qZWN0YWJsZSIsIl9fZXh0ZW5kcyIsIk9wYXF1ZVRva2VuIiwiTmdNb2R1bGUiLCJOZ1pvbmUiLCJPcHRpb25hbCIsIkluamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sSUFBSSxPQUFPLENBQUM7QUFDbkIsQ0FBQyxVQUFVLE9BQU8sRUFBRTtJQUNoQixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztDQUMvQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQUFDOUI7O0FDSk8sSUFBSSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7QUFDdEMsQUFBTyxJQUFJLGlCQUFpQixHQUFHLEdBQUcsQ0FBQztBQUNuQyxBQUFPLElBQUksc0JBQXNCLEdBQUcsS0FBSyxDQUFDO0FBQzFDLEFBQU8sSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRTtJQUMvQixFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU87SUFDM0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTO0lBQy9CLEVBQUUsQ0FBQyxDQUFDO0FBQ1IsSUFBSSxFQUFFLENBQUMsQUFDUDs7QUNSQSxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUM7QUFDN0IsSUFBSSx3QkFBd0IsR0FBRyxpQkFBaUIsQ0FBQztBQUNqRCxJQUFJLDZCQUE2QixHQUFHLHNC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
