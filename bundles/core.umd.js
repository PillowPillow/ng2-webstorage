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
var KeyStorageHelper = /** @class */ (function () {
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

var StorageObserverHelper = /** @class */ (function () {
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

var MockStorageHelper = /** @class */ (function () {
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

var CACHED = (_a$1 = {}, _a$1[STORAGE.local] = {}, _a$1[STORAGE.session] = {}, _a$1);
var STORAGEAVAILABILITY = (_b = {}, _b[STORAGE.local] = null, _b[STORAGE.session] = null, _b);
var WebStorageHelper = /** @class */ (function () {
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

var WebStorageService = /** @class */ (function () {
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
var LocalStorageService = /** @class */ (function (_super) {
    __extends(LocalStorageService, _super);
    function LocalStorageService() {
        return _super.call(this, STORAGE.local) || this;
    }
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
var SessionStorageService = /** @class */ (function (_super) {
    __extends$1(SessionStorageService, _super);
    function SessionStorageService() {
        return _super.call(this, STORAGE.session) || this;
    }
    return SessionStorageService;
}(WebStorageService));

var WebstorageConfig = /** @class */ (function () {
    function WebstorageConfig(config) {
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

var WEBSTORAGE_CONFIG = new _angular_core.InjectionToken('WEBSTORAGE_CONFIG');
var Ng2Webstorage = /** @class */ (function () {
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
            window.addEventListener('storage', function (event) {
                return _this.ngZone.run(function () {
                    var storage = window.sessionStorage === event.storageArea ? STORAGE.session : STORAGE.local;
                    WebStorageHelper.refresh(storage, event.key);
                });
            });
        }
    };
    return Ng2Webstorage;
}());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS51bWQuanMiLCJzb3VyY2VzIjpbIi4uL2Rpc3QvZW51bXMvc3RvcmFnZS5qcyIsIi4uL2Rpc3QvY29uc3RhbnRzL2xpYi5qcyIsIi4uL2Rpc3QvaGVscGVycy9rZXlTdG9yYWdlLmpzIiwiLi4vZGlzdC9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlci5qcyIsIi4uL2Rpc3QvaGVscGVycy9tb2NrU3RvcmFnZS5qcyIsIi4uL2Rpc3QvaGVscGVycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy9sb2NhbFN0b3JhZ2UuanMiLCIuLi9kaXN0L3NlcnZpY2VzL3Nlc3Npb25TdG9yYWdlLmpzIiwiLi4vZGlzdC9pbnRlcmZhY2VzL2NvbmZpZy5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9kZWNvcmF0b3JzL2xvY2FsU3RvcmFnZS5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL2Rpc3QvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgU1RPUkFHRTtcbihmdW5jdGlvbiAoU1RPUkFHRSkge1xuICAgIFNUT1JBR0VbU1RPUkFHRVtcImxvY2FsXCJdID0gMF0gPSBcImxvY2FsXCI7XG4gICAgU1RPUkFHRVtTVE9SQUdFW1wic2Vzc2lvblwiXSA9IDFdID0gXCJzZXNzaW9uXCI7XG59KShTVE9SQUdFIHx8IChTVE9SQUdFID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xuZXhwb3J0IHZhciBMSUJfS0VZID0gJ25nMi13ZWJzdG9yYWdlJztcbmV4cG9ydCB2YXIgTElCX0tFWV9TRVBBUkFUT1IgPSAnfCc7XG5leHBvcnQgdmFyIExJQl9LRVlfQ0FTRV9TRU5TSVRJVkUgPSBmYWxzZTtcbmV4cG9ydCB2YXIgU1RPUkFHRV9OQU1FUyA9IChfYSA9IHt9LFxuICAgIF9hW1NUT1JBR0UubG9jYWxdID0gJ2xvY2FsJyxcbiAgICBfYVtTVE9SQUdFLnNlc3Npb25dID0gJ3Nlc3Npb24nLFxuICAgIF9hKTtcbnZhciBfYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpYi5qcy5tYXAiLCJpbXBvcnQgeyBMSUJfS0VZLCBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFLCBMSUJfS0VZX1NFUEFSQVRPUiB9IGZyb20gJy4uL2NvbnN0YW50cy9saWInO1xudmFyIENVU1RPTV9MSUJfS0VZID0gTElCX0tFWTtcbnZhciBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IgPSBMSUJfS0VZX1NFUEFSQVRPUjtcbnZhciBDVVNUT01fTElCX0tFWV9DQVNFX1NFTlNJVElWRSA9IExJQl9LRVlfQ0FTRV9TRU5TSVRJVkU7XG5leHBvcnQgZnVuY3Rpb24gaXNNYW5hZ2VkS2V5KHNLZXkpIHtcbiAgICByZXR1cm4gc0tleS5pbmRleE9mKENVU1RPTV9MSUJfS0VZICsgQ1VTVE9NX0xJQl9LRVlfU0VQQVJBVE9SKSA9PT0gMDtcbn1cbnZhciBLZXlTdG9yYWdlSGVscGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEtleVN0b3JhZ2VIZWxwZXIoKSB7XG4gICAgfVxuICAgIEtleVN0b3JhZ2VIZWxwZXIuaXNNYW5hZ2VkS2V5ID0gZnVuY3Rpb24gKHNLZXkpIHtcbiAgICAgICAgcmV0dXJuIHNLZXkuaW5kZXhPZihDVVNUT01fTElCX0tFWSArIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUikgPT09IDA7XG4gICAgfTtcbiAgICBLZXlTdG9yYWdlSGVscGVyLnJldHJpZXZlS2V5c0Zyb21TdG9yYWdlID0gZnVuY3Rpb24gKHN0b3JhZ2UpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHN0b3JhZ2UpLmZpbHRlcihpc01hbmFnZWRLZXkpO1xuICAgIH07XG4gICAgS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkgPSBmdW5jdGlvbiAocmF3KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmF3ICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdhdHRlbXB0IHRvIGdlbmVyYXRlIGEgc3RvcmFnZSBrZXkgd2l0aCBhIG5vbiBzdHJpbmcgdmFsdWUnKTtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyBDVVNUT01fTElCX0tFWSArIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUiArIHRoaXMuZm9ybWF0S2V5KHJhdyk7XG4gICAgfTtcbiAgICBLZXlTdG9yYWdlSGVscGVyLmZvcm1hdEtleSA9IGZ1bmN0aW9uIChyYXcpIHtcbiAgICAgICAgdmFyIGtleSA9IHJhdy50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gQ1VTVE9NX0xJQl9LRVlfQ0FTRV9TRU5TSVRJVkUgPyBrZXkgOiBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICB9O1xuICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVByZWZpeCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gdm9pZCAwKSB7IGtleSA9IExJQl9LRVk7IH1cbiAgICAgICAgQ1VTVE9NX0xJQl9LRVkgPSBrZXk7XG4gICAgfTtcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldENhc2VTZW5zaXRpdml0eSA9IGZ1bmN0aW9uIChlbmFibGUpIHtcbiAgICAgICAgaWYgKGVuYWJsZSA9PT0gdm9pZCAwKSB7IGVuYWJsZSA9IExJQl9LRVlfQ0FTRV9TRU5TSVRJVkU7IH1cbiAgICAgICAgQ1VTVE9NX0xJQl9LRVlfQ0FTRV9TRU5TSVRJVkUgPSBlbmFibGU7XG4gICAgfTtcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlTZXBhcmF0b3IgPSBmdW5jdGlvbiAoc2VwYXJhdG9yKSB7XG4gICAgICAgIGlmIChzZXBhcmF0b3IgPT09IHZvaWQgMCkgeyBzZXBhcmF0b3IgPSBMSUJfS0VZX1NFUEFSQVRPUjsgfVxuICAgICAgICBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IgPSBzZXBhcmF0b3I7XG4gICAgfTtcbiAgICByZXR1cm4gS2V5U3RvcmFnZUhlbHBlcjtcbn0oKSk7XG5leHBvcnQgeyBLZXlTdG9yYWdlSGVscGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXlTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xudmFyIFN0b3JhZ2VPYnNlcnZlckhlbHBlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIoKSB7XG4gICAgfVxuICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5vYnNlcnZlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XG4gICAgICAgIHZhciBvS2V5ID0gdGhpcy5nZW5PYnNlcnZlcktleShzVHlwZSwgc0tleSk7XG4gICAgICAgIGlmIChvS2V5IGluIHRoaXMub2JzZXJ2ZXJzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2ZXJzW29LZXldO1xuICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnNbb0tleV0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfTtcbiAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdCA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIG9LZXkgPSB0aGlzLmdlbk9ic2VydmVyS2V5KHNUeXBlLCBzS2V5KTtcbiAgICAgICAgaWYgKG9LZXkgaW4gdGhpcy5vYnNlcnZlcnMpXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc1tvS2V5XS5lbWl0KHZhbHVlKTtcbiAgICB9O1xuICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5nZW5PYnNlcnZlcktleSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xuICAgICAgICByZXR1cm4gc1R5cGUgKyAnfCcgKyBzS2V5O1xuICAgIH07XG4gICAgcmV0dXJuIFN0b3JhZ2VPYnNlcnZlckhlbHBlcjtcbn0oKSk7XG5leHBvcnQgeyBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JhZ2VPYnNlcnZlci5qcy5tYXAiLCJ2YXIgTW9ja1N0b3JhZ2VIZWxwZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9ja1N0b3JhZ2VIZWxwZXIoKSB7XG4gICAgfVxuICAgIE1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkID0gZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgIHJldHVybiAhIX5Nb2NrU3RvcmFnZUhlbHBlci5zZWN1cmVkRmllbGRzLmluZGV4T2YoZmllbGQpO1xuICAgIH07XG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuZ2V0U3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xuICAgICAgICBpZiAoIXRoaXMubW9ja1N0b3JhZ2VzW3NUeXBlXSlcbiAgICAgICAgICAgIHRoaXMubW9ja1N0b3JhZ2VzW3NUeXBlXSA9IE1vY2tTdG9yYWdlSGVscGVyLmdlbmVyYXRlU3RvcmFnZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5tb2NrU3RvcmFnZXNbc1R5cGVdO1xuICAgIH07XG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuZ2VuZXJhdGVTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmFnZSA9IHt9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhzdG9yYWdlLCB7XG4gICAgICAgICAgICBzZXRJdGVtOiB7XG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SXRlbToge1xuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQoa2V5KSA/IHRoaXNba2V5XSB8fCBudWxsIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUl0ZW06IHtcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIU1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkKGtleSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVuZ3RoOiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RvcmFnZTtcbiAgICB9O1xuICAgIHJldHVybiBNb2NrU3RvcmFnZUhlbHBlcjtcbn0oKSk7XG5leHBvcnQgeyBNb2NrU3RvcmFnZUhlbHBlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9ja1N0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xuaW1wb3J0IHsgU3RvcmFnZU9ic2VydmVySGVscGVyIH0gZnJvbSAnLi9zdG9yYWdlT2JzZXJ2ZXInO1xuaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciB9IGZyb20gJy4va2V5U3RvcmFnZSc7XG5pbXBvcnQgeyBNb2NrU3RvcmFnZUhlbHBlciB9IGZyb20gJy4vbW9ja1N0b3JhZ2UnO1xuaW1wb3J0IHsgU1RPUkFHRV9OQU1FUyB9IGZyb20gJy4uL2NvbnN0YW50cy9saWInO1xudmFyIENBQ0hFRCA9IChfYSA9IHt9LCBfYVtTVE9SQUdFLmxvY2FsXSA9IHt9LCBfYVtTVE9SQUdFLnNlc3Npb25dID0ge30sIF9hKTtcbnZhciBTVE9SQUdFQVZBSUxBQklMSVRZID0gKF9iID0ge30sIF9iW1NUT1JBR0UubG9jYWxdID0gbnVsbCwgX2JbU1RPUkFHRS5zZXNzaW9uXSA9IG51bGwsIF9iKTtcbnZhciBXZWJTdG9yYWdlSGVscGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdlYlN0b3JhZ2VIZWxwZXIoKSB7XG4gICAgfVxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuc3RvcmUgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0U3RvcmFnZShzVHlwZSkuc2V0SXRlbShzS2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgICAgICBDQUNIRURbc1R5cGVdW3NLZXldID0gdmFsdWU7XG4gICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCB2YWx1ZSk7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XG4gICAgICAgIGlmIChDQUNIRURbc1R5cGVdW3NLZXldKVxuICAgICAgICAgICAgcmV0dXJuIENBQ0hFRFtzVHlwZV1bc0tleV07XG4gICAgICAgIHJldHVybiBDQUNIRURbc1R5cGVdW3NLZXldID0gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZUZyb21TdG9yYWdlKHNUeXBlLCBzS2V5KTtcbiAgICB9O1xuICAgIFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmVGcm9tU3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xuICAgICAgICB2YXIgZGF0YSA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpLmdldEl0ZW0oc0tleSkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImludmFsaWQgdmFsdWUgZm9yIFwiICsgc0tleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJlZnJlc2ggPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcbiAgICAgICAgaWYgKCFLZXlTdG9yYWdlSGVscGVyLmlzTWFuYWdlZEtleShzS2V5KSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHZhbHVlID0gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZUZyb21TdG9yYWdlKHNUeXBlLCBzS2V5KTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgQ0FDSEVEW3NUeXBlXVtzS2V5XTtcbiAgICAgICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPT0gQ0FDSEVEW3NUeXBlXVtzS2V5XSkge1xuICAgICAgICAgICAgQ0FDSEVEW3NUeXBlXVtzS2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgV2ViU3RvcmFnZUhlbHBlci5jbGVhckFsbCA9IGZ1bmN0aW9uIChzVHlwZSkge1xuICAgICAgICB2YXIgc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZShzVHlwZSk7XG4gICAgICAgIEtleVN0b3JhZ2VIZWxwZXIucmV0cmlldmVLZXlzRnJvbVN0b3JhZ2Uoc3RvcmFnZSlcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChzS2V5KSB7XG4gICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oc0tleSk7XG4gICAgICAgICAgICBkZWxldGUgQ0FDSEVEW3NUeXBlXVtzS2V5XTtcbiAgICAgICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCBudWxsKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlSGVscGVyLmNsZWFyID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XG4gICAgICAgIHRoaXMuZ2V0U3RvcmFnZShzVHlwZSkucmVtb3ZlSXRlbShzS2V5KTtcbiAgICAgICAgZGVsZXRlIENBQ0hFRFtzVHlwZV1bc0tleV07XG4gICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCBudWxsKTtcbiAgICB9O1xuICAgIFdlYlN0b3JhZ2VIZWxwZXIuZ2V0U3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3JhZ2VBdmFpbGFibGUoc1R5cGUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0V1N0b3JhZ2Uoc1R5cGUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gTW9ja1N0b3JhZ2VIZWxwZXIuZ2V0U3RvcmFnZShzVHlwZSk7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlSGVscGVyLmdldFdTdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlKSB7XG4gICAgICAgIHZhciBzdG9yYWdlO1xuICAgICAgICBzd2l0Y2ggKHNUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNUT1JBR0UubG9jYWw6XG4gICAgICAgICAgICAgICAgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU1RPUkFHRS5zZXNzaW9uOlxuICAgICAgICAgICAgICAgIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ2ludmFsaWQgc3RvcmFnZSB0eXBlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0b3JhZ2U7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlSGVscGVyLmlzU3RvcmFnZUF2YWlsYWJsZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xuICAgICAgICBpZiAodHlwZW9mIFNUT1JBR0VBVkFJTEFCSUxJVFlbc1R5cGVdID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICByZXR1cm4gU1RPUkFHRUFWQUlMQUJJTElUWVtzVHlwZV07XG4gICAgICAgIHZhciBpc0F2YWlsYWJsZSA9IHRydWUsIHN0b3JhZ2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdG9yYWdlID0gdGhpcy5nZXRXU3RvcmFnZShzVHlwZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0b3JhZ2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKCd0ZXN0LXN0b3JhZ2UnLCAnZm9vYmFyJyk7XG4gICAgICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKCd0ZXN0LXN0b3JhZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBpc0F2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpc0F2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNBdmFpbGFibGUpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oU1RPUkFHRV9OQU1FU1tzVHlwZV0gKyBcIiBzdG9yYWdlIHVuYXZhaWxhYmxlLCBOZzJXZWJzdG9yYWdlIHdpbGwgdXNlIGEgZmFsbGJhY2sgc3RyYXRlZ3kgaW5zdGVhZFwiKTtcbiAgICAgICAgcmV0dXJuIFNUT1JBR0VBVkFJTEFCSUxJVFlbc1R5cGVdID0gaXNBdmFpbGFibGU7XG4gICAgfTtcbiAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlcjtcbn0oKSk7XG5leHBvcnQgeyBXZWJTdG9yYWdlSGVscGVyIH07XG52YXIgX2EsIF9iO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2ViU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyLCBXZWJTdG9yYWdlSGVscGVyLCBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2luZGV4JztcbnZhciBXZWJTdG9yYWdlU2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXZWJTdG9yYWdlU2VydmljZShzVHlwZSkge1xuICAgICAgICBpZiAoc1R5cGUgPT09IHZvaWQgMCkgeyBzVHlwZSA9IG51bGw7IH1cbiAgICAgICAgdGhpcy5zVHlwZSA9IHNUeXBlO1xuICAgICAgICB0aGlzLnNUeXBlID0gc1R5cGU7XG4gICAgfVxuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5zdG9yZSA9IGZ1bmN0aW9uIChyYXcsIHZhbHVlKSB7XG4gICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KTtcbiAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5zdG9yZSh0aGlzLnNUeXBlLCBzS2V5LCB2YWx1ZSk7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUucmV0cmlldmUgPSBmdW5jdGlvbiAocmF3KSB7XG4gICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KTtcbiAgICAgICAgcmV0dXJuIFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmUodGhpcy5zVHlwZSwgc0tleSk7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAocmF3KSB7XG4gICAgICAgIGlmIChyYXcpXG4gICAgICAgICAgICBXZWJTdG9yYWdlSGVscGVyLmNsZWFyKHRoaXMuc1R5cGUsIEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KHJhdykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBXZWJTdG9yYWdlSGVscGVyLmNsZWFyQWxsKHRoaXMuc1R5cGUpO1xuICAgIH07XG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAocmF3KSB7XG4gICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KTtcbiAgICAgICAgcmV0dXJuIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5vYnNlcnZlKHRoaXMuc1R5cGUsIHNLZXkpO1xuICAgIH07XG4gICAgcmV0dXJuIFdlYlN0b3JhZ2VTZXJ2aWNlO1xufSgpKTtcbmV4cG9ydCB7IFdlYlN0b3JhZ2VTZXJ2aWNlIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJTdG9yYWdlLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xudmFyIExvY2FsU3RvcmFnZVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKExvY2FsU3RvcmFnZVNlcnZpY2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTG9jYWxTdG9yYWdlU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFNUT1JBR0UubG9jYWwpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBMb2NhbFN0b3JhZ2VTZXJ2aWNlO1xufShXZWJTdG9yYWdlU2VydmljZSkpO1xuZXhwb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9jYWxTdG9yYWdlLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xudmFyIFNlc3Npb25TdG9yYWdlU2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlc3Npb25TdG9yYWdlU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFNUT1JBR0Uuc2Vzc2lvbikgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNlc3Npb25TdG9yYWdlU2VydmljZTtcbn0oV2ViU3RvcmFnZVNlcnZpY2UpKTtcbmV4cG9ydCB7IFNlc3Npb25TdG9yYWdlU2VydmljZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Vzc2lvblN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgTElCX0tFWSwgTElCX0tFWV9DQVNFX1NFTlNJVElWRSwgTElCX0tFWV9TRVBBUkFUT1IgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcbnZhciBXZWJzdG9yYWdlQ29uZmlnID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdlYnN0b3JhZ2VDb25maWcoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLnByZWZpeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeCA9IGNvbmZpZy5wcmVmaXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuc2VwYXJhdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VwYXJhdG9yID0gY29uZmlnLnNlcGFyYXRvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5jYXNlU2Vuc2l0aXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZSA9IGNvbmZpZy5jYXNlU2Vuc2l0aXZlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBXZWJzdG9yYWdlQ29uZmlnO1xufSgpKTtcbmV4cG9ydCB7IFdlYnN0b3JhZ2VDb25maWcgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJpbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyLCBXZWJTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9pbmRleCc7XG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XG5leHBvcnQgZnVuY3Rpb24gV2ViU3RvcmFnZSh3ZWJTS2V5LCBzVHlwZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdm9pZCAwKSB7IGRlZmF1bHRWYWx1ZSA9IG51bGw7IH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldGVkQ2xhc3MsIHJhdykge1xuICAgICAgICBXZWJTdG9yYWdlRGVjb3JhdG9yKHdlYlNLZXksIFNUT1JBR0UubG9jYWwsIHRhcmdldGVkQ2xhc3MsIHJhdywgZGVmYXVsdFZhbHVlKTtcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIFdlYlN0b3JhZ2VEZWNvcmF0b3Iod2ViU0tleSwgc1R5cGUsIHRhcmdldGVkQ2xhc3MsIHJhdywgZGVmYXVsdFZhbHVlKSB7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdm9pZCAwKSB7IGRlZmF1bHRWYWx1ZSA9IG51bGw7IH1cbiAgICB2YXIga2V5ID0gd2ViU0tleSB8fCByYXc7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldGVkQ2xhc3MsIHJhdywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlKHNUeXBlLCBzS2V5KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkoa2V5KTtcbiAgICAgICAgICAgIHRoaXNbc0tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuc3RvcmUoc1R5cGUsIHNLZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0YXJnZXRlZENsYXNzW3Jhd10gPT09IG51bGwpXG4gICAgICAgIHRhcmdldGVkQ2xhc3NbcmF3XSA9IGRlZmF1bHRWYWx1ZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYlN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgV2ViU3RvcmFnZURlY29yYXRvciB9IGZyb20gJy4vd2ViU3RvcmFnZSc7XG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XG5leHBvcnQgZnVuY3Rpb24gTG9jYWxTdG9yYWdlKHdlYlNLZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHZvaWQgMCkgeyBkZWZhdWx0VmFsdWUgPSBudWxsOyB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXRlZENsYXNzLCByYXcpIHtcbiAgICAgICAgV2ViU3RvcmFnZURlY29yYXRvcih3ZWJTS2V5LCBTVE9SQUdFLmxvY2FsLCB0YXJnZXRlZENsYXNzLCByYXcsIGRlZmF1bHRWYWx1ZSk7XG4gICAgfTtcbn1cbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2FsU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBXZWJTdG9yYWdlRGVjb3JhdG9yIH0gZnJvbSAnLi93ZWJTdG9yYWdlJztcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcbmV4cG9ydCBmdW5jdGlvbiBTZXNzaW9uU3RvcmFnZSh3ZWJTS2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB2b2lkIDApIHsgZGVmYXVsdFZhbHVlID0gbnVsbDsgfVxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0ZWRDbGFzcywgcmF3KSB7XG4gICAgICAgIFdlYlN0b3JhZ2VEZWNvcmF0b3Iod2ViU0tleSwgU1RPUkFHRS5zZXNzaW9uLCB0YXJnZXRlZENsYXNzLCByYXcsIGRlZmF1bHRWYWx1ZSk7XG4gICAgfTtcbn1cbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlc3Npb25TdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IE5nTW9kdWxlLCBOZ1pvbmUsIEluamVjdGlvblRva2VuLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMSUJfS0VZLCBMSUJfS0VZX1NFUEFSQVRPUiwgTElCX0tFWV9DQVNFX1NFTlNJVElWRSB9IGZyb20gJy4vY29uc3RhbnRzL2xpYic7XG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi9lbnVtcy9zdG9yYWdlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UsIFNlc3Npb25TdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZUhlbHBlciB9IGZyb20gJy4vaGVscGVycy93ZWJTdG9yYWdlJztcbmltcG9ydCB7IFdlYnN0b3JhZ2VDb25maWcgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZmlnJztcbmltcG9ydCB7IEtleVN0b3JhZ2VIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMva2V5U3RvcmFnZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9kZWNvcmF0b3JzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xuZXhwb3J0IHZhciBXRUJTVE9SQUdFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbignV0VCU1RPUkFHRV9DT05GSUcnKTtcbnZhciBOZzJXZWJzdG9yYWdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5nMldlYnN0b3JhZ2Uobmdab25lLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUgPSBuZ1pvbmU7XG4gICAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVByZWZpeChjb25maWcucHJlZml4KTtcbiAgICAgICAgICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVNlcGFyYXRvcihjb25maWcuc2VwYXJhdG9yKTtcbiAgICAgICAgICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0Q2FzZVNlbnNpdGl2aXR5KGNvbmZpZy5jYXNlU2Vuc2l0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRTdG9yYWdlTGlzdGVuZXIoKTtcbiAgICB9XG4gICAgTmcyV2Vic3RvcmFnZS5mb3JSb290ID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IE5nMldlYnN0b3JhZ2UsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IFdFQlNUT1JBR0VfQ09ORklHLFxuICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IFdlYnN0b3JhZ2VDb25maWcsXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHByb3ZpZGVDb25maWcsXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFdFQlNUT1JBR0VfQ09ORklHXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBOZzJXZWJzdG9yYWdlLnByb3RvdHlwZS5pbml0U3RvcmFnZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmFnZSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZSA9PT0gZXZlbnQuc3RvcmFnZUFyZWEgPyBTVE9SQUdFLnNlc3Npb24gOiBTVE9SQUdFLmxvY2FsO1xuICAgICAgICAgICAgICAgICAgICBXZWJTdG9yYWdlSGVscGVyLnJlZnJlc2goc3RvcmFnZSwgZXZlbnQua2V5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTmcyV2Vic3RvcmFnZTtcbn0oKSk7XG5leHBvcnQgeyBOZzJXZWJzdG9yYWdlIH07XG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNvbmZpZyhjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFdlYnN0b3JhZ2VDb25maWcoY29uZmlnKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoX2EpIHtcbiAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge1xuICAgICAgICBjYXNlU2Vuc2l0aXZlOiBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFLFxuICAgICAgICBwcmVmaXg6IExJQl9LRVksXG4gICAgICAgIHNlcGFyYXRvcjogTElCX0tFWV9TRVBBUkFUT1JcbiAgICB9IDogX2EsIHByZWZpeCA9IF9iLnByZWZpeCwgc2VwYXJhdG9yID0gX2Iuc2VwYXJhdG9yLCBjYXNlU2Vuc2l0aXZlID0gX2IuY2FzZVNlbnNpdGl2ZTtcbiAgICAvKkBEZXByZWNhdGlvbiovXG4gICAgY29uc29sZS53YXJuKCdbbmcyLXdlYnN0b3JhZ2U6ZGVwcmVjYXRpb25dIFRoZSBjb25maWd1cmUgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgc2luY2UgdGhlIHYxLjUuMCwgY29uc2lkZXIgdG8gdXNlIGZvclJvb3QgaW5zdGVhZCcpO1xuICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVByZWZpeChwcmVmaXgpO1xuICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVNlcGFyYXRvcihzZXBhcmF0b3IpO1xuICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0Q2FzZVNlbnNpdGl2aXR5KGNhc2VTZW5zaXRpdmUpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcCJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJfYSIsInRoaXMiLCJfX2V4dGVuZHMiLCJJbmplY3Rpb25Ub2tlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sSUFBSSxPQUFPLENBQUM7QUFDbkIsQ0FBQyxVQUFVLE9BQU8sRUFBRTtJQUNoQixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztDQUMvQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQUFDOUI7O0FDSk8sSUFBSSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7QUFDdEMsQUFBTyxJQUFJLGlCQUFpQixHQUFHLEdBQUcsQ0FBQztBQUNuQyxBQUFPLElBQUksc0JBQXNCLEdBQUcsS0FBSyxDQUFDO0FBQzFDLEFBQU8sSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRTtJQUMvQixFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU87SUFDM0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTO0lBQy9CLEVBQUUsQ0FBQyxDQUFDO0FBQ1IsSUFBSSxFQUFFLENBQUMsQUFDUDs7QUNSQSxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUM7QUFDN0IsSUFBSSx3QkFBd0IsR0FBRyxpQkFBaUIsQ0FBQztBQUNqRCxJQUFJLDZCQUE2QixHQUFHLHNCQUFzQixDQUFDO0FBQzNELEFBQU8sU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDeEU7QUFDRCxJQUFJLGdCQUFnQixpQkFBaUIsQ0FBQyxZQUFZO0lBQzlDLFNBQVMsZ0JBQWdCLEdBQUc7S0FDM0I7SUFDRCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsVUFBVSxJQUFJLEVBQUU7UUFDNUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4RSxDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsdUJBQXVCLEdBQUcsVUFBVSxPQUFPLEVBQUU7UUFDMUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwRCxDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLFVBQVUsR0FBRyxFQUFFO1FBQ3JDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtZQUN2QixNQUFNLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sRUFBRSxHQUFHLGNBQWMsR0FBRyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQy9FLENBQUM7SUFDRixnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsVUFBVSxHQUFHLEVBQUU7UUFDeEMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sNkJBQTZCLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNsRSxDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxHQUFHLEVBQUU7UUFDbEQsSUFBSSxHQUFHLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFDdEMsY0FBYyxHQUFHLEdBQUcsQ0FBQztLQUN4QixDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxNQUFNLEVBQUU7UUFDcEQsSUFBSSxNQUFNLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsc0JBQXNCLENBQUMsRUFBRTtRQUMzRCw2QkFBNkIsR0FBRyxNQUFNLENBQUM7S0FDMUMsQ0FBQztJQUNGLGdCQUFnQixDQUFDLHNCQUFzQixHQUFHLFVBQVUsU0FBUyxFQUFFO1FBQzNELElBQUksU0FBUyxLQUFLLEtBQUssQ0FBQyxFQUFFLEVBQUUsU0FBUyxHQUFHLGlCQUFpQixDQUFDLEVBQUU7UUFDNUQsd0JBQXdCLEdBQUcsU0FBUyxDQUFDO0tBQ3hDLENBQUM7SUFDRixPQUFPLGdCQUFnQixDQUFDO0NBQzNCLEVBQUUsQ0FBQyxDQUFDLEFBQ0wsQUFBNEIsQUFDNUI7O0FDdkNBLElBQUkscUJBQXFCLGlCQUFpQixDQUFDLFlBQVk7SUFDbkQsU0FBUyxxQkFBcUIsR0FBRztLQUNoQztJQUNELHFCQUFxQixDQUFDLE9BQU8sR0FBRyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVM7WUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJQSwwQkFBWSxFQUFFLENBQUM7S0FDcEQsQ0FBQztJQUNGLHFCQUFxQixDQUFDLElBQUksR0FBRyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO1FBQ3ZELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hDLENBQUM7SUFDRixxQkFBcUIsQ0FBQyxjQUFjLEdBQUcsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFO1FBQzFELE9BQU8sS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7S0FDN0IsQ0FBQztJQUNGLE9BQU8scUJBQXFCLENBQUM7Q0FDaEMsRUFBRSxDQUFDLENBQUMsQUFDTCxBQUFpQyxBQUNqQzs7QUNyQkEsSUFBSSxpQkFBaUIsaUJBQWlCLENBQUMsWUFBWTtJQUMvQyxTQUFTLGlCQUFpQixHQUFHO0tBQzVCO0lBQ0QsaUJBQWlCLENBQUMsY0FBYyxHQUFHLFVBQVUsS0FBSyxFQUFFO1FBQ2hELE9BQU8sQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1RCxDQUFDO0lBQ0YsaUJBQWlCLENBQUMsVUFBVSxHQUFHLFVBQVUsS0FBSyxFQUFFO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ25FLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuQyxDQUFDO0lBQ0YsaUJBQWlCLENBQUMsZUFBZSxHQUFHLFlBQVk7UUFDNUMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDN0IsT0FBTyxFQUFFO2dCQUNMLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixZQUFZLEVBQUUsS0FBSztnQkFDbkIsS0FBSyxFQUFFLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRTtvQkFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQ3pCO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixLQUFLLEVBQUUsVUFBVSxHQUFHLEVBQUU7b0JBQ2xCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQzVFO2FBQ0o7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixLQUFLLEVBQUUsVUFBVSxHQUFHLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO3dCQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDeEI7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSixVQUFVLEVBQUUsS0FBSztnQkFDakIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLEdBQUcsRUFBRSxZQUFZO29CQUNiLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQ25DO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztLQUNsQixDQUFDO0lBQ0YsT0FBTyxpQkFBaUIsQ0FBQztDQUM1QixFQUFFLENBQUMsQ0FBQyxBQUNMLEFBQTZCLEFBQzdCOztBQ2hEQSxJQUFJLE1BQU0sR0FBRyxDQUFDQyxJQUFFLEdBQUcsRUFBRSxFQUFFQSxJQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRUEsSUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUVBLElBQUUsQ0FBQyxDQUFDO0FBQzdFLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzlGLElBQUksZ0JBQWdCLGlCQUFpQixDQUFDLFlBQVk7SUFDOUMsU0FBUyxnQkFBZ0IsR0FBRztLQUMzQjtJQUNELGdCQUFnQixDQUFDLEtBQUssR0FBRyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNsRCxDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLFVBQVUsS0FBSyxFQUFFLElBQUksRUFBRTtRQUMvQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2xGLENBQUM7SUFDRixnQkFBZ0IsQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUU7UUFDMUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUk7WUFDQSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxHQUFHLEVBQUU7WUFDUixPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDZixDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLFVBQVUsS0FBSyxFQUFFLElBQUksRUFBRTtRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNwQyxPQUFPO1FBQ1gsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNoQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRDthQUNJLElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzVCLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2xEO0tBQ0osQ0FBQztJQUNGLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxVQUFVLEtBQUssRUFBRTtRQUN6QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQzthQUM1QyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUU7WUFDekIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRCxDQUFDLENBQUM7S0FDTixDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLFVBQVUsS0FBSyxFQUFFLElBQUksRUFBRTtRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqRCxDQUFDO0lBQ0YsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFVBQVUsS0FBSyxFQUFFO1FBQzNDLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztZQUM5QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBRS9CLE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xELENBQUM7SUFDRixnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsVUFBVSxLQUFLLEVBQUU7UUFDNUMsSUFBSSxPQUFPLENBQUM7UUFDWixRQUFRLEtBQUs7WUFDVCxLQUFLLE9BQU8sQ0FBQyxLQUFLO2dCQUNkLE9BQU8sR0FBRyxZQUFZLENBQUM7Z0JBQ3ZCLE1BQU07WUFDVixLQUFLLE9BQU8sQ0FBQyxPQUFPO2dCQUNoQixPQUFPLEdBQUcsY0FBYyxDQUFDO2dCQUN6QixNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUMzQztRQUNELE9BQU8sT0FBTyxDQUFDO0tBQ2xCLENBQUM7SUFDRixnQkFBZ0IsQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLEtBQUssRUFBRTtRQUNuRCxJQUFJLE9BQU8sbUJBQW1CLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUztZQUMvQyxPQUFPLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxPQUFPLENBQUM7UUFDaEMsSUFBSTtZQUNBLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUM3QixPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN0Qzs7Z0JBRUcsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUMzQjtRQUNELE9BQU8sQ0FBQyxFQUFFO1lBQ04sV0FBVyxHQUFHLEtBQUssQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxXQUFXO1lBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsMEVBQTBFLENBQUMsQ0FBQztRQUNwSCxPQUFPLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQztLQUNuRCxDQUFDO0lBQ0YsT0FBTyxnQkFBZ0IsQ0FBQztDQUMzQixFQUFFLENBQUMsQ0FBQztBQUNMLEFBQ0EsSUFBSUEsSUFBRTtJQUFFLEVBQUUsQ0FBQyxBQUNYOztBQ3BHQSxJQUFJLGlCQUFpQixpQkFBaUIsQ0FBQyxZQUFZO0lBQy9DLFNBQVMsaUJBQWlCLENBQUMsS0FBSyxFQUFFO1FBQzlCLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxFQUFFLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3RCO0lBQ0QsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUU7UUFDdEQsSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNuRCxDQUFDO0lBQ0YsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxVQUFVLEdBQUcsRUFBRTtRQUNsRCxJQUFJLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN0RCxDQUFDO0lBQ0YsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsRUFBRTtRQUMvQyxJQUFJLEdBQUc7WUFDSCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7WUFFakUsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3QyxDQUFDO0lBQ0YsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUFVLEdBQUcsRUFBRTtRQUNqRCxJQUFJLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsT0FBTyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMxRCxDQUFDO0lBQ0YsT0FBTyxpQkFBaUIsQ0FBQztDQUM1QixFQUFFLENBQUMsQ0FBQyxBQUNMLEFBQTZCLEFBQzdCOztBQzVCQSxJQUFJLFNBQVMsR0FBRyxDQUFDQyxTQUFJLElBQUlBLFNBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVk7SUFDckQsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7UUFDckMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNuQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDeEYsQ0FBQztDQUNMLENBQUMsRUFBRSxDQUFDO0FBQ0wsQUFDQSxBQUNBLEFBQ0EsSUFBSSxtQkFBbUIsaUJBQWlCLENBQUMsVUFBVSxNQUFNLEVBQUU7SUFDdkQsU0FBUyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLFNBQVMsbUJBQW1CLEdBQUc7UUFDM0IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDO0tBQ25EO0lBQ0QsT0FBTyxtQkFBbUIsQ0FBQztDQUM5QixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxBQUN0QixBQUErQixBQUMvQjs7QUNyQkEsSUFBSUMsV0FBUyxHQUFHLENBQUNELFNBQUksSUFBSUEsU0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWTtJQUNyRCxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztRQUNyQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQy9FLE9BQU8sVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ25CLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN4RixDQUFDO0NBQ0wsQ0FBQyxFQUFFLENBQUM7QUFDTCxBQUNBLEFBQ0EsQUFDQSxJQUFJLHFCQUFxQixpQkFBaUIsQ0FBQyxVQUFVLE1BQU0sRUFBRTtJQUN6REMsV0FBUyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLFNBQVMscUJBQXFCLEdBQUc7UUFDN0IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDO0tBQ3JEO0lBQ0QsT0FBTyxxQkFBcUIsQ0FBQztDQUNoQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxBQUN0QixBQUFpQyxBQUNqQzs7QUNwQkEsSUFBSSxnQkFBZ0IsaUJBQWlCLENBQUMsWUFBWTtJQUM5QyxTQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtRQUM5QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDL0I7UUFDRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDckM7UUFDRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FDN0M7S0FDSjtJQUNELE9BQU8sZ0JBQWdCLENBQUM7Q0FDM0IsRUFBRSxDQUFDLENBQUMsQUFDTCxBQUE0QixBQUM1Qjs7QUNkTyxTQUFTLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtJQUNyRCxJQUFJLFlBQVksS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRTtJQUNyRCxPQUFPLFVBQVUsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUNqQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQ2pGLENBQUM7Q0FDTDtBQUNELEFBQU8sU0FBUyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFO0lBQ2xGLElBQUksWUFBWSxLQUFLLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFO0lBQ3JELElBQUksR0FBRyxHQUFHLE9BQU8sSUFBSSxHQUFHLENBQUM7SUFDekIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQ3RDLEdBQUcsRUFBRSxZQUFZO1lBQ2IsSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRDtRQUNELEdBQUcsRUFBRSxVQUFVLEtBQUssRUFBRTtZQUNsQixJQUFJLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNuQixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QztLQUNKLENBQUMsQ0FBQztJQUNILElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUk7UUFDM0IsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztDQUN6QyxBQUNEOztBQ3ZCTyxTQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0lBQ2hELElBQUksWUFBWSxLQUFLLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFO0lBQ3JELE9BQU8sVUFBVSxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQ2pDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDakYsQ0FBQztDQUNMLEFBQ0QsQUFBQyxBQUNEOztBQ1BPLFNBQVMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7SUFDbEQsSUFBSSxZQUFZLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUU7SUFDckQsT0FBTyxVQUFVLGFBQWEsRUFBRSxHQUFHLEVBQUU7UUFDakMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztLQUNuRixDQUFDO0NBQ0wsQUFDRCxBQUFDLEFBQ0Q7O0FDQ08sSUFBSSxpQkFBaUIsR0FBRyxJQUFJQyw0QkFBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDdkUsSUFBSSxhQUFhLGlCQUFpQixDQUFDLFlBQVk7SUFDM0MsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLE1BQU0sRUFBRTtZQUNSLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUQsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDOUI7SUFDRCxhQUFhLENBQUMsT0FBTyxHQUFHLFVBQVUsTUFBTSxFQUFFO1FBQ3RDLE9BQU87WUFDSCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsUUFBUSxFQUFFLE1BQU07aUJBQ25CO2dCQUNEO29CQUNJLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixJQUFJLEVBQUU7d0JBQ0YsaUJBQWlCO3FCQUNwQjtpQkFDSjthQUNKO1NBQ0osQ0FBQztLQUNMLENBQUM7SUFDRixhQUFhLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLFlBQVk7UUFDdEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQy9CLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxLQUFLLEVBQUU7Z0JBQ2hELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWTtvQkFDaEMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsS0FBSyxLQUFLLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDNUYsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hELENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOO0tBQ0osQ0FBQztJQUNGLE9BQU8sYUFBYSxDQUFDO0NBQ3hCLEVBQUUsQ0FBQyxDQUFDO0FBQ0wsQUFDQSxBQUFPLFNBQVMsYUFBYSxDQUFDLE1BQU0sRUFBRTtJQUNsQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDdkM7QUFDRCxBQUFPLFNBQVMsU0FBUyxDQUFDLEVBQUUsRUFBRTtJQUMxQixJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssS0FBSyxDQUFDLEdBQUc7UUFDckIsYUFBYSxFQUFFLHNCQUFzQjtRQUNyQyxNQUFNLEVBQUUsT0FBTztRQUNmLFNBQVMsRUFBRSxpQkFBaUI7S0FDL0IsR0FBRyxFQUFFLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7O0lBRXZGLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUhBQW1ILENBQUMsQ0FBQztJQUNsSSxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUN0RCxBQUNELDs7Ozs7Ozs7Ozs7OzssOzssOzsifQ==
