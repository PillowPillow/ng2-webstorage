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
        if (value != null && value !== this.cached[sType][sKey]) {
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
    LocalStorageService.ctorParameters = [];
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
    SessionStorageService.ctorParameters = [];
    return SessionStorageService;
}(WebStorageService));

var WebStorage = function WebStorageDecorator(webSKey, sType) {
    return function (targetedClass, raw) {
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
    };
};

var LocalStorage = function LocalStorageDecorator(webstorageKey) {
    return WebStorage(webstorageKey, STORAGE.local);
};

var SessionStorage = function SessionStorageDecorator(webstorageKey) {
    return WebStorage(webstorageKey, STORAGE.session);
};

var Ng2Webstorage = (function () {
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
                var storage = sessionStorage === event.storageArea ? STORAGE.session : STORAGE.local;
                WebStorageHelper.refresh(storage, event.key);
            }); });
    };
    Ng2Webstorage.decorators = [
        { type: _angular_core.NgModule, args: [{
                    declarations: [],
                    providers: [SessionStorageService, LocalStorageService],
                    imports: []
                },] },
    ];
    /** @nocollapse */
    Ng2Webstorage.ctorParameters = [
        { type: _angular_core.NgZone, },
    ];
    return Ng2Webstorage;
}());

exports.Ng2Webstorage = Ng2Webstorage;
exports.LocalStorage = LocalStorage;
exports.SessionStorage = SessionStorage;
exports.WebStorage = WebStorage;
exports.WebStorageService = WebStorageService;
exports.LocalStorageService = LocalStorageService;
exports.SessionStorageService = SessionStorageService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS51bWQuanMiLCJzb3VyY2VzIjpbIi4uL2Rpc3QvZW51bXMvc3RvcmFnZS5qcyIsIi4uL2Rpc3QvY29uc3RhbnRzL2xpYi5qcyIsIi4uL2Rpc3QvaGVscGVycy9rZXlTdG9yYWdlLmpzIiwiLi4vZGlzdC9oZWxwZXJzL3N0b3JhZ2VPYnNlcnZlci5qcyIsIi4uL2Rpc3QvaGVscGVycy9tb2NrU3RvcmFnZS5qcyIsIi4uL2Rpc3QvaGVscGVycy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy93ZWJTdG9yYWdlLmpzIiwiLi4vZGlzdC9zZXJ2aWNlcy9sb2NhbFN0b3JhZ2UuanMiLCIuLi9kaXN0L3NlcnZpY2VzL3Nlc3Npb25TdG9yYWdlLmpzIiwiLi4vZGlzdC9kZWNvcmF0b3JzL3dlYlN0b3JhZ2UuanMiLCIuLi9kaXN0L2RlY29yYXRvcnMvbG9jYWxTdG9yYWdlLmpzIiwiLi4vZGlzdC9kZWNvcmF0b3JzL3Nlc3Npb25TdG9yYWdlLmpzIiwiLi4vZGlzdC9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBTVE9SQUdFO1xyXG4oZnVuY3Rpb24gKFNUT1JBR0UpIHtcclxuICAgIFNUT1JBR0VbU1RPUkFHRVtcImxvY2FsXCJdID0gMF0gPSBcImxvY2FsXCI7XHJcbiAgICBTVE9SQUdFW1NUT1JBR0VbXCJzZXNzaW9uXCJdID0gMV0gPSBcInNlc3Npb25cIjtcclxufSkoU1RPUkFHRSB8fCAoU1RPUkFHRSA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5leHBvcnQgdmFyIExJQl9LRVkgPSAnbmcyLXdlYnN0b3JhZ2UnO1xyXG5leHBvcnQgdmFyIExJQl9LRVlfU0VQQVJBVE9SID0gJ3wnO1xyXG5leHBvcnQgdmFyIFNUT1JBR0VfTkFNRVMgPSAoX2EgPSB7fSxcclxuICAgIF9hW1NUT1JBR0UubG9jYWxdID0gJ2xvY2FsJyxcclxuICAgIF9hW1NUT1JBR0Uuc2Vzc2lvbl0gPSAnc2Vzc2lvbicsXHJcbiAgICBfYVxyXG4pO1xyXG52YXIgX2E7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpYi5qcy5tYXAiLCJpbXBvcnQgeyBMSUJfS0VZLCBMSUJfS0VZX1NFUEFSQVRPUiB9IGZyb20gJy4uL2NvbnN0YW50cy9saWInO1xyXG52YXIgQ1VTVE9NX0xJQl9LRVkgPSBMSUJfS0VZO1xyXG52YXIgQ1VTVE9NX0xJQl9LRVlfU0VQQVJBVE9SID0gTElCX0tFWV9TRVBBUkFUT1I7XHJcbmV4cG9ydCB2YXIgS2V5U3RvcmFnZUhlbHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBLZXlTdG9yYWdlSGVscGVyKCkge1xyXG4gICAgfVxyXG4gICAgS2V5U3RvcmFnZUhlbHBlci5pc01hbmFnZWRLZXkgPSBmdW5jdGlvbiAoc0tleSkge1xyXG4gICAgICAgIHJldHVybiBzS2V5LmluZGV4T2YoQ1VTVE9NX0xJQl9LRVkgKyBDVVNUT01fTElCX0tFWV9TRVBBUkFUT1IpID09PSAwO1xyXG4gICAgfTtcclxuICAgIEtleVN0b3JhZ2VIZWxwZXIucmV0cmlldmVLZXlzRnJvbVN0b3JhZ2UgPSBmdW5jdGlvbiAoc3RvcmFnZSkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzdG9yYWdlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4ga2V5LmluZGV4T2YoQ1VTVE9NX0xJQl9LRVkpID09PSAwOyB9KTtcclxuICAgIH07XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLmdlbktleSA9IGZ1bmN0aW9uIChyYXcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHJhdyAhPT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdhdHRlbXB0IHRvIGdlbmVyYXRlIGEgc3RvcmFnZSBrZXkgd2l0aCBhIG5vbiBzdHJpbmcgdmFsdWUnKTtcclxuICAgICAgICByZXR1cm4gXCJcIiArIENVU1RPTV9MSUJfS0VZICsgQ1VTVE9NX0xJQl9LRVlfU0VQQVJBVE9SICsgcmF3LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIH07XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlQcmVmaXggPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gdm9pZCAwKSB7IGtleSA9IExJQl9LRVk7IH1cclxuICAgICAgICBDVVNUT01fTElCX0tFWSA9IGtleTtcclxuICAgIH07XHJcbiAgICBLZXlTdG9yYWdlSGVscGVyLnNldFN0b3JhZ2VLZXlTZXBhcmF0b3IgPSBmdW5jdGlvbiAoc2VwYXJhdG9yKSB7XHJcbiAgICAgICAgaWYgKHNlcGFyYXRvciA9PT0gdm9pZCAwKSB7IHNlcGFyYXRvciA9IExJQl9LRVlfU0VQQVJBVE9SOyB9XHJcbiAgICAgICAgQ1VTVE9NX0xJQl9LRVlfU0VQQVJBVE9SID0gc2VwYXJhdG9yO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBLZXlTdG9yYWdlSGVscGVyO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXlTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5leHBvcnQgdmFyIFN0b3JhZ2VPYnNlcnZlckhlbHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIoKSB7XHJcbiAgICB9XHJcbiAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIub2JzZXJ2ZSA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xyXG4gICAgICAgIHZhciBvS2V5ID0gdGhpcy5nZW5PYnNlcnZlcktleShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgaWYgKG9LZXkgaW4gdGhpcy5vYnNlcnZlcnMpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVyc1tvS2V5XTtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnNbb0tleV0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB9O1xyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIG9LZXkgPSB0aGlzLmdlbk9ic2VydmVyS2V5KHNUeXBlLCBzS2V5KTtcclxuICAgICAgICBpZiAob0tleSBpbiB0aGlzLm9ic2VydmVycylcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNbb0tleV0uZW1pdCh2YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmdlbk9ic2VydmVyS2V5ID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHNUeXBlICsgXCJ8XCIgKyBzS2V5O1xyXG4gICAgfTtcclxuICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5vYnNlcnZlcnMgPSB7fTtcclxuICAgIHJldHVybiBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXI7XHJcbn0oKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JhZ2VPYnNlcnZlci5qcy5tYXAiLCJleHBvcnQgdmFyIE1vY2tTdG9yYWdlSGVscGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vY2tTdG9yYWdlSGVscGVyKCkge1xyXG4gICAgfVxyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQgPSBmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICByZXR1cm4gISF+TW9ja1N0b3JhZ2VIZWxwZXIuc2VjdXJlZEZpZWxkcy5pbmRleE9mKGZpZWxkKTtcclxuICAgIH07XHJcbiAgICBNb2NrU3RvcmFnZUhlbHBlci5nZXRTdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vY2tTdG9yYWdlc1tzVHlwZV0pXHJcbiAgICAgICAgICAgIHRoaXMubW9ja1N0b3JhZ2VzW3NUeXBlXSA9IE1vY2tTdG9yYWdlSGVscGVyLmdlbmVyYXRlU3RvcmFnZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vY2tTdG9yYWdlc1tzVHlwZV07XHJcbiAgICB9O1xyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIuZ2VuZXJhdGVTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdG9yYWdlID0ge307XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3RvcmFnZSwge1xyXG4gICAgICAgICAgICBzZXRJdGVtOiB7XHJcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIU1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkKGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0SXRlbToge1xyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIU1vY2tTdG9yYWdlSGVscGVyLmlzU2VjdXJlZEZpZWxkKGtleSkgPyB0aGlzW2tleV0gfHwgbnVsbCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZW1vdmVJdGVtOiB7XHJcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghTW9ja1N0b3JhZ2VIZWxwZXIuaXNTZWN1cmVkRmllbGQoa2V5KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlbmd0aDoge1xyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xyXG4gICAgfTtcclxuICAgIE1vY2tTdG9yYWdlSGVscGVyLnNlY3VyZWRGaWVsZHMgPSBbJ3NldEl0ZW0nLCAnZ2V0SXRlbScsICdyZW1vdmVJdGVtJywgJ2xlbmd0aCddO1xyXG4gICAgTW9ja1N0b3JhZ2VIZWxwZXIubW9ja1N0b3JhZ2VzID0ge307XHJcbiAgICByZXR1cm4gTW9ja1N0b3JhZ2VIZWxwZXI7XHJcbn0oKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vY2tTdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuaW1wb3J0IHsgU3RvcmFnZU9ic2VydmVySGVscGVyIH0gZnJvbSAnLi9zdG9yYWdlT2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi9rZXlTdG9yYWdlJztcclxuaW1wb3J0IHsgTW9ja1N0b3JhZ2VIZWxwZXIgfSBmcm9tICcuL21vY2tTdG9yYWdlJztcclxuaW1wb3J0IHsgU1RPUkFHRV9OQU1FUyB9IGZyb20gJy4uL2NvbnN0YW50cy9saWInO1xyXG5leHBvcnQgdmFyIFdlYlN0b3JhZ2VIZWxwZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2ViU3RvcmFnZUhlbHBlcigpIHtcclxuICAgIH1cclxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuc3RvcmUgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5nZXRTdG9yYWdlKHNUeXBlKS5zZXRJdGVtKHNLZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRbc1R5cGVdW3NLZXldID0gdmFsdWU7XHJcbiAgICAgICAgU3RvcmFnZU9ic2VydmVySGVscGVyLmVtaXQoc1R5cGUsIHNLZXksIHZhbHVlKTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlID0gZnVuY3Rpb24gKHNUeXBlLCBzS2V5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRbc1R5cGVdW3NLZXldID0gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZUZyb21TdG9yYWdlKHNUeXBlLCBzS2V5KTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJldHJpZXZlRnJvbVN0b3JhZ2UgPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IG51bGw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5nZXRTdG9yYWdlKHNUeXBlKS5nZXRJdGVtKHNLZXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJpbnZhbGlkIHZhbHVlIGZvciBcIiArIHNLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLnJlZnJlc2ggPSBmdW5jdGlvbiAoc1R5cGUsIHNLZXkpIHtcclxuICAgICAgICBpZiAoIUtleVN0b3JhZ2VIZWxwZXIuaXNNYW5hZ2VkS2V5KHNLZXkpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdmFyIHZhbHVlID0gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZUZyb21TdG9yYWdlKHNUeXBlLCBzS2V5KTtcclxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gdGhpcy5jYWNoZWRbc1R5cGVdW3NLZXldKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVkW3NUeXBlXVtzS2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdChzVHlwZSwgc0tleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLmNsZWFyQWxsID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZShzVHlwZSk7XHJcbiAgICAgICAgS2V5U3RvcmFnZUhlbHBlci5yZXRyaWV2ZUtleXNGcm9tU3RvcmFnZShzdG9yYWdlKVxyXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoc0tleSkge1xyXG4gICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oc0tleSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5jYWNoZWRbc1R5cGVdW3NLZXldO1xyXG4gICAgICAgICAgICBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIuZW1pdChzVHlwZSwgc0tleSwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5jbGVhciA9IGZ1bmN0aW9uIChzVHlwZSwgc0tleSkge1xyXG4gICAgICAgIHRoaXMuZ2V0U3RvcmFnZShzVHlwZSkucmVtb3ZlSXRlbShzS2V5KTtcclxuICAgICAgICBkZWxldGUgdGhpcy5jYWNoZWRbc1R5cGVdW3NLZXldO1xyXG4gICAgICAgIFN0b3JhZ2VPYnNlcnZlckhlbHBlci5lbWl0KHNUeXBlLCBzS2V5LCBudWxsKTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLmdldFN0b3JhZ2UgPSBmdW5jdGlvbiAoc1R5cGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1N0b3JhZ2VBdmFpbGFibGUoc1R5cGUpID8gdGhpcy5nZXRXU3RvcmFnZShzVHlwZSkgOiBNb2NrU3RvcmFnZUhlbHBlci5nZXRTdG9yYWdlKHNUeXBlKTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLmdldFdTdG9yYWdlID0gZnVuY3Rpb24gKHNUeXBlKSB7XHJcbiAgICAgICAgdmFyIHN0b3JhZ2U7XHJcbiAgICAgICAgc3dpdGNoIChzVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNUT1JBR0UubG9jYWw6XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU1RPUkFHRS5zZXNzaW9uOlxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZSA9IHNlc3Npb25TdG9yYWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignaW52YWxpZCBzdG9yYWdlIHR5cGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2U7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZUhlbHBlci5pc1N0b3JhZ2VBdmFpbGFibGUgPSBmdW5jdGlvbiAoc1R5cGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc3RvcmFnZUF2YWlsYWJpbGl0eVtzVHlwZV0gPT09ICdib29sZWFuJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZUF2YWlsYWJpbGl0eVtzVHlwZV07XHJcbiAgICAgICAgdmFyIGlzQXZhaWxhYmxlID0gdHJ1ZSwgc3RvcmFnZSA9IHRoaXMuZ2V0V1N0b3JhZ2Uoc1R5cGUpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RvcmFnZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSgndGVzdC1zdG9yYWdlJywgJ2Zvb2JhcicpO1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKCd0ZXN0LXN0b3JhZ2UnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgaXNBdmFpbGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGlzQXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFpc0F2YWlsYWJsZSlcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFNUT1JBR0VfTkFNRVNbc1R5cGVdICsgXCIgc3RvcmFnZSB1bmF2YWlsYWJsZSwgTmcyV2Vic3RvcmFnZSB3aWxsIHVzZSBhIGZhbGxiYWNrIHN0cmF0ZWd5IGluc3RlYWRcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZUF2YWlsYWJpbGl0eVtzVHlwZV0gPSBpc0F2YWlsYWJsZTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlSGVscGVyLmNhY2hlZCA9IChfYSA9IHt9LCBfYVtTVE9SQUdFLmxvY2FsXSA9IHt9LCBfYVtTVE9SQUdFLnNlc3Npb25dID0ge30sIF9hKTtcclxuICAgIFdlYlN0b3JhZ2VIZWxwZXIuc3RvcmFnZUF2YWlsYWJpbGl0eSA9IChfYiA9IHt9LCBfYltTVE9SQUdFLmxvY2FsXSA9IG51bGwsIF9iW1NUT1JBR0Uuc2Vzc2lvbl0gPSBudWxsLCBfYik7XHJcbiAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlcjtcclxuICAgIHZhciBfYSwgX2I7XHJcbn0oKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYlN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciwgV2ViU3RvcmFnZUhlbHBlciwgU3RvcmFnZU9ic2VydmVySGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9pbmRleCc7XHJcbmV4cG9ydCB2YXIgV2ViU3RvcmFnZVNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2ViU3RvcmFnZVNlcnZpY2Uoc1R5cGUpIHtcclxuICAgICAgICBpZiAoc1R5cGUgPT09IHZvaWQgMCkgeyBzVHlwZSA9IG51bGw7IH1cclxuICAgICAgICB0aGlzLnNUeXBlID0gc1R5cGU7XHJcbiAgICAgICAgdGhpcy5zVHlwZSA9IHNUeXBlO1xyXG4gICAgfVxyXG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLnN0b3JlID0gZnVuY3Rpb24gKHJhdywgdmFsdWUpIHtcclxuICAgICAgICB2YXIgc0tleSA9IEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KHJhdyk7XHJcbiAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5zdG9yZSh0aGlzLnNUeXBlLCBzS2V5LCB2YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLnJldHJpZXZlID0gZnVuY3Rpb24gKHJhdykge1xyXG4gICAgICAgIHZhciBzS2V5ID0gS2V5U3RvcmFnZUhlbHBlci5nZW5LZXkocmF3KTtcclxuICAgICAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZSh0aGlzLnNUeXBlLCBzS2V5KTtcclxuICAgIH07XHJcbiAgICBXZWJTdG9yYWdlU2VydmljZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAocmF3KSB7XHJcbiAgICAgICAgaWYgKHJhdylcclxuICAgICAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5jbGVhcih0aGlzLnNUeXBlLCBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFdlYlN0b3JhZ2VIZWxwZXIuY2xlYXJBbGwodGhpcy5zVHlwZSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU3RvcmFnZVNlcnZpY2UucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAocmF3KSB7XHJcbiAgICAgICAgdmFyIHNLZXkgPSBLZXlTdG9yYWdlSGVscGVyLmdlbktleShyYXcpO1xyXG4gICAgICAgIHJldHVybiBTdG9yYWdlT2JzZXJ2ZXJIZWxwZXIub2JzZXJ2ZSh0aGlzLnNUeXBlLCBzS2V5KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gV2ViU3RvcmFnZVNlcnZpY2U7XHJcbn0oKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYlN0b3JhZ2UuanMubWFwIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufTtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTVE9SQUdFIH0gZnJvbSAnLi4vZW51bXMvc3RvcmFnZSc7XHJcbmltcG9ydCB7IFdlYlN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi93ZWJTdG9yYWdlJztcclxuZXhwb3J0IHZhciBMb2NhbFN0b3JhZ2VTZXJ2aWNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhMb2NhbFN0b3JhZ2VTZXJ2aWNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTG9jYWxTdG9yYWdlU2VydmljZSgpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBTVE9SQUdFLmxvY2FsKTtcclxuICAgIH1cclxuICAgIExvY2FsU3RvcmFnZVNlcnZpY2UuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcclxuICAgIF07XHJcbiAgICAvKiogQG5vY29sbGFwc2UgKi9cclxuICAgIExvY2FsU3RvcmFnZVNlcnZpY2UuY3RvclBhcmFtZXRlcnMgPSBbXTtcclxuICAgIHJldHVybiBMb2NhbFN0b3JhZ2VTZXJ2aWNlO1xyXG59KFdlYlN0b3JhZ2VTZXJ2aWNlKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2FsU3RvcmFnZS5qcy5tYXAiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59O1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3dlYlN0b3JhZ2UnO1xyXG5leHBvcnQgdmFyIFNlc3Npb25TdG9yYWdlU2VydmljZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlKCkge1xyXG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIFNUT1JBR0Uuc2Vzc2lvbik7XHJcbiAgICB9XHJcbiAgICBTZXNzaW9uU3RvcmFnZVNlcnZpY2UuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcclxuICAgIF07XHJcbiAgICAvKiogQG5vY29sbGFwc2UgKi9cclxuICAgIFNlc3Npb25TdG9yYWdlU2VydmljZS5jdG9yUGFyYW1ldGVycyA9IFtdO1xyXG4gICAgcmV0dXJuIFNlc3Npb25TdG9yYWdlU2VydmljZTtcclxufShXZWJTdG9yYWdlU2VydmljZSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXNzaW9uU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBLZXlTdG9yYWdlSGVscGVyLCBXZWJTdG9yYWdlSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9pbmRleCc7XHJcbmV4cG9ydCB2YXIgV2ViU3RvcmFnZSA9IGZ1bmN0aW9uIFdlYlN0b3JhZ2VEZWNvcmF0b3Iod2ViU0tleSwgc1R5cGUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0ZWRDbGFzcywgcmF3KSB7XHJcbiAgICAgICAgdmFyIGtleSA9IHdlYlNLZXkgfHwgcmF3O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXRlZENsYXNzLCByYXcsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc0tleSA9IEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KGtleSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gV2ViU3RvcmFnZUhlbHBlci5yZXRyaWV2ZShzVHlwZSwgc0tleSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc0tleSA9IEtleVN0b3JhZ2VIZWxwZXIuZ2VuS2V5KGtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzW3NLZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBXZWJTdG9yYWdlSGVscGVyLnN0b3JlKHNUeXBlLCBzS2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYlN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgV2ViU3RvcmFnZSB9IGZyb20gJy4vd2ViU3RvcmFnZSc7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuLi9lbnVtcy9zdG9yYWdlJztcclxuZXhwb3J0IHZhciBMb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiBMb2NhbFN0b3JhZ2VEZWNvcmF0b3Iod2Vic3RvcmFnZUtleSkge1xyXG4gICAgcmV0dXJuIFdlYlN0b3JhZ2Uod2Vic3RvcmFnZUtleSwgU1RPUkFHRS5sb2NhbCk7XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2FsU3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBXZWJTdG9yYWdlIH0gZnJvbSAnLi93ZWJTdG9yYWdlJztcclxuaW1wb3J0IHsgU1RPUkFHRSB9IGZyb20gJy4uL2VudW1zL3N0b3JhZ2UnO1xyXG5leHBvcnQgdmFyIFNlc3Npb25TdG9yYWdlID0gZnVuY3Rpb24gU2Vzc2lvblN0b3JhZ2VEZWNvcmF0b3Iod2Vic3RvcmFnZUtleSkge1xyXG4gICAgcmV0dXJuIFdlYlN0b3JhZ2Uod2Vic3RvcmFnZUtleSwgU1RPUkFHRS5zZXNzaW9uKTtcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Vzc2lvblN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMSUJfS0VZLCBMSUJfS0VZX1NFUEFSQVRPUiB9IGZyb20gJy4vY29uc3RhbnRzL2xpYic7XHJcbmltcG9ydCB7IFNUT1JBR0UgfSBmcm9tICcuL2VudW1zL3N0b3JhZ2UnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlLCBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcclxuaW1wb3J0IHsgV2ViU3RvcmFnZUhlbHBlciB9IGZyb20gJy4vaGVscGVycy93ZWJTdG9yYWdlJztcclxuaW1wb3J0IHsgS2V5U3RvcmFnZUhlbHBlciB9IGZyb20gJy4vaGVscGVycy9rZXlTdG9yYWdlJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2VzL2luZGV4JztcclxuZXhwb3J0ICogZnJvbSAnLi9kZWNvcmF0b3JzL2luZGV4JztcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XHJcbmV4cG9ydCB2YXIgTmcyV2Vic3RvcmFnZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOZzJXZWJzdG9yYWdlKG5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMubmdab25lID0gbmdab25lO1xyXG4gICAgICAgIHRoaXMuaW5pdFN0b3JhZ2VMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG4gICAgTmcyV2Vic3RvcmFnZS5mb3JSb290ID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHsgcHJlZml4OiBMSUJfS0VZLCBzZXBhcmF0b3I6IExJQl9LRVlfU0VQQVJBVE9SIH0gOiBfYSwgcHJlZml4ID0gX2IucHJlZml4LCBzZXBhcmF0b3IgPSBfYi5zZXBhcmF0b3I7XHJcbiAgICAgICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5UHJlZml4KHByZWZpeCk7XHJcbiAgICAgICAgS2V5U3RvcmFnZUhlbHBlci5zZXRTdG9yYWdlS2V5U2VwYXJhdG9yKHNlcGFyYXRvcik7XHJcbiAgICAgICAgcmV0dXJuIHsgbmdNb2R1bGU6IE5nMldlYnN0b3JhZ2UsIHByb3ZpZGVyczogW10gfTtcclxuICAgIH07XHJcbiAgICBOZzJXZWJzdG9yYWdlLnByb3RvdHlwZS5pbml0U3RvcmFnZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHdpbmRvdylcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZSA9PT0gZXZlbnQuc3RvcmFnZUFyZWEgPyBTVE9SQUdFLnNlc3Npb24gOiBTVE9SQUdFLmxvY2FsO1xyXG4gICAgICAgICAgICAgICAgV2ViU3RvcmFnZUhlbHBlci5yZWZyZXNoKHN0b3JhZ2UsIGV2ZW50LmtleSk7XHJcbiAgICAgICAgICAgIH0pOyB9KTtcclxuICAgIH07XHJcbiAgICBOZzJXZWJzdG9yYWdlLmRlY29yYXRvcnMgPSBbXHJcbiAgICAgICAgeyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcclxuICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyczogW1Nlc3Npb25TdG9yYWdlU2VydmljZSwgTG9jYWxTdG9yYWdlU2VydmljZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW1wb3J0czogW11cclxuICAgICAgICAgICAgICAgIH0sXSB9LFxyXG4gICAgXTtcclxuICAgIC8qKiBAbm9jb2xsYXBzZSAqL1xyXG4gICAgTmcyV2Vic3RvcmFnZS5jdG9yUGFyYW1ldGVycyA9IFtcclxuICAgICAgICB7IHR5cGU6IE5nWm9uZSwgfSxcclxuICAgIF07XHJcbiAgICByZXR1cm4gTmcyV2Vic3RvcmFnZTtcclxufSgpKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcCJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJ0aGlzIiwiSW5qZWN0YWJsZSIsIl9fZXh0ZW5kcyIsIk5nTW9kdWxlIiwiTmdab25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxJQUFJLE9BQU8sQ0FBQztBQUNuQixDQUFDLFVBQVUsT0FBTyxFQUFFO0lBQ2hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO0NBQy9DLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxBQUM5Qjs7QUNKTyxJQUFJLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztBQUN0QyxBQUFPLElBQUksaUJBQWlCLEdBQUcsR0FBRyxDQUFDO0FBQ25DLEFBQU8sSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRTtJQUMvQixFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU87SUFDM0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTO0lBQy9CLEVBQUU7QUFDTixDQUFDLENBQUM7QUFDRixJQUFJLEVBQUUsQ0FBQyxBQUNQOztBQ1JBLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQztB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
