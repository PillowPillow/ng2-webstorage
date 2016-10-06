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
        var data = null;
        try {
            data = JSON.parse(this.getStorage(sType).getItem(sKey));
        }
        catch (err) {
            console.warn("invalid value for " + sKey);
        }
        return this.cached[sType][sKey] = data;
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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LocalStorageService = (function (_super) {
    __extends(LocalStorageService, _super);
    function LocalStorageService() {
        _super.call(this, STORAGE.local);
    }
    LocalStorageService = __decorate$1([
        _angular_core.Injectable()
    ], LocalStorageService);
    return LocalStorageService;
}(WebStorageService));

var __extends$1 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SessionStorageService = (function (_super) {
    __extends$1(SessionStorageService, _super);
    function SessionStorageService() {
        _super.call(this, STORAGE.session);
    }
    SessionStorageService = __decorate$2([
        _angular_core.Injectable()
    ], SessionStorageService);
    return SessionStorageService;
}(WebStorageService));

function WebStorage(webSKey, sType) {
    return function (targetedClass, raw) {
        var key = webSKey || raw, sKey = KeyStorageHelper.genKey(key);
        Object.defineProperty(targetedClass, raw, {
            get: function () {
                return WebStorageHelper.retrieve(sType, sKey);
            },
            set: function (value) {
                this[sKey] = value;
                WebStorageHelper.store(sType, sKey, value);
            }
        });
    };
}

function LocalStorage(webstorageKey) {
    return WebStorage(webstorageKey, STORAGE.local);
}

function SessionStorage(webstorageKey) {
    return WebStorage(webstorageKey, STORAGE.session);
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Ng2Webstorage = (function () {
    function Ng2Webstorage() {
    }
    Ng2Webstorage = __decorate([
        _angular_core.NgModule({
            declarations: [],
            providers: [SessionStorageService, LocalStorageService],
            imports: []
        })
    ], Ng2Webstorage);
    return Ng2Webstorage;
}());

// # sourceMappingURL=index.js.map

exports.Ng2Webstorage = Ng2Webstorage;
exports.LocalStorage = LocalStorage;
exports.SessionStorage = SessionStorage;
exports.WebStorage = WebStorage;
exports.WebStorageService = WebStorageService;
exports.LocalStorageService = LocalStorageService;
exports.SessionStorageService = SessionStorageService;
exports.KeyStorageHelper = KeyStorageHelper;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS51bWQuanMiLCJzb3VyY2VzIjpbIi4uL2Rpc3QvZW51bXMvc3RvcmFnZS5qcyIsIi4uL2Rpc3QvY29uc3RhbnRzL2xpYi5qcyIsIi4uL2Rpc3QvaGVscGVycy9rZXlTdG9yYWdlLmpzIiwiLi4vZGlzdC9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlci5qcyIsIi4uL2Rpc3QvaGVscGVycy9tb2NrU3RvcmFnZS5qcyIsIi4uL2Rpc3QvaGVscGVycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy9sb2NhbFN0b3JhZ2UuanMiLCIuLi9kaXN0L3NlcnZpY2VzL3Nlc3Npb25TdG9yYWdlLmpzIiwiLi4vZGlzdC9kZWNvcmF0b3JzL3dlYlN0b3JhZ2UuanMiLCIuLi9kaXN0L2RlY29yYXRvcnMvbG9jYWxTdG9yYWdlLmpzIiwiLi4vZGlzdC9kZWNvcmF0b3JzL3Nlc3Npb25TdG9yYWdlLmpzIiwiLi4vZGlzdC9hcHAuanMiLCIuLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIFNUT1JBR0U7XHJcbihmdW5jdGlvbiAoU1RPUkFHRSkge1xyXG4gICAgU1RPUkFHRVtTVE9SQUdFW1wibG9jYWxcIl0gPSAwXSA9IFwibG9jYWxcIjtcclxuICAgIFNUT1JBR0VbU1RPUkFHRVtcInNlc3Npb25cIl0gPSAxXSA9IFwic2Vzc2lvblwiO1xyXG59KShTVE9SQUdFIHx8IChTVE9SQUdFID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XHJcbmV4cG9ydCB2YXIgTElCX0tFWSA9ICduZzItd2Vic3RvcmFnZSc7XHJcbmV4cG9ydCB2YXIgTElCX0tFWV9TRVBBUkFUT1IgPSAnfCc7XHJcbmV4cG9ydCB2YXIgU1RPUkFHRV9OQU1FUyA9IChfYSA9IHt9LFxyXG4gICAgX2FbU1RPUkFHRS5sb2NhbF0gPSAnbG9jYWwnLFxyXG4gICAgX2FbU1RPUkFHRS5zZXNzaW9uXSA9ICdzZXNzaW9uJyxcclxuICAgIF9hXHJcbik7XHJcbnZhciBfYTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGliLmpzLm1hcCIsImltcG9ydCB7IExJQl9LRVksIExJQl9LRVlfU0VQQVJBVE9SIH0gZnJvbSAnLi4vY29uc3RhbnRzL2xpYic7XHJcbnZhciBDVVNUT01fTElCX0tFWSA9IExJQl9LRVk7XHJcbnZhciBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IgPSBMSUJfS0VZX1NFUEFSQVRPUjtcclxuZXhwb3J0IHZhciBLZXlTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEtleVN0b3JhZ2VIZWxwZXIoKSB7XHJcbiAgICB9XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnJldHJpZXZlS2V5c0Zyb21TdG9yYWdlID0gZnVuY3Rpb24gKHN0b3JhZ2UpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoc3RvcmFnZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleS5pbmRleE9mKENVU1RPTV9MSUJfS0VZKSA9PT0gMDsgfSk7XHJcbiAgICB9O1xyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkgPSBmdW5jdGlvbiAocmF3KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByYXcgIT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignYXR0ZW1wdCB0byBnZW5lcmF0ZSBhIHN0b3JhZ2Uga2V5IHdpdGggYSBub24gc3RyaW5nIHZhbHVlJyk7XHJcbiAgICAgICAgcmV0dXJuIFwiXCIgKyBDVVNUT01fTElCX0tFWSArIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUiArIHJhdy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9O1xyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5UHJlZml4ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGlmIChrZXkgPT09IHZvaWQgMCkgeyBrZXkgPSBMSUJfS0VZOyB9XHJcbiAgICAgICAgQ1VTVE9NX0xJQl9LRVkgPSBrZXk7XHJcbiAgICB9O1xyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5U2VwYXJhdG9yID0gZnVuY3Rpb24gKHNlcGFyYXRvcikge1xyXG4gICAgICAgIGlmIChzZXBhcmF0b3IgPT09IHZvaWQgMCkgeyBzZXBhcmF0b3IgPSBMSUJfS0VZX1NFUEFSQVRPUjsgfVxyXG4gICAgICAgIENVU1RPTV9MSUJfS0VZX1NFUEFSQVRPUiA9IHNlcGFyYXRvcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gS2V5U3RvcmFnZUhlbHBlcjtcclxufSgpKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2V5U3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuZXhwb3J0IHZhciBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3RvcmFnZU9ic2VydmVySGVscGVyKCkge1xyXG4gICAgfVxyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLm9ic2VydmUgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcclxuICAgICAgICB2YXIgb0tleSA9IHRoaXMuZ2VuT2JzZXJ2ZXJLZXkoc1R5cGUsIHNLZXkpO1xyXG4gICAgICAgIGlmIChvS2V5IGluIHRoaXMub2JzZXJ2ZXJzKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnNbb0tleV07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2ZXJzW29LZXldID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgfTtcclxuICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0ID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBvS2V5ID0gdGhpcy5nZW5PYnNlcnZlcktleShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgaWYgKG9LZXkgaW4gdGhpcy5vYnNlcnZlcnMpXHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzW29LZXldLmVtaXQodmFsdWUpO1xyXG4gICAgfTtcclxuICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5nZW5PYnNlcnZlcktleSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xyXG4gICAgICAgIHJldHVybiBzVHlwZSArIFwifFwiICsgc0tleTtcclxuICAgIH07XHJcbiAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIub2JzZXJ2ZXJzID0ge307XHJcbiAgICByZXR1cm4gU3RvcmFnZU9ic2VydmVySGVscGVyO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yYWdlT2JzZXJ2ZXIuanMubWFwIiwiZXhwb3J0IHZhciBNb2NrU3RvcmFnZUhlbHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBNb2NrU3RvcmFnZUhlbHBlcigpIHtcclxuICAgIH1cclxuICAgIE1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkID0gZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgcmV0dXJuICEhfk1vY2tTdG9yYWdlSGVscGVyLnNlY3VyZWRGaWVsZHMuaW5kZXhPZihmaWVsZCk7XHJcbiAgICB9O1xyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuZ2V0U3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5tb2NrU3RvcmFnZXNbc1R5cGVdKVxyXG4gICAgICAgICAgICB0aGlzLm1vY2tTdG9yYWdlc1tzVHlwZV0gPSBNb2NrU3RvcmFnZUhlbHBlci5nZW5lcmF0ZVN0b3JhZ2UoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2NrU3RvcmFnZXNbc1R5cGVdO1xyXG4gICAgfTtcclxuICAgIE1vY2tTdG9yYWdlSGVscGVyLmdlbmVyYXRlU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3RvcmFnZSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0b3JhZ2UsIHtcclxuICAgICAgICAgICAgc2V0SXRlbToge1xyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFNb2NrU3RvcmFnZUhlbHBlci5pc1NlY3VyZWRGaWVsZChrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldEl0ZW06IHtcclxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFNb2NrU3RvcmFnZUhlbHBlci5pc1NlY3VyZWRGaWVsZChrZXkpID8gdGhpc1trZXldIHx8IG51bGwgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVtb3ZlSXRlbToge1xyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIU1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkKGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZW5ndGg6IHtcclxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZTtcclxuICAgIH07XHJcbiAgICBNb2NrU3RvcmFnZUhlbHBlci5zZWN1cmVkRmllbGRzID0gWydzZXRJdGVtJywgJ2dldEl0ZW0nLCAncmVtb3ZlSXRlbScsICdsZW5ndGgnXTtcclxuICAgIE1vY2tTdG9yYWdlSGVscGVyLm1vY2tTdG9yYWdlcyA9IHt9O1xyXG4gICAgcmV0dXJuIE1vY2tTdG9yYWdlSGVscGVyO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2NrU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VPYnNlcnZlckhlbHBlciB9IGZyb20gJy4vc3RvcmFnZU9ic2VydmVyJztcclxuaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciB9IGZyb20gJy4va2V5U3RvcmFnZSc7XHJcbmltcG9ydCB7IE1vY2tTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi9tb2NrU3RvcmFnZSc7XHJcbmltcG9ydCB7IFNUT1JBR0VfTkFNRVMgfSBmcm9tICcuLi9jb25zdGFudHMvbGliJztcclxuZXhwb3J0IHZhciBXZWJTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYlN0b3JhZ2VIZWxwZXIoKSB7XHJcbiAgICB9XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0U3RvcmFnZShzVHlwZSkuc2V0SXRlbShzS2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCB2YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlZFtzVHlwZV1bc0tleV0pXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZFtzVHlwZV1bc0tleV07XHJcbiAgICAgICAgdmFyIGRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMuZ2V0U3RvcmFnZShzVHlwZSkuZ2V0SXRlbShzS2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiaW52YWxpZCB2YWx1ZSBmb3IgXCIgKyBzS2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XSA9IGRhdGE7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5jbGVhckFsbCA9IGZ1bmN0aW9uIChzVHlwZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpO1xyXG4gICAgICAgIEtleVN0b3JhZ2VIZWxwZXIucmV0cmlldmVLZXlzRnJvbVN0b3JhZ2Uoc3RvcmFnZSlcclxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHNLZXkpIHtcclxuICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHNLZXkpO1xyXG4gICAgICAgICAgICBkZWxldGUgX3RoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XTtcclxuICAgICAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXIgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcclxuICAgICAgICB0aGlzLmdldFN0b3JhZ2Uoc1R5cGUpLnJlbW92ZUl0ZW0oc0tleSk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XTtcclxuICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdChzVHlwZSwgc0tleSwgbnVsbCk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5nZXRTdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTdG9yYWdlQXZhaWxhYmxlKHNUeXBlKSA/IHRoaXMuZ2V0V1N0b3JhZ2Uoc1R5cGUpIDogTW9ja1N0b3JhZ2VIZWxwZXIuZ2V0U3RvcmFnZShzVHlwZSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5nZXRXU3RvcmFnZSA9IGZ1bmN0aW9uIChzVHlwZSkge1xyXG4gICAgICAgIHZhciBzdG9yYWdlO1xyXG4gICAgICAgIHN3aXRjaCAoc1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTVE9SQUdFLmxvY2FsOlxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNUT1JBR0Uuc2Vzc2lvbjpcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ2ludmFsaWQgc3RvcmFnZSB0eXBlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuaXNTdG9yYWdlQXZhaWxhYmxlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN0b3JhZ2VBdmFpbGFiaWxpdHlbc1R5cGVdID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VBdmFpbGFiaWxpdHlbc1R5cGVdO1xyXG4gICAgICAgIHZhciBpc0F2YWlsYWJsZSA9IHRydWUsIHN0b3JhZ2UgPSB0aGlzLmdldFdTdG9yYWdlKHNUeXBlKTtcclxuICAgICAgICBpZiAodHlwZW9mIHN0b3JhZ2UgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0oJ3Rlc3Qtc3RvcmFnZScsICdmb29iYXInKTtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSgndGVzdC1zdG9yYWdlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGlzQXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBpc0F2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghaXNBdmFpbGFibGUpXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihTVE9SQUdFX05BTUVTW3NUeXBlXSArIFwiIHN0b3JhZ2UgdW5hdmFpbGFibGUsIE5nMldlYnN0b3JhZ2Ugd2lsbCB1c2UgYSBmYWxsYmFjayBzdHJhdGVneSBpbnN0ZWFkXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VBdmFpbGFiaWxpdHlbc1R5cGVdID0gaXNBdmFpbGFibGU7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5jYWNoZWQgPSAoX2EgPSB7fSwgX2FbU1RPUkFHRS5sb2NhbF0gPSB7fSwgX2FbU1RPUkFHRS5zZXNzaW9uXSA9IHt9LCBfYSk7XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JhZ2VBdmFpbGFiaWxpdHkgPSAoX2IgPSB7fSwgX2JbU1RPUkFHRS5sb2NhbF0gPSBudWxsLCBfYltTVE9SQUdFLnNlc3Npb25dID0gbnVsbCwgX2IpO1xyXG4gICAgcmV0dXJuIFdlYlN0b3JhZ2VIZWxwZXI7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IEtleVN0b3JhZ2VIZWxwZXIsIFdlYlN0b3JhZ2VIZWxwZXIsIFN0b3JhZ2VPYnNlcnZlckhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvaW5kZXgnO1xyXG5leHBvcnQgdmFyIFdlYlN0b3JhZ2VTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYlN0b3JhZ2VTZXJ2aWNlKHNUeXBlKSB7XHJcbiAgICAgICAgaWYgKHNUeXBlID09PSB2b2lkIDApIHsgc1R5cGUgPSBudWxsOyB9XHJcbiAgICAgICAgdGhpcy5zVHlwZSA9IHNUeXBlO1xyXG4gICAgICAgIHRoaXMuc1R5cGUgPSBzVHlwZTtcclxuICAgIH1cclxuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5zdG9yZSA9IGZ1bmN0aW9uIChyYXcsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpO1xyXG4gICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuc3RvcmUodGhpcy5zVHlwZSwgc0tleSwgdmFsdWUpO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5yZXRyaWV2ZSA9IGZ1bmN0aW9uIChyYXcpIHtcclxuICAgICAgICB2YXIgc0tleSA9IEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KHJhdyk7XHJcbiAgICAgICAgcmV0dXJuIFdlYlN0b3JhZ2VIZWxwZXIucmV0cmlldmUodGhpcy5zVHlwZSwgc0tleSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIGlmIChyYXcpXHJcbiAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXIodGhpcy5zVHlwZSwgS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBXZWJTdG9yYWdlSGVscGVyLmNsZWFyQWxsKHRoaXMuc1R5cGUpO1xyXG4gICAgfTtcclxuICAgIFdlYlN0b3JhZ2VTZXJ2aWNlLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KTtcclxuICAgICAgICByZXR1cm4gU3RvcmFnZU9ic2VydmVySGVscGVyLm9ic2VydmUodGhpcy5zVHlwZSwgc0tleSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFdlYlN0b3JhZ2VTZXJ2aWNlO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJTdG9yYWdlLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn07XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5pbXBvcnQgeyBXZWJTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vd2ViU3RvcmFnZSc7XHJcbmV4cG9ydCB2YXIgTG9jYWxTdG9yYWdlU2VydmljZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoTG9jYWxTdG9yYWdlU2VydmljZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIExvY2FsU3RvcmFnZVNlcnZpY2UoKSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgU1RPUkFHRS5sb2NhbCk7XHJcbiAgICB9XHJcbiAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlID0gX19kZWNvcmF0ZShbXHJcbiAgICAgICAgSW5qZWN0YWJsZSgpXHJcbiAgICBdLCBMb2NhbFN0b3JhZ2VTZXJ2aWNlKTtcclxuICAgIHJldHVybiBMb2NhbFN0b3JhZ2VTZXJ2aWNlO1xyXG59KFdlYlN0b3JhZ2VTZXJ2aWNlKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2FsU3RvcmFnZS5qcy5tYXAiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59O1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xyXG5leHBvcnQgdmFyIFNlc3Npb25TdG9yYWdlU2VydmljZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlKCkge1xyXG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIFNUT1JBR0Uuc2Vzc2lvbik7XHJcbiAgICB9XHJcbiAgICBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgPSBfX2RlY29yYXRlKFtcclxuICAgICAgICBJbmplY3RhYmxlKClcclxuICAgIF0sIFNlc3Npb25TdG9yYWdlU2VydmljZSk7XHJcbiAgICByZXR1cm4gU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlO1xyXG59KFdlYlN0b3JhZ2VTZXJ2aWNlKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlc3Npb25TdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IEtleVN0b3JhZ2VIZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2luZGV4JztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZUhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvaW5kZXgnO1xyXG5leHBvcnQgZnVuY3Rpb24gV2ViU3RvcmFnZSh3ZWJTS2V5LCBzVHlwZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXRlZENsYXNzLCByYXcpIHtcclxuICAgICAgICB2YXIga2V5ID0gd2ViU0tleSB8fCByYXcsIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShrZXkpO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXRlZENsYXNzLCByYXcsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW3NLZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JlKHNUeXBlLCBzS2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2ViU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBXZWJTdG9yYWdlIH0gZnJvbSAnLi93ZWJTdG9yYWdlJztcclxuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5leHBvcnQgZnVuY3Rpb24gTG9jYWxTdG9yYWdlKHdlYnN0b3JhZ2VLZXkpIHtcclxuICAgIHJldHVybiBXZWJTdG9yYWdlKHdlYnN0b3JhZ2VLZXksIFNUT1JBR0UubG9jYWwpO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2FsU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBXZWJTdG9yYWdlIH0gZnJvbSAnLi93ZWJTdG9yYWdlJztcclxuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5leHBvcnQgZnVuY3Rpb24gU2Vzc2lvblN0b3JhZ2Uod2Vic3RvcmFnZUtleSkge1xyXG4gICAgcmV0dXJuIFdlYlN0b3JhZ2Uod2Vic3RvcmFnZUtleSwgU1RPUkFHRS5zZXNzaW9uKTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXNzaW9uU3RvcmFnZS5qcy5tYXAiLCJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcclxuZXhwb3J0ICogZnJvbSAnLi9kZWNvcmF0b3JzL2luZGV4JztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2VzL2luZGV4JztcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaGVscGVycy9rZXlTdG9yYWdlJztcclxuZXhwb3J0IHZhciBOZzJXZWJzdG9yYWdlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE5nMldlYnN0b3JhZ2UoKSB7XHJcbiAgICB9XHJcbiAgICBOZzJXZWJzdG9yYWdlID0gX19kZWNvcmF0ZShbXHJcbiAgICAgICAgTmdNb2R1bGUoe1xyXG4gICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtTZXNzaW9uU3RvcmFnZVNlcnZpY2UsIExvY2FsU3RvcmFnZVNlcnZpY2VdLFxyXG4gICAgICAgICAgICBpbXBvcnRzOiBbXVxyXG4gICAgICAgIH0pXHJcbiAgICBdLCBOZzJXZWJzdG9yYWdlKTtcclxuICAgIHJldHVybiBOZzJXZWJzdG9yYWdlO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwIiwiZXhwb3J0ICogZnJvbSAnLi9kaXN0L2FwcCc7XHJcbi8vICMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcclxuIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInRoaXMiLCJfX2RlY29yYXRlIiwiSW5qZWN0YWJs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
