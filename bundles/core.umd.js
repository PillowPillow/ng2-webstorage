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
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        this.getStorage(sType).setItem(sKey, value);
        CACHED[sType][sKey] = value;
        StorageObserverHelper.emit(sType, sKey, value);
    };
    WebStorageHelper.retrieve = function (sType, sKey) {
        if (sKey in CACHED[sType])
            return CACHED[sType][sKey];
        var value = this.retrieveFromStorage(sType, sKey);
        if (value !== null)
            CACHED[sType][sKey] = value;
        return value;
    };
    WebStorageHelper.retrieveFromStorage = function (sType, sKey) {
        var data = this.getStorage(sType).getItem(sKey);
        try {
            var parsedData = JSON.parse(data);
            if (parsedData && typeof parsedData === "object") {
                return parsedData;
            }
        }
        catch (err) {
            return data;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS51bWQuanMiLCJzb3VyY2VzIjpbIi4uL2Rpc3QvZW51bXMvc3RvcmFnZS5qcyIsIi4uL2Rpc3QvY29uc3RhbnRzL2xpYi5qcyIsIi4uL2Rpc3QvaGVscGVycy9rZXlTdG9yYWdlLmpzIiwiLi4vZGlzdC9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlci5qcyIsIi4uL2Rpc3QvaGVscGVycy9tb2NrU3RvcmFnZS5qcyIsIi4uL2Rpc3QvaGVscGVycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy9sb2NhbFN0b3JhZ2UuanMiLCIuLi9kaXN0L3NlcnZpY2VzL3Nlc3Npb25TdG9yYWdlLmpzIiwiLi4vZGlzdC9pbnRlcmZhY2VzL2NvbmZpZy5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9kZWNvcmF0b3JzL2xvY2FsU3RvcmFnZS5qcyIsIi4uL2Rpc3QvZGVjb3JhdG9ycy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL2Rpc3QvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgU1RPUkFHRTtcbihmdW5jdGlvbiAoU1RPUkFHRSkge1xuICAgIFNUT1JBR0VbU1RPUkFHRVtcImxvY2FsXCJdID0gMF0gPSBcImxvY2FsXCI7XG4gICAgU1RPUkFHRVtTVE9SQUdFW1wic2Vzc2lvblwiXSA9IDFdID0gXCJzZXNzaW9uXCI7XG59KShTVE9SQUdFIHx8IChTVE9SQUdFID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xuZXhwb3J0IHZhciBMSUJfS0VZID0gJ25nMi13ZWJzdG9yYWdlJztcbmV4cG9ydCB2YXIgTElCX0tFWV9TRVBBUkFUT1IgPSAnfCc7XG5leHBvcnQgdmFyIExJQl9LRVlfQ0FTRV9TRU5TSVRJVkUgPSBmYWxzZTtcbmV4cG9ydCB2YXIgU1RPUkFHRV9OQU1FUyA9IChfYSA9IHt9LFxuICAgIF9hW1NUT1JBR0UubG9jYWxdID0gJ2xvY2FsJyxcbiAgICBfYVtTVE9SQUdFLnNlc3Npb25dID0gJ3Nlc3Npb24nLFxuICAgIF9hKTtcbnZhciBfYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpYi5qcy5tYXAiLCJpbXBvcnQgeyBMSUJfS0VZLCBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFLCBMSUJfS0VZX1NFUEFSQVRPUiB9IGZyb20gJy4uL2NvbnN0YW50cy9saWInO1xudmFyIENVU1RPTV9MSUJfS0VZID0gTElCX0tFWTtcbnZhciBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IgPSBMSUJfS0VZX1NFUEFSQVRPUjtcbnZhciBDVVNUT01fTElCX0tFWV9DQVNFX1NFTlNJVElWRSA9IExJQl9LRVlfQ0FTRV9TRU5TSVRJVkU7XG5leHBvcnQgZnVuY3Rpb24gaXNNYW5hZ2VkS2V5KHNLZXkpIHtcbiAgICByZXR1cm4gc0tleS5pbmRleE9mKENVU1RPTV9MSUJfS0VZICsgQ1VTVE9NX0xJQl9LRVlfU0VQQVJBVE9SKSA9PT0gMDtcbn1cbnZhciBLZXlTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBLZXlTdG9yYWdlSGVscGVyKCkge1xuICAgIH1cbiAgICBLZXlTdG9yYWdlSGVscGVyLmlzTWFuYWdlZEtleSA9IGZ1bmN0aW9uIChzS2V5KSB7XG4gICAgICAgIHJldHVybiBzS2V5LmluZGV4T2YoQ1VTVE9NX0xJQl9LRVkgKyBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IpID09PSAwO1xuICAgIH07XG4gICAgS2V5U3RvcmFnZUhlbHBlci5yZXRyaWV2ZUtleXNGcm9tU3RvcmFnZSA9IGZ1bmN0aW9uIChzdG9yYWdlKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzdG9yYWdlKS5maWx0ZXIoaXNNYW5hZ2VkS2V5KTtcbiAgICB9O1xuICAgIEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5ID0gZnVuY3Rpb24gKHJhdykge1xuICAgICAgICBpZiAodHlwZW9mIHJhdyAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignYXR0ZW1wdCB0byBnZW5lcmF0ZSBhIHN0b3JhZ2Uga2V5IHdpdGggYSBub24gc3RyaW5nIHZhbHVlJyk7XG4gICAgICAgIHJldHVybiBcIlwiICsgQ1VTVE9NX0xJQl9LRVkgKyBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IgKyB0aGlzLmZvcm1hdEtleShyYXcpO1xuICAgIH07XG4gICAgS2V5U3RvcmFnZUhlbHBlci5mb3JtYXRLZXkgPSBmdW5jdGlvbiAocmF3KSB7XG4gICAgICAgIHZhciBrZXkgPSByYXcudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIENVU1RPTV9MSUJfS0VZX0NBU0VfU0VOU0lUSVZFID8ga2V5IDoga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgfTtcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlQcmVmaXggPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09IHZvaWQgMCkgeyBrZXkgPSBMSUJfS0VZOyB9XG4gICAgICAgIENVU1RPTV9MSUJfS0VZID0ga2V5O1xuICAgIH07XG4gICAgS2V5U3RvcmFnZUhlbHBlci5zZXRDYXNlU2Vuc2l0aXZpdHkgPSBmdW5jdGlvbiAoZW5hYmxlKSB7XG4gICAgICAgIGlmIChlbmFibGUgPT09IHZvaWQgMCkgeyBlbmFibGUgPSBMSUJfS0VZX0NBU0VfU0VOU0lUSVZFOyB9XG4gICAgICAgIENVU1RPTV9MSUJfS0VZX0NBU0VfU0VOU0lUSVZFID0gZW5hYmxlO1xuICAgIH07XG4gICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5U2VwYXJhdG9yID0gZnVuY3Rpb24gKHNlcGFyYXRvcikge1xuICAgICAgICBpZiAoc2VwYXJhdG9yID09PSB2b2lkIDApIHsgc2VwYXJhdG9yID0gTElCX0tFWV9TRVBBUkFUT1I7IH1cbiAgICAgICAgQ1VTVE9NX0xJQl9LRVlfU0VQQVJBVE9SID0gc2VwYXJhdG9yO1xuICAgIH07XG4gICAgcmV0dXJuIEtleVN0b3JhZ2VIZWxwZXI7XG59KCkpO1xuZXhwb3J0IHsgS2V5U3RvcmFnZUhlbHBlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2V5U3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbnZhciBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0b3JhZ2VPYnNlcnZlckhlbHBlcigpIHtcbiAgICB9XG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLm9ic2VydmUgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcbiAgICAgICAgdmFyIG9LZXkgPSB0aGlzLmdlbk9ic2VydmVyS2V5KHNUeXBlLCBzS2V5KTtcbiAgICAgICAgaWYgKG9LZXkgaW4gdGhpcy5vYnNlcnZlcnMpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnNbb0tleV07XG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVyc1tvS2V5XSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB9O1xuICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0ID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgb0tleSA9IHRoaXMuZ2VuT2JzZXJ2ZXJLZXkoc1R5cGUsIHNLZXkpO1xuICAgICAgICBpZiAob0tleSBpbiB0aGlzLm9ic2VydmVycylcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzW29LZXldLmVtaXQodmFsdWUpO1xuICAgIH07XG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmdlbk9ic2VydmVyS2V5ID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XG4gICAgICAgIHJldHVybiBzVHlwZSArICd8JyArIHNLZXk7XG4gICAgfTtcbiAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuaW5pdFN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5zdG9yYWdlSW5pdFN0cmVhbS5lbWl0KHRydWUpO1xuICAgIH07XG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLm9ic2VydmVycyA9IHt9O1xuICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5zdG9yYWdlSW5pdFN0cmVhbSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuc3RvcmFnZUluaXQkID0gU3RvcmFnZU9ic2VydmVySGVscGVyLnN0b3JhZ2VJbml0U3RyZWFtLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHJldHVybiBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXI7XG59KCkpO1xuZXhwb3J0IHsgU3RvcmFnZU9ic2VydmVySGVscGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yYWdlT2JzZXJ2ZXIuanMubWFwIiwidmFyIE1vY2tTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNb2NrU3RvcmFnZUhlbHBlcigpIHtcbiAgICB9XG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgcmV0dXJuICEhfk1vY2tTdG9yYWdlSGVscGVyLnNlY3VyZWRGaWVsZHMuaW5kZXhPZihmaWVsZCk7XG4gICAgfTtcbiAgICBNb2NrU3RvcmFnZUhlbHBlci5nZXRTdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2NrU3RvcmFnZXNbc1R5cGVdKVxuICAgICAgICAgICAgdGhpcy5tb2NrU3RvcmFnZXNbc1R5cGVdID0gTW9ja1N0b3JhZ2VIZWxwZXIuZ2VuZXJhdGVTdG9yYWdlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLm1vY2tTdG9yYWdlc1tzVHlwZV07XG4gICAgfTtcbiAgICBNb2NrU3RvcmFnZUhlbHBlci5nZW5lcmF0ZVN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdG9yYWdlID0ge307XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0b3JhZ2UsIHtcbiAgICAgICAgICAgIHNldEl0ZW06IHtcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFNb2NrU3RvcmFnZUhlbHBlci5pc1NlY3VyZWRGaWVsZChrZXkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJdGVtOiB7XG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFNb2NrU3RvcmFnZUhlbHBlci5pc1NlY3VyZWRGaWVsZChrZXkpID8gdGhpc1trZXldIHx8IG51bGwgOiBudWxsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlSXRlbToge1xuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZW5ndGg6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcykubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xuICAgIH07XG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuc2VjdXJlZEZpZWxkcyA9IFsnc2V0SXRlbScsICdnZXRJdGVtJywgJ3JlbW92ZUl0ZW0nLCAnbGVuZ3RoJ107XG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIubW9ja1N0b3JhZ2VzID0ge307XG4gICAgcmV0dXJuIE1vY2tTdG9yYWdlSGVscGVyO1xufSgpKTtcbmV4cG9ydCB7IE1vY2tTdG9yYWdlSGVscGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2NrU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgfSBmcm9tICcuL3N0b3JhZ2VPYnNlcnZlcic7XG5pbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi9rZXlTdG9yYWdlJztcbmltcG9ydCB7IE1vY2tTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi9tb2NrU3RvcmFnZSc7XG5pbXBvcnQgeyBTVE9SQUdFX05BTUVTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2xpYic7XG52YXIgQ0FDSEVEID0gKF9hID0ge30sIF9hW1NUT1JBR0UubG9jYWxdID0ge30sIF9hW1NUT1JBR0Uuc2Vzc2lvbl0gPSB7fSwgX2EpO1xudmFyIFNUT1JBR0VfQVZBSUxBQklMSVRZID0gKF9iID0ge30sIF9iW1NUT1JBR0UubG9jYWxdID0gbnVsbCwgX2JbU1RPUkFHRS5zZXNzaW9uXSA9IG51bGwsIF9iKTtcbnZhciBXZWJTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXZWJTdG9yYWdlSGVscGVyKCkge1xuICAgIH1cbiAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpLnNldEl0ZW0oc0tleSwgdmFsdWUpO1xuICAgICAgICBDQUNIRURbc1R5cGVdW3NLZXldID0gdmFsdWU7XG4gICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCB2YWx1ZSk7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XG4gICAgICAgIGlmIChzS2V5IGluIENBQ0hFRFtzVHlwZV0pXG4gICAgICAgICAgICByZXR1cm4gQ0FDSEVEW3NUeXBlXVtzS2V5XTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5yZXRyaWV2ZUZyb21TdG9yYWdlKHNUeXBlLCBzS2V5KTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKVxuICAgICAgICAgICAgQ0FDSEVEW3NUeXBlXVtzS2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlRnJvbVN0b3JhZ2UgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpLmdldEl0ZW0oc0tleSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBpZiAocGFyc2VkRGF0YSAmJiB0eXBlb2YgcGFyc2VkRGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWREYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgV2ViU3RvcmFnZUhlbHBlci5yZWZyZXNoID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XG4gICAgICAgIGlmICghS2V5U3RvcmFnZUhlbHBlci5pc01hbmFnZWRLZXkoc0tleSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciB2YWx1ZSA9IFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmVGcm9tU3RvcmFnZShzVHlwZSwgc0tleSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgZGVsZXRlIENBQ0hFRFtzVHlwZV1bc0tleV07XG4gICAgICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdChzVHlwZSwgc0tleSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT09IENBQ0hFRFtzVHlwZV1bc0tleV0pIHtcbiAgICAgICAgICAgIENBQ0hFRFtzVHlwZV1bc0tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFdlYlN0b3JhZ2VIZWxwZXIucmVmcmVzaEFsbCA9IGZ1bmN0aW9uIChzVHlwZSkge1xuICAgICAgICBPYmplY3Qua2V5cyhDQUNIRURbc1R5cGVdKS5mb3JFYWNoKGZ1bmN0aW9uIChzS2V5KSB7IHJldHVybiBXZWJTdG9yYWdlSGVscGVyLnJlZnJlc2goc1R5cGUsIHNLZXkpOyB9KTtcbiAgICB9O1xuICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXJBbGwgPSBmdW5jdGlvbiAoc1R5cGUpIHtcbiAgICAgICAgdmFyIHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpO1xuICAgICAgICBLZXlTdG9yYWdlSGVscGVyLnJldHJpZXZlS2V5c0Zyb21TdG9yYWdlKHN0b3JhZ2UpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoc0tleSkge1xuICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHNLZXkpO1xuICAgICAgICAgICAgZGVsZXRlIENBQ0hFRFtzVHlwZV1bc0tleV07XG4gICAgICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdChzVHlwZSwgc0tleSwgbnVsbCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgV2ViU3RvcmFnZUhlbHBlci5jbGVhciA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xuICAgICAgICB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpLnJlbW92ZUl0ZW0oc0tleSk7XG4gICAgICAgIGRlbGV0ZSBDQUNIRURbc1R5cGVdW3NLZXldO1xuICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdChzVHlwZSwgc0tleSwgbnVsbCk7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlSGVscGVyLmdldFN0b3JhZ2UgPSBmdW5jdGlvbiAoc1R5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9yYWdlQXZhaWxhYmxlKHNUeXBlKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFdTdG9yYWdlKHNUeXBlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIE1vY2tTdG9yYWdlSGVscGVyLmdldFN0b3JhZ2Uoc1R5cGUpO1xuICAgIH07XG4gICAgV2ViU3RvcmFnZUhlbHBlci5nZXRXU3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xuICAgICAgICB2YXIgc3RvcmFnZTtcbiAgICAgICAgc3dpdGNoIChzVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTVE9SQUdFLmxvY2FsOlxuICAgICAgICAgICAgICAgIHN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNUT1JBR0Uuc2Vzc2lvbjpcbiAgICAgICAgICAgICAgICBzdG9yYWdlID0gc2Vzc2lvblN0b3JhZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdpbnZhbGlkIHN0b3JhZ2UgdHlwZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xuICAgIH07XG4gICAgV2ViU3RvcmFnZUhlbHBlci5pc1N0b3JhZ2VBdmFpbGFibGUgPSBmdW5jdGlvbiAoc1R5cGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBTVE9SQUdFX0FWQUlMQUJJTElUWVtzVHlwZV0gPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHJldHVybiBTVE9SQUdFX0FWQUlMQUJJTElUWVtzVHlwZV07XG4gICAgICAgIHZhciBpc0F2YWlsYWJsZSA9IHRydWUsIHN0b3JhZ2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdG9yYWdlID0gdGhpcy5nZXRXU3RvcmFnZShzVHlwZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0b3JhZ2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKCd0ZXN0LXN0b3JhZ2UnLCAnZm9vYmFyJyk7XG4gICAgICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKCd0ZXN0LXN0b3JhZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBpc0F2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpc0F2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNBdmFpbGFibGUpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oU1RPUkFHRV9OQU1FU1tzVHlwZV0gKyBcIiBzdG9yYWdlIHVuYXZhaWxhYmxlLCBOZzJXZWJzdG9yYWdlIHdpbGwgdXNlIGEgZmFsbGJhY2sgc3RyYXRlZ3kgaW5zdGVhZFwiKTtcbiAgICAgICAgcmV0dXJuIFNUT1JBR0VfQVZBSUxBQklMSVRZW3NUeXBlXSA9IGlzQXZhaWxhYmxlO1xuICAgIH07XG4gICAgcmV0dXJuIFdlYlN0b3JhZ2VIZWxwZXI7XG59KCkpO1xuZXhwb3J0IHsgV2ViU3RvcmFnZUhlbHBlciB9O1xudmFyIF9hLCBfYjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYlN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciwgV2ViU3RvcmFnZUhlbHBlciwgU3RvcmFnZU9ic2VydmVySGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9pbmRleCc7XG52YXIgV2ViU3RvcmFnZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdlYlN0b3JhZ2VTZXJ2aWNlKHNUeXBlKSB7XG4gICAgICAgIGlmIChzVHlwZSA9PT0gdm9pZCAwKSB7IHNUeXBlID0gbnVsbDsgfVxuICAgICAgICB0aGlzLnNUeXBlID0gc1R5cGU7XG4gICAgICAgIHRoaXMuc1R5cGUgPSBzVHlwZTtcbiAgICB9XG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLnN0b3JlID0gZnVuY3Rpb24gKHJhdywgdmFsdWUpIHtcbiAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpO1xuICAgICAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JlKHRoaXMuc1R5cGUsIHNLZXksIHZhbHVlKTtcbiAgICB9O1xuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5yZXRyaWV2ZSA9IGZ1bmN0aW9uIChyYXcpIHtcbiAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpO1xuICAgICAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZSh0aGlzLnNUeXBlLCBzS2V5KTtcbiAgICB9O1xuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChyYXcpIHtcbiAgICAgICAgaWYgKHJhdylcbiAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXIodGhpcy5zVHlwZSwgS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXJBbGwodGhpcy5zVHlwZSk7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChyYXcpIHtcbiAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpO1xuICAgICAgICByZXR1cm4gU3RvcmFnZU9ic2VydmVySGVscGVyLm9ic2VydmUodGhpcy5zVHlwZSwgc0tleSk7XG4gICAgfTtcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUuaXNTdG9yYWdlQXZhaWxhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlci5pc1N0b3JhZ2VBdmFpbGFibGUodGhpcy5zVHlwZSk7XG4gICAgfTtcbiAgICByZXR1cm4gV2ViU3RvcmFnZVNlcnZpY2U7XG59KCkpO1xuZXhwb3J0IHsgV2ViU3RvcmFnZVNlcnZpY2UgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYlN0b3JhZ2UuanMubWFwIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBXZWJTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vd2ViU3RvcmFnZSc7XG52YXIgTG9jYWxTdG9yYWdlU2VydmljZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKExvY2FsU3RvcmFnZVNlcnZpY2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTG9jYWxTdG9yYWdlU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFNUT1JBR0UubG9jYWwpIHx8IHRoaXM7XG4gICAgfVxuICAgIExvY2FsU3RvcmFnZVNlcnZpY2UuZGVjb3JhdG9ycyA9IFtcbiAgICAgICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG4gICAgXTtcbiAgICAvKiogQG5vY29sbGFwc2UgKi9cbiAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XG4gICAgcmV0dXJuIExvY2FsU3RvcmFnZVNlcnZpY2U7XG59KFdlYlN0b3JhZ2VTZXJ2aWNlKSk7XG5leHBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2NhbFN0b3JhZ2UuanMubWFwIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBXZWJTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vd2ViU3RvcmFnZSc7XG52YXIgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlc3Npb25TdG9yYWdlU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFNUT1JBR0Uuc2Vzc2lvbikgfHwgdGhpcztcbiAgICB9XG4gICAgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLmRlY29yYXRvcnMgPSBbXG4gICAgICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuICAgIF07XG4gICAgLyoqIEBub2NvbGxhcHNlICovXG4gICAgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XG4gICAgcmV0dXJuIFNlc3Npb25TdG9yYWdlU2VydmljZTtcbn0oV2ViU3RvcmFnZVNlcnZpY2UpKTtcbmV4cG9ydCB7IFNlc3Npb25TdG9yYWdlU2VydmljZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Vzc2lvblN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgTElCX0tFWSwgTElCX0tFWV9DQVNFX1NFTlNJVElWRSwgTElCX0tFWV9TRVBBUkFUT1IgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcbnZhciBXZWJzdG9yYWdlQ29uZmlnID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXZWJzdG9yYWdlQ29uZmlnKGNvbmZpZykge1xuICAgICAgICB0aGlzLnByZWZpeCA9IExJQl9LRVk7XG4gICAgICAgIHRoaXMuc2VwYXJhdG9yID0gTElCX0tFWV9TRVBBUkFUT1I7XG4gICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZSA9IExJQl9LRVlfQ0FTRV9TRU5TSVRJVkU7XG4gICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLnByZWZpeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeCA9IGNvbmZpZy5wcmVmaXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuc2VwYXJhdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VwYXJhdG9yID0gY29uZmlnLnNlcGFyYXRvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5jYXNlU2Vuc2l0aXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZSA9IGNvbmZpZy5jYXNlU2Vuc2l0aXZlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBXZWJzdG9yYWdlQ29uZmlnO1xufSgpKTtcbmV4cG9ydCB7IFdlYnN0b3JhZ2VDb25maWcgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJpbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyLCBXZWJTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9pbmRleCc7XG5pbXBvcnQgeyBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlcic7XG5leHBvcnQgZnVuY3Rpb24gV2ViU3RvcmFnZSh3ZWJTS2V5LCBzVHlwZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdm9pZCAwKSB7IGRlZmF1bHRWYWx1ZSA9IG51bGw7IH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldGVkQ2xhc3MsIHJhdykge1xuICAgICAgICBXZWJTdG9yYWdlRGVjb3JhdG9yKHdlYlNLZXksIHNUeXBlLCB0YXJnZXRlZENsYXNzLCByYXcsIGRlZmF1bHRWYWx1ZSk7XG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBXZWJTdG9yYWdlRGVjb3JhdG9yKHdlYlNLZXksIHNUeXBlLCB0YXJnZXRlZENsYXNzLCByYXcsIGRlZmF1bHRWYWx1ZSkge1xuICAgIHZhciBrZXkgPSB3ZWJTS2V5IHx8IHJhdztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0ZWRDbGFzcywgcmF3LCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmUoc1R5cGUsIHNLZXkpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShrZXkpO1xuICAgICAgICAgICAgdGhpc1tzS2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5zdG9yZShzVHlwZSwgc0tleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRhcmdldGVkQ2xhc3NbcmF3XSA9PT0gbnVsbCAmJiBkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgc3ViXzEgPSBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuc3RvcmFnZUluaXQkLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0YXJnZXRlZENsYXNzW3Jhd10gPSBkZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICBzdWJfMS51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IFdlYlN0b3JhZ2VEZWNvcmF0b3IgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xuZXhwb3J0IGZ1bmN0aW9uIExvY2FsU3RvcmFnZSh3ZWJTS2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldGVkQ2xhc3MsIHJhdykge1xuICAgICAgICBXZWJTdG9yYWdlRGVjb3JhdG9yKHdlYlNLZXksIFNUT1JBR0UubG9jYWwsIHRhcmdldGVkQ2xhc3MsIHJhdywgZGVmYXVsdFZhbHVlKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9jYWxTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IFdlYlN0b3JhZ2VEZWNvcmF0b3IgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xuZXhwb3J0IGZ1bmN0aW9uIFNlc3Npb25TdG9yYWdlKHdlYlNLZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0ZWRDbGFzcywgcmF3KSB7XG4gICAgICAgIFdlYlN0b3JhZ2VEZWNvcmF0b3Iod2ViU0tleSwgU1RPUkFHRS5zZXNzaW9uLCB0YXJnZXRlZENsYXNzLCByYXcsIGRlZmF1bHRWYWx1ZSk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlc3Npb25TdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIE5nTW9kdWxlLCBOZ1pvbmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi9lbnVtcy9zdG9yYWdlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UsIFNlc3Npb25TdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZUhlbHBlciB9IGZyb20gJy4vaGVscGVycy93ZWJTdG9yYWdlJztcbmltcG9ydCB7IFdlYnN0b3JhZ2VDb25maWcgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZmlnJztcbmltcG9ydCB7IEtleVN0b3JhZ2VIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMva2V5U3RvcmFnZSc7XG5pbXBvcnQgeyBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvc3RvcmFnZU9ic2VydmVyJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2RlY29yYXRvcnMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XG5leHBvcnQgdmFyIFdFQlNUT1JBR0VfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuKCdXRUJTVE9SQUdFX0NPTkZJRycpO1xudmFyIE5nMldlYnN0b3JhZ2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5nMldlYnN0b3JhZ2Uobmdab25lLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUgPSBuZ1pvbmU7XG4gICAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVByZWZpeChjb25maWcucHJlZml4KTtcbiAgICAgICAgICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0U3RvcmFnZUtleVNlcGFyYXRvcihjb25maWcuc2VwYXJhdG9yKTtcbiAgICAgICAgICAgIEtleVN0b3JhZ2VIZWxwZXIuc2V0Q2FzZVNlbnNpdGl2aXR5KGNvbmZpZy5jYXNlU2Vuc2l0aXZlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRTdG9yYWdlTGlzdGVuZXIoKTtcbiAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmluaXRTdG9yYWdlKCk7XG4gICAgfVxuICAgIE5nMldlYnN0b3JhZ2UuZm9yUm9vdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBOZzJXZWJzdG9yYWdlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBXRUJTVE9SQUdFX0NPTkZJRyxcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBXZWJzdG9yYWdlQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiBwcm92aWRlQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBXRUJTVE9SQUdFX0NPTkZJR1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTmcyV2Vic3RvcmFnZS5wcm90b3R5cGUuaW5pdFN0b3JhZ2VMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5uZ1pvbmUucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JhZ2UgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UgPT09IGV2ZW50LnN0b3JhZ2VBcmVhID8gU1RPUkFHRS5zZXNzaW9uIDogU1RPUkFHRS5sb2NhbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIucmVmcmVzaEFsbChzdG9yYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5yZWZyZXNoKHN0b3JhZ2UsIGV2ZW50LmtleSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTmcyV2Vic3RvcmFnZS5kZWNvcmF0b3JzID0gW1xuICAgICAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xuICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnM6IFtTZXNzaW9uU3RvcmFnZVNlcnZpY2UsIExvY2FsU3RvcmFnZVNlcnZpY2VdLFxuICAgICAgICAgICAgICAgICAgICBpbXBvcnRzOiBbXVxuICAgICAgICAgICAgICAgIH0sXSB9LFxuICAgIF07XG4gICAgLyoqIEBub2NvbGxhcHNlICovXG4gICAgTmcyV2Vic3RvcmFnZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICAgICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG4gICAgICAgIHsgdHlwZTogV2Vic3RvcmFnZUNvbmZpZywgZGVjb3JhdG9yczogW3sgdHlwZTogT3B0aW9uYWwgfSwgeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtXZWJzdG9yYWdlQ29uZmlnLF0gfSxdIH0sXG4gICAgXTsgfTtcbiAgICByZXR1cm4gTmcyV2Vic3RvcmFnZTtcbn0oKSk7XG5leHBvcnQgeyBOZzJXZWJzdG9yYWdlIH07XG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNvbmZpZyhjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFdlYnN0b3JhZ2VDb25maWcoY29uZmlnKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXAiXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiX2EiLCJ0aGlzIiwiSW5qZWN0YWJsZSIsIl9fZXh0ZW5kcyIsIkluamVjdGlvblRva2VuIiwiTmdNb2R1bGUiLCJOZ1pvbmUiLCJPcHRpb25hbCIsIkluamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sSUFBSSxPQUFPLENBQUM7QUFDbkIsQ0FBQyxVQUFVLE9BQU8sRUFBRTtJQUNoQixPQUFP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
