(self["webpackChunkngx_webstorage_env"] = self["webpackChunkngx_webstorage_env"] || []).push([["main"],{

/***/ 8255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ (function(module) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 8255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 9907:
/*!*************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/constants/config.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultPrefix": function() { return /* binding */ DefaultPrefix; },
/* harmony export */   "DefaultSeparator": function() { return /* binding */ DefaultSeparator; },
/* harmony export */   "DefaultIsCaseSensitive": function() { return /* binding */ DefaultIsCaseSensitive; }
/* harmony export */ });
const DefaultPrefix = 'ngx-webstorage';
const DefaultSeparator = '|';
const DefaultIsCaseSensitive = false;


/***/ }),

/***/ 8457:
/*!***************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/constants/strategy.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageStrategies": function() { return /* binding */ StorageStrategies; }
/* harmony export */ });
var StorageStrategies;
(function (StorageStrategies) {
    StorageStrategies["Local"] = "local_strategy";
    StorageStrategies["Session"] = "session_strategy";
    StorageStrategies["InMemory"] = "in_memory_strategy";
})(StorageStrategies || (StorageStrategies = {}));


/***/ }),

/***/ 7832:
/*!****************************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/core/interfaces/storageStrategy.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 5889:
/*!***************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/core/nativeStorage.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LOCAL_STORAGE": function() { return /* binding */ LOCAL_STORAGE; },
/* harmony export */   "getLocalStorage": function() { return /* binding */ getLocalStorage; },
/* harmony export */   "LocalStorageProvider": function() { return /* binding */ LocalStorageProvider; },
/* harmony export */   "SESSION_STORAGE": function() { return /* binding */ SESSION_STORAGE; },
/* harmony export */   "getSessionStorage": function() { return /* binding */ getSessionStorage; },
/* harmony export */   "SessionStorageProvider": function() { return /* binding */ SessionStorageProvider; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7716);

const LOCAL_STORAGE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('window_local_storage');
function getLocalStorage() {
    return (typeof window !== 'undefined') ? window.localStorage : null;
}
const LocalStorageProvider = { provide: LOCAL_STORAGE, useFactory: getLocalStorage };
const SESSION_STORAGE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('window_session_storage');
function getSessionStorage() {
    return (typeof window !== 'undefined') ? window.sessionStorage : null;
}
const SessionStorageProvider = { provide: SESSION_STORAGE, useFactory: getSessionStorage };


/***/ }),

/***/ 409:
/*!***************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/core/strategyCache.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StrategyCacheService": function() { return /* binding */ StrategyCacheService; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7716);

class StrategyCacheService {
    constructor() {
        this.caches = {};
    }
    get(strategyName, key) {
        return this.getCacheStore(strategyName)[key];
    }
    set(strategyName, key, value) {
        this.getCacheStore(strategyName)[key] = value;
    }
    del(strategyName, key) {
        delete this.getCacheStore(strategyName)[key];
    }
    clear(strategyName) {
        this.caches[strategyName] = {};
    }
    getCacheStore(strategyName) {
        if (strategyName in this.caches)
            return this.caches[strategyName];
        return this.caches[strategyName] = {};
    }
}
StrategyCacheService.ɵfac = function StrategyCacheService_Factory(t) { return new (t || StrategyCacheService)(); };
StrategyCacheService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: StrategyCacheService, factory: StrategyCacheService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2639:
/*!************************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/core/templates/asyncStorage.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncStorage": function() { return /* binding */ AsyncStorage; }
/* harmony export */ });
/* harmony import */ var _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/storageKeyManager */ 3539);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 8002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 5435);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 3190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 7519);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 7349);


class AsyncStorage {
    constructor(strategy) {
        this.strategy = strategy;
    }
    retrieve(key) {
        return this.strategy.get(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__.StorageKeyManager.normalize(key)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)((value) => typeof value === 'undefined' ? null : value));
    }
    store(key, value) {
        return this.strategy.set(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__.StorageKeyManager.normalize(key), value);
    }
    clear(key) {
        return key !== undefined ? this.strategy.del(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__.StorageKeyManager.normalize(key)) : this.strategy.clear();
    }
    getStrategyName() { return this.strategy.name; }
    observe(key) {
        key = _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__.StorageKeyManager.normalize(key);
        return this.strategy.keyChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)((changed) => changed === null || changed === key), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.strategy.get(key)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.shareReplay)());
    }
}


/***/ }),

/***/ 9901:
/*!***********************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/core/templates/syncStorage.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyncStorage": function() { return /* binding */ SyncStorage; }
/* harmony export */ });
/* harmony import */ var _helpers_noop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/noop */ 2709);
/* harmony import */ var _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/storageKeyManager */ 3539);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 5435);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 3190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 7519);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 7349);



class SyncStorage {
    constructor(strategy) {
        this.strategy = strategy;
    }
    retrieve(key) {
        let value;
        this.strategy.get(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(key)).subscribe((result) => value = typeof result === 'undefined' ? null : result);
        return value;
    }
    store(key, value) {
        this.strategy.set(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(key), value).subscribe(_helpers_noop__WEBPACK_IMPORTED_MODULE_0__.noop);
        return value;
    }
    clear(key) {
        if (key !== undefined)
            this.strategy.del(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(key)).subscribe(_helpers_noop__WEBPACK_IMPORTED_MODULE_0__.noop);
        else
            this.strategy.clear().subscribe(_helpers_noop__WEBPACK_IMPORTED_MODULE_0__.noop);
    }
    getStrategyName() { return this.strategy.name; }
    observe(key) {
        key = _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(key);
        return this.strategy.keyChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)((changed) => changed === null || changed === key), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.strategy.get(key)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.shareReplay)());
    }
}


/***/ }),

/***/ 9829:
/*!*******************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/decorators.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorage": function() { return /* binding */ LocalStorage; },
/* harmony export */   "SessionStorage": function() { return /* binding */ SessionStorage; }
/* harmony export */ });
/* harmony import */ var _constants_strategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/strategy */ 8457);
/* harmony import */ var _helpers_decoratorBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/decoratorBuilder */ 7085);


function LocalStorage(key, defaultValue) {
    return function (prototype, propName) {
        _helpers_decoratorBuilder__WEBPACK_IMPORTED_MODULE_1__.DecoratorBuilder.buildSyncStrategyDecorator(_constants_strategy__WEBPACK_IMPORTED_MODULE_0__.StorageStrategies.Local, prototype, propName, key, defaultValue);
    };
}
function SessionStorage(key, defaultValue) {
    return function (prototype, propName) {
        _helpers_decoratorBuilder__WEBPACK_IMPORTED_MODULE_1__.DecoratorBuilder.buildSyncStrategyDecorator(_constants_strategy__WEBPACK_IMPORTED_MODULE_0__.StorageStrategies.Session, prototype, propName, key, defaultValue);
    };
}


/***/ }),

/***/ 3025:
/*!***********************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/helpers/compat.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompatHelper": function() { return /* binding */ CompatHelper; }
/* harmony export */ });
class CompatHelper {
    static isStorageAvailable(storage) {
        let available = true;
        try {
            if (typeof storage === 'object') {
                storage.setItem('test-storage', 'foobar');
                storage.removeItem('test-storage');
            }
            else
                available = false;
        }
        catch (e) {
            available = false;
        }
        return available;
    }
    static getUTCTime() {
        const d = new Date();
        return (d.getTime() + d.getTimezoneOffset() * 60 * 1000) / 1000;
    }
}


/***/ }),

/***/ 7085:
/*!*********************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/helpers/decoratorBuilder.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DecoratorBuilder": function() { return /* binding */ DecoratorBuilder; }
/* harmony export */ });
/* harmony import */ var _services_strategyIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/strategyIndex */ 5355);
/* harmony import */ var _storageKeyManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storageKeyManager */ 3539);
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./noop */ 2709);



class DecoratorBuilder {
    static buildSyncStrategyDecorator(strategyName, prototype, propName, key, defaultValue = null) {
        const rawKey = key || propName;
        let storageKey;
        Object.defineProperty(prototype, propName, {
            get: function () {
                let value;
                _services_strategyIndex__WEBPACK_IMPORTED_MODULE_0__.StrategyIndex.get(strategyName).get(getKey()).subscribe((result) => value = result);
                return value === undefined ? defaultValue : value;
            },
            set: function (value) {
                _services_strategyIndex__WEBPACK_IMPORTED_MODULE_0__.StrategyIndex.get(strategyName).set(getKey(), value).subscribe(_noop__WEBPACK_IMPORTED_MODULE_2__.noop);
            }
        });
        function getKey() {
            if (storageKey !== undefined)
                return storageKey;
            return storageKey = _storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(rawKey);
        }
    }
}


/***/ }),

/***/ 2709:
/*!*********************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/helpers/noop.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": function() { return /* binding */ noop; }
/* harmony export */ });
function noop() { }


/***/ }),

/***/ 3539:
/*!**********************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/helpers/storageKeyManager.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageKeyManager": function() { return /* binding */ StorageKeyManager; }
/* harmony export */ });
/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/config */ 9907);

class StorageKeyManager {
    static normalize(raw) {
        raw = StorageKeyManager.isCaseSensitive ? raw : raw.toLowerCase();
        return `${StorageKeyManager.prefix}${StorageKeyManager.separator}${raw}`;
    }
    static isNormalizedKey(key) {
        return key.indexOf(StorageKeyManager.prefix + StorageKeyManager.separator) === 0;
    }
    static setPrefix(prefix) {
        StorageKeyManager.prefix = prefix;
    }
    static setSeparator(separator) {
        StorageKeyManager.separator = separator;
    }
    static setCaseSensitive(enable) {
        StorageKeyManager.isCaseSensitive = enable;
    }
    static consumeConfiguration(config) {
        if ('prefix' in config)
            this.setPrefix(config.prefix);
        if ('separator' in config)
            this.setSeparator(config.separator);
        if ('caseSensitive' in config)
            this.setCaseSensitive(config.caseSensitive);
    }
}
StorageKeyManager.prefix = _constants_config__WEBPACK_IMPORTED_MODULE_0__.DefaultPrefix;
StorageKeyManager.separator = _constants_config__WEBPACK_IMPORTED_MODULE_0__.DefaultSeparator;
StorageKeyManager.isCaseSensitive = _constants_config__WEBPACK_IMPORTED_MODULE_0__.DefaultIsCaseSensitive;


/***/ }),

/***/ 2615:
/*!************************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/helpers/valueWithExpiration.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValueWithExpiration": function() { return /* binding */ ValueWithExpiration; }
/* harmony export */ });
/* harmony import */ var _compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compat */ 3025);

class ValueWithExpiration {
    constructor(v) {
        this.v = v;
        if (v._e_in) {
            this._d = v;
        }
        else {
            this._d = { '_v': v };
        }
    }
    setExpiration(expiresIn) {
        this._d._e_in = _compat__WEBPACK_IMPORTED_MODULE_0__.CompatHelper.getUTCTime() + (expiresIn * 1000);
    }
    isExpired() {
        return this._d._e_in < _compat__WEBPACK_IMPORTED_MODULE_0__.CompatHelper.getUTCTime();
    }
    getValueForStorage() {
        return this._d;
    }
    getRealValue() {
        return this._d._v;
    }
}


/***/ }),

/***/ 1407:
/*!***************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LIB_CONFIG": function() { return /* binding */ LIB_CONFIG; },
/* harmony export */   "appInit": function() { return /* binding */ appInit; },
/* harmony export */   "NgxWebstorageModule": function() { return /* binding */ NgxWebstorageModule; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _core_nativeStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/nativeStorage */ 5889);
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/index */ 6955);
/* harmony import */ var _strategies_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./strategies/index */ 9617);
/* harmony import */ var _services_strategyIndex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/strategyIndex */ 5355);
/* harmony import */ var _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/storageKeyManager */ 3539);








const LIB_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.InjectionToken('ngx_webstorage_config');
function appInit(index) {
    index.indexStrategies();
    return () => _services_strategyIndex__WEBPACK_IMPORTED_MODULE_3__.StrategyIndex.index;
}
class NgxWebstorageModule {
    constructor(index, config) {
        if (config)
            _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_4__.StorageKeyManager.consumeConfiguration(config);
        else
            console.error('NgxWebstorage : Possible misconfiguration (The forRoot method usage is mandatory since the 3.0.0)');
    }
    static forRoot(config = {}) {
        return {
            ngModule: NgxWebstorageModule,
            providers: [
                {
                    provide: LIB_CONFIG,
                    useValue: config,
                },
                _core_nativeStorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorageProvider,
                _core_nativeStorage__WEBPACK_IMPORTED_MODULE_0__.SessionStorageProvider,
                ..._services_index__WEBPACK_IMPORTED_MODULE_1__.Services,
                ..._strategies_index__WEBPACK_IMPORTED_MODULE_2__.Strategies,
                {
                    provide: _angular_core__WEBPACK_IMPORTED_MODULE_5__.APP_INITIALIZER,
                    useFactory: appInit,
                    deps: [_services_strategyIndex__WEBPACK_IMPORTED_MODULE_3__.StrategyIndex],
                    multi: true
                }
            ]
        };
    }
}
NgxWebstorageModule.ɵfac = function NgxWebstorageModule_Factory(t) { return new (t || NgxWebstorageModule)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_strategyIndex__WEBPACK_IMPORTED_MODULE_3__.StrategyIndex), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](LIB_CONFIG, 8)); };
NgxWebstorageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: NgxWebstorageModule });
NgxWebstorageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({});


/***/ }),

/***/ 6955:
/*!***********************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/services/index.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Services": function() { return /* binding */ Services; }
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ 130);
/* harmony import */ var _sessionStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sessionStorage */ 2588);


const Services = [
    _localStorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorageServiceProvider,
    _sessionStorage__WEBPACK_IMPORTED_MODULE_1__.SessionStorageServiceProvider
];


/***/ }),

/***/ 130:
/*!******************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/services/localStorage.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorageService": function() { return /* binding */ LocalStorageService; },
/* harmony export */   "buildService": function() { return /* binding */ buildService; },
/* harmony export */   "LocalStorageServiceProvider": function() { return /* binding */ LocalStorageServiceProvider; }
/* harmony export */ });
/* harmony import */ var _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/templates/syncStorage */ 9901);
/* harmony import */ var _strategyIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strategyIndex */ 5355);
/* harmony import */ var _constants_strategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/strategy */ 8457);



class LocalStorageService extends _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__.SyncStorage {
}
function buildService(index) {
    const strategy = index.indexStrategy(_constants_strategy__WEBPACK_IMPORTED_MODULE_2__.StorageStrategies.Local);
    return new _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__.SyncStorage(strategy);
}
const LocalStorageServiceProvider = {
    provide: LocalStorageService,
    useFactory: buildService,
    deps: [_strategyIndex__WEBPACK_IMPORTED_MODULE_1__.StrategyIndex]
};


/***/ }),

/***/ 2588:
/*!********************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/services/sessionStorage.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionStorageService": function() { return /* binding */ SessionStorageService; },
/* harmony export */   "buildService": function() { return /* binding */ buildService; },
/* harmony export */   "SessionStorageServiceProvider": function() { return /* binding */ SessionStorageServiceProvider; }
/* harmony export */ });
/* harmony import */ var _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/templates/syncStorage */ 9901);
/* harmony import */ var _strategyIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strategyIndex */ 5355);
/* harmony import */ var _constants_strategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/strategy */ 8457);



class SessionStorageService extends _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__.SyncStorage {
}
function buildService(index) {
    const strategy = index.indexStrategy(_constants_strategy__WEBPACK_IMPORTED_MODULE_2__.StorageStrategies.Session);
    return new _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__.SyncStorage(strategy);
}
const SessionStorageServiceProvider = {
    provide: SessionStorageService,
    useFactory: buildService,
    deps: [_strategyIndex__WEBPACK_IMPORTED_MODULE_1__.StrategyIndex]
};


/***/ }),

/***/ 5355:
/*!*******************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/services/strategyIndex.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvalidStrategyError": function() { return /* binding */ InvalidStrategyError; },
/* harmony export */   "StrategyIndex": function() { return /* binding */ StrategyIndex; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9765);
/* harmony import */ var _strategies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../strategies */ 9617);
/* harmony import */ var _constants_strategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/strategy */ 8457);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);




const InvalidStrategyError = 'invalid_strategy';
class StrategyIndex {
    constructor(strategies) {
        this.strategies = strategies;
        this.registration$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        if (!strategies)
            strategies = [];
        this.strategies = strategies.reverse()
            .map((strategy, index, arr) => strategy.name)
            .map((name, index, arr) => arr.indexOf(name) === index ? index : null)
            .filter((index) => index !== null)
            .map((index) => strategies[index]);
    }
    static get(name) {
        if (!this.isStrategyRegistered(name))
            throw Error(InvalidStrategyError);
        let strategy = this.index[name];
        if (!strategy.isAvailable) {
            strategy = this.index[_constants_strategy__WEBPACK_IMPORTED_MODULE_1__.StorageStrategies.InMemory];
        }
        return strategy;
    }
    static set(name, strategy) {
        this.index[name] = strategy;
    }
    static clear(name) {
        if (name !== undefined)
            delete this.index[name];
        else
            this.index = {};
    }
    static isStrategyRegistered(name) {
        return name in this.index;
    }
    static hasRegistredStrategies() {
        return Object.keys(this.index).length > 0;
    }
    getStrategy(name) {
        return StrategyIndex.get(name);
    }
    indexStrategies() {
        this.strategies.forEach((strategy) => this.register(strategy.name, strategy));
    }
    indexStrategy(name, overrideIfExists = false) {
        if (StrategyIndex.isStrategyRegistered(name) && !overrideIfExists)
            return StrategyIndex.get(name);
        const strategy = this.strategies.find((strategy) => strategy.name === name);
        if (!strategy)
            throw new Error(InvalidStrategyError);
        this.register(name, strategy, overrideIfExists);
        return strategy;
    }
    register(name, strategy, overrideIfExists = false) {
        if (!StrategyIndex.isStrategyRegistered(name) || overrideIfExists) {
            StrategyIndex.set(name, strategy);
            this.registration$.next(name);
        }
    }
}
StrategyIndex.index = {};
StrategyIndex.ɵfac = function StrategyIndex_Factory(t) { return new (t || StrategyIndex)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_strategies__WEBPACK_IMPORTED_MODULE_0__.STORAGE_STRATEGIES, 8)); };
StrategyIndex.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: StrategyIndex, factory: StrategyIndex.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3611:
/*!***********************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/strategies/baseSyncStorage.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseSyncStorageStrategy": function() { return /* binding */ BaseSyncStorageStrategy; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9765);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5917);
/* harmony import */ var _helpers_compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/compat */ 3025);
/* harmony import */ var _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/valueWithExpiration */ 2615);



class BaseSyncStorageStrategy {
    constructor(storage, cache) {
        this.storage = storage;
        this.cache = cache;
        this.keyChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    }
    get isAvailable() {
        if (this._isAvailable === undefined)
            this._isAvailable = _helpers_compat__WEBPACK_IMPORTED_MODULE_0__.CompatHelper.isStorageAvailable(this.storage);
        return this._isAvailable;
    }
    get(key) {
        let data = this.cache.get(this.name, key);
        if (data && data._e_in) {
            const valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_1__.ValueWithExpiration(data);
            if (valueWithExpiration.isExpired()) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null);
            }
            data = valueWithExpiration.getRealValue();
        }
        if (data !== undefined)
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(data);
        try {
            const item = this.storage.getItem(key);
            if (item !== null) {
                const data1 = JSON.parse(item);
                if (data1 && data1._e_in) {
                    const valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_1__.ValueWithExpiration(data1);
                    if (valueWithExpiration.isExpired()) {
                        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null);
                    }
                    data = valueWithExpiration.getRealValue();
                }
                else {
                    data = data1;
                }
                this.cache.set(this.name, key, data1);
            }
        }
        catch (err) {
            console.warn(err);
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(data);
    }
    set(key, value, expiresIn) {
        let v = value;
        if (expiresIn) {
            const valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_1__.ValueWithExpiration(value);
            valueWithExpiration.setExpiration(expiresIn);
            v = valueWithExpiration.getValueForStorage();
        }
        const data = JSON.stringify(value);
        this.storage.setItem(key, data);
        this.cache.set(this.name, key, v);
        this.keyChanges.next(key);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(value);
    }
    del(key) {
        this.storage.removeItem(key);
        this.cache.del(this.name, key);
        this.keyChanges.next(key);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null);
    }
    clear() {
        this.storage.clear();
        this.cache.clear(this.name);
        this.keyChanges.next(null);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null);
    }
}


/***/ }),

/***/ 5688:
/*!****************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/strategies/inMemory.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InMemoryStorageStrategy": function() { return /* binding */ InMemoryStorageStrategy; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9765);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 5917);
/* harmony import */ var _core_strategyCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/strategyCache */ 409);
/* harmony import */ var _constants_strategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/strategy */ 8457);
/* harmony import */ var _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/valueWithExpiration */ 2615);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7716);






class InMemoryStorageStrategy {
    constructor(cache) {
        this.cache = cache;
        this.keyChanges = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this.isAvailable = true;
        this.name = InMemoryStorageStrategy.strategyName;
    }
    get(key) {
        let d = this.cache.get(this.name, key);
        if (d && d._e_in) {
            const valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_2__.ValueWithExpiration(d);
            if (valueWithExpiration.isExpired()) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(null);
            }
            d = valueWithExpiration.getRealValue();
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(d);
    }
    set(key, value, expiresIn) {
        let v = value;
        if (expiresIn) {
            const valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_2__.ValueWithExpiration(value);
            valueWithExpiration.setExpiration(expiresIn);
            v = valueWithExpiration.getValueForStorage();
        }
        this.cache.set(this.name, key, v);
        this.keyChanges.next(key);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(value);
    }
    del(key) {
        this.cache.del(this.name, key);
        this.keyChanges.next(key);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(null);
    }
    clear() {
        this.cache.clear(this.name);
        this.keyChanges.next(null);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(null);
    }
}
InMemoryStorageStrategy.strategyName = _constants_strategy__WEBPACK_IMPORTED_MODULE_1__.StorageStrategies.InMemory;
InMemoryStorageStrategy.ɵfac = function InMemoryStorageStrategy_Factory(t) { return new (t || InMemoryStorageStrategy)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_strategyCache__WEBPACK_IMPORTED_MODULE_0__.StrategyCacheService)); };
InMemoryStorageStrategy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: InMemoryStorageStrategy, factory: InMemoryStorageStrategy.ɵfac });


/***/ }),

/***/ 9617:
/*!*************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/strategies/index.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STORAGE_STRATEGIES": function() { return /* binding */ STORAGE_STRATEGIES; },
/* harmony export */   "Strategies": function() { return /* binding */ Strategies; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ 1271);
/* harmony import */ var _sessionStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sessionStorage */ 3938);
/* harmony import */ var _inMemory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inMemory */ 5688);




const STORAGE_STRATEGIES = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.InjectionToken('STORAGE_STRATEGIES');
const Strategies = [
    { provide: STORAGE_STRATEGIES, useClass: _inMemory__WEBPACK_IMPORTED_MODULE_2__.InMemoryStorageStrategy, multi: true },
    { provide: STORAGE_STRATEGIES, useClass: _localStorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorageStrategy, multi: true },
    { provide: STORAGE_STRATEGIES, useClass: _sessionStorage__WEBPACK_IMPORTED_MODULE_1__.SessionStorageStrategy, multi: true },
];


/***/ }),

/***/ 1271:
/*!********************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/strategies/localStorage.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorageStrategy": function() { return /* binding */ LocalStorageStrategy; }
/* harmony export */ });
/* harmony import */ var _baseSyncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseSyncStorage */ 3611);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _core_nativeStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/nativeStorage */ 5889);
/* harmony import */ var _constants_strategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/strategy */ 8457);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _core_strategyCache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/strategyCache */ 409);







class LocalStorageStrategy extends _baseSyncStorage__WEBPACK_IMPORTED_MODULE_0__.BaseSyncStorageStrategy {
    constructor(storage, cache, platformId, zone) {
        super(storage, cache);
        this.storage = storage;
        this.cache = cache;
        this.platformId = platformId;
        this.zone = zone;
        this.name = LocalStorageStrategy.strategyName;
        if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(this.platformId))
            this.listenExternalChanges();
    }
    listenExternalChanges() {
        window.addEventListener('storage', (event) => this.zone.run(() => {
            if (event.storageArea !== this.storage)
                return;
            const key = event.key;
            if (key !== null)
                this.cache.del(this.name, event.key);
            else
                this.cache.clear(this.name);
            this.keyChanges.next(key);
        }));
    }
}
LocalStorageStrategy.strategyName = _constants_strategy__WEBPACK_IMPORTED_MODULE_2__.StorageStrategies.Local;
LocalStorageStrategy.ɵfac = function LocalStorageStrategy_Factory(t) { return new (t || LocalStorageStrategy)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_nativeStorage__WEBPACK_IMPORTED_MODULE_1__.LOCAL_STORAGE), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_strategyCache__WEBPACK_IMPORTED_MODULE_3__.StrategyCacheService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.PLATFORM_ID), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone)); };
LocalStorageStrategy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: LocalStorageStrategy, factory: LocalStorageStrategy.ɵfac });


/***/ }),

/***/ 3938:
/*!**********************************************************************!*\
  !*** ./projects/ngx-webstorage/src/lib/strategies/sessionStorage.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionStorageStrategy": function() { return /* binding */ SessionStorageStrategy; }
/* harmony export */ });
/* harmony import */ var _baseSyncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseSyncStorage */ 3611);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _core_nativeStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/nativeStorage */ 5889);
/* harmony import */ var _constants_strategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/strategy */ 8457);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _core_strategyCache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/strategyCache */ 409);







class SessionStorageStrategy extends _baseSyncStorage__WEBPACK_IMPORTED_MODULE_0__.BaseSyncStorageStrategy {
    constructor(storage, cache, platformId, zone) {
        super(storage, cache);
        this.storage = storage;
        this.cache = cache;
        this.platformId = platformId;
        this.zone = zone;
        this.name = SessionStorageStrategy.strategyName;
        if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(this.platformId))
            this.listenExternalChanges();
    }
    listenExternalChanges() {
        window.addEventListener('storage', (event) => this.zone.run(() => {
            if (event.storageArea !== this.storage)
                return;
            const key = event.key;
            if (event.key !== null)
                this.cache.del(this.name, event.key);
            else
                this.cache.clear(this.name);
            this.keyChanges.next(key);
        }));
    }
}
SessionStorageStrategy.strategyName = _constants_strategy__WEBPACK_IMPORTED_MODULE_2__.StorageStrategies.Session;
SessionStorageStrategy.ɵfac = function SessionStorageStrategy_Factory(t) { return new (t || SessionStorageStrategy)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_nativeStorage__WEBPACK_IMPORTED_MODULE_1__.SESSION_STORAGE), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_strategyCache__WEBPACK_IMPORTED_MODULE_3__.StrategyCacheService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.PLATFORM_ID), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone)); };
SessionStorageStrategy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: SessionStorageStrategy, factory: SessionStorageStrategy.ɵfac });


/***/ }),

/***/ 2258:
/*!***************************************************!*\
  !*** ./projects/ngx-webstorage/src/public_api.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageStrategies": function() { return /* reexport safe */ _lib_constants_strategy__WEBPACK_IMPORTED_MODULE_0__.StorageStrategies; },
/* harmony export */   "CompatHelper": function() { return /* reexport safe */ _lib_helpers_compat__WEBPACK_IMPORTED_MODULE_1__.CompatHelper; },
/* harmony export */   "SyncStorage": function() { return /* reexport safe */ _lib_core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_2__.SyncStorage; },
/* harmony export */   "AsyncStorage": function() { return /* reexport safe */ _lib_core_templates_asyncStorage__WEBPACK_IMPORTED_MODULE_3__.AsyncStorage; },
/* harmony export */   "StrategyCacheService": function() { return /* reexport safe */ _lib_core_strategyCache__WEBPACK_IMPORTED_MODULE_4__.StrategyCacheService; },
/* harmony export */   "LOCAL_STORAGE": function() { return /* reexport safe */ _lib_core_nativeStorage__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE; },
/* harmony export */   "SESSION_STORAGE": function() { return /* reexport safe */ _lib_core_nativeStorage__WEBPACK_IMPORTED_MODULE_5__.SESSION_STORAGE; },
/* harmony export */   "STORAGE_STRATEGIES": function() { return /* reexport safe */ _lib_strategies_index__WEBPACK_IMPORTED_MODULE_6__.STORAGE_STRATEGIES; },
/* harmony export */   "LocalStorageStrategy": function() { return /* reexport safe */ _lib_strategies_localStorage__WEBPACK_IMPORTED_MODULE_7__.LocalStorageStrategy; },
/* harmony export */   "SessionStorageStrategy": function() { return /* reexport safe */ _lib_strategies_sessionStorage__WEBPACK_IMPORTED_MODULE_8__.SessionStorageStrategy; },
/* harmony export */   "InMemoryStorageStrategy": function() { return /* reexport safe */ _lib_strategies_inMemory__WEBPACK_IMPORTED_MODULE_9__.InMemoryStorageStrategy; },
/* harmony export */   "StorageStrategyStub": function() { return /* reexport safe */ _stubs_storageStrategy_stub__WEBPACK_IMPORTED_MODULE_10__.StorageStrategyStub; },
/* harmony export */   "StorageStrategyStubName": function() { return /* reexport safe */ _stubs_storageStrategy_stub__WEBPACK_IMPORTED_MODULE_10__.StorageStrategyStubName; },
/* harmony export */   "StorageStub": function() { return /* reexport safe */ _stubs_storage_stub__WEBPACK_IMPORTED_MODULE_11__.StorageStub; },
/* harmony export */   "InvalidStrategyError": function() { return /* reexport safe */ _lib_services_strategyIndex__WEBPACK_IMPORTED_MODULE_12__.InvalidStrategyError; },
/* harmony export */   "StrategyIndex": function() { return /* reexport safe */ _lib_services_strategyIndex__WEBPACK_IMPORTED_MODULE_12__.StrategyIndex; },
/* harmony export */   "LocalStorageService": function() { return /* reexport safe */ _lib_services_localStorage__WEBPACK_IMPORTED_MODULE_13__.LocalStorageService; },
/* harmony export */   "SessionStorageService": function() { return /* reexport safe */ _lib_services_sessionStorage__WEBPACK_IMPORTED_MODULE_14__.SessionStorageService; },
/* harmony export */   "LocalStorage": function() { return /* reexport safe */ _lib_decorators__WEBPACK_IMPORTED_MODULE_16__.LocalStorage; },
/* harmony export */   "SessionStorage": function() { return /* reexport safe */ _lib_decorators__WEBPACK_IMPORTED_MODULE_16__.SessionStorage; },
/* harmony export */   "LIB_CONFIG": function() { return /* reexport safe */ _lib_module__WEBPACK_IMPORTED_MODULE_17__.LIB_CONFIG; },
/* harmony export */   "NgxWebstorageModule": function() { return /* reexport safe */ _lib_module__WEBPACK_IMPORTED_MODULE_17__.NgxWebstorageModule; },
/* harmony export */   "appInit": function() { return /* reexport safe */ _lib_module__WEBPACK_IMPORTED_MODULE_17__.appInit; }
/* harmony export */ });
/* harmony import */ var _lib_constants_strategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/constants/strategy */ 8457);
/* harmony import */ var _lib_helpers_compat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/helpers/compat */ 3025);
/* harmony import */ var _lib_core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/core/templates/syncStorage */ 9901);
/* harmony import */ var _lib_core_templates_asyncStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/core/templates/asyncStorage */ 2639);
/* harmony import */ var _lib_core_strategyCache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/core/strategyCache */ 409);
/* harmony import */ var _lib_core_nativeStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/core/nativeStorage */ 5889);
/* harmony import */ var _lib_strategies_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/strategies/index */ 9617);
/* harmony import */ var _lib_strategies_localStorage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/strategies/localStorage */ 1271);
/* harmony import */ var _lib_strategies_sessionStorage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/strategies/sessionStorage */ 3938);
/* harmony import */ var _lib_strategies_inMemory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/strategies/inMemory */ 5688);
/* harmony import */ var _stubs_storageStrategy_stub__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stubs/storageStrategy.stub */ 3850);
/* harmony import */ var _stubs_storage_stub__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stubs/storage.stub */ 6203);
/* harmony import */ var _lib_services_strategyIndex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/services/strategyIndex */ 5355);
/* harmony import */ var _lib_services_localStorage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/services/localStorage */ 130);
/* harmony import */ var _lib_services_sessionStorage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./lib/services/sessionStorage */ 2588);
/* harmony import */ var _lib_core_interfaces_storageStrategy__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./lib/core/interfaces/storageStrategy */ 7832);
/* harmony import */ var _lib_decorators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lib/decorators */ 9829);
/* harmony import */ var _lib_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./lib/module */ 1407);
/*
 * Public API Surface of ngx-webstorage
 */




















/***/ }),

/***/ 6203:
/*!***********************************************************!*\
  !*** ./projects/ngx-webstorage/src/stubs/storage.stub.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageStub": function() { return /* binding */ StorageStub; }
/* harmony export */ });
class StorageStub {
    constructor() {
        this.store = {};
    }
    get length() {
        return Object.keys(this.store).length;
    }
    clear() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    key(index) {
        return Object.keys(this.store)[index];
    }
    removeItem(key) {
        delete this.store[key];
    }
    setItem(key, value) {
        this.store[key] = value;
    }
}


/***/ }),

/***/ 3850:
/*!*******************************************************************!*\
  !*** ./projects/ngx-webstorage/src/stubs/storageStrategy.stub.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageStrategyStubName": function() { return /* binding */ StorageStrategyStubName; },
/* harmony export */   "StorageStrategyStub": function() { return /* binding */ StorageStrategyStub; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 9765);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 5917);
/* harmony import */ var _lib_helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/helpers/valueWithExpiration */ 2615);


const StorageStrategyStubName = 'stub_strategy';
class StorageStrategyStub {
    constructor(name) {
        this.keyChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this.store = {};
        this._available = true;
        this.name = name || StorageStrategyStubName;
    }
    get isAvailable() {
        return this._available;
    }
    get(key) {
        let data = this.store[key];
        if (data && data._e_in) {
            const valueWithExpiration = new _lib_helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_0__.ValueWithExpiration(data);
            if (valueWithExpiration.isExpired()) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
            }
            data = valueWithExpiration.getRealValue();
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(data);
    }
    set(key, value, expiresIn) {
        let v = value;
        if (expiresIn) {
            const valueWithExpiration = new _lib_helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_0__.ValueWithExpiration(value);
            valueWithExpiration.setExpiration(expiresIn);
            v = valueWithExpiration.getValueForStorage();
        }
        this.store[key] = v;
        this.keyChanges.next(key);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(value);
    }
    del(key) {
        delete this.store[key];
        this.keyChanges.next(key);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
    }
    clear() {
        this.store = {};
        this.keyChanges.next(null);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
    }
}


/***/ }),

/***/ 187:
/*!************************************************!*\
  !*** ./src/app/_components/appForm/appForm.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppFormComponent": function() { return /* binding */ AppFormComponent; }
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib */ 6305);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class AppFormComponent {
    constructor(fb, sessionS, localS) {
        this.fb = fb;
        this.sessionS = sessionS;
        this.localS = localS;
    }
    ngOnInit() {
        this.localS.store('object', { prop: 0 });
        this.form = this.fb.group({
            text: this.fb.control(this.sessionS.retrieve('variable'), _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required)
        });
        this.sessionS.observe('variable')
            .subscribe((data) => console.log('session variable changed : ', data));
        this.localS.observe('variable')
            .subscribe((data) => console.log('local variable changed : ', data));
    }
    submit(value, valid) {
        this.sessionS.store('variable', value.text);
    }
    randomizeBoundObjectProperty() {
        const obj = this.localS.retrieve('object');
        console.log(obj);
        obj.prop = Math.random() * 1000 | 0;
        this.localS.store('object', obj);
    }
    clear() {
        this.sessionS.clear();
    }
}
AppFormComponent.ɵfac = function AppFormComponent_Factory(t) { return new (t || AppFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_lib__WEBPACK_IMPORTED_MODULE_0__.SessionStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorageService)); };
AppFormComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppFormComponent, selectors: [["app-form"]], decls: 17, vars: 3, consts: [["novalidate", "", 3, "formGroup", "submit"], ["formControlName", "text"], ["type", "submit"], ["type", "button", 3, "click"], ["type", "text", 3, "ngModel", "ngModelChange"]], template: function AppFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("submit", function AppFormComponent_Template_form_submit_0_listener() { return ctx.submit(ctx.form.value, ctx.form.valid); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "textarea", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "submit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppFormComponent_Template_button_click_6_listener() { return ctx.clear(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function AppFormComponent_Template_input_ngModelChange_10_listener($event) { return ctx.sessionBind = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function AppFormComponent_Template_input_ngModelChange_11_listener($event) { return ctx.localBind = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppFormComponent_Template_button_click_15_listener() { return ctx.randomizeBoundObjectProperty(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "randomize object prop");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.sessionBind);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.localBind);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgModel], encapsulation: 2 });
__decorate([
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.SessionStorage)('variable')
], AppFormComponent.prototype, "sessionBind", void 0);
__decorate([
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorage)('variable', 'default value')
], AppFormComponent.prototype, "localBind", void 0);


/***/ }),

/***/ 2486:
/*!************************************************!*\
  !*** ./src/app/_components/appView/appView.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppViewComponent": function() { return /* binding */ AppViewComponent; }
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib */ 6305);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 8583);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class AppViewComponent {
}
AppViewComponent.ɵfac = function AppViewComponent_Factory(t) { return new (t || AppViewComponent)(); };
AppViewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppViewComponent, selectors: [["app-view"]], decls: 7, vars: 5, template: function AppViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "article");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "article");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "article");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("local storage: ", ctx.localBind, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("object: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 3, ctx.objectLocalBind), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("session storage: ", ctx.sessionBind, "");
    } }, pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.JsonPipe], encapsulation: 2 });
__decorate([
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.SessionStorage)('variable', 'default value')
], AppViewComponent.prototype, "sessionBind", void 0);
__decorate([
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorage)('variable')
], AppViewComponent.prototype, "localBind", void 0);
__decorate([
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorage)('object')
], AppViewComponent.prototype, "objectLocalBind", void 0);


/***/ }),

/***/ 154:
/*!******************************************!*\
  !*** ./src/app/_components/root/root.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RootComponent": function() { return /* binding */ RootComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _appView_appView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../appView/appView */ 2486);
/* harmony import */ var _appForm_appForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../appForm/appForm */ 187);
/* harmony import */ var _eager_components_eager_eager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../eager/components/eager/eager */ 5859);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 9895);





class RootComponent {
}
RootComponent.ɵfac = function RootComponent_Factory(t) { return new (t || RootComponent)(); };
RootComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: RootComponent, selectors: [["root"]], decls: 11, vars: 0, template: function RootComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "NGX WEBSTORAGE");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "section");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "app-view");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "app-form");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "eager");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "router-outlet");
    } }, directives: [_appView_appView__WEBPACK_IMPORTED_MODULE_0__.AppViewComponent, _appForm_appForm__WEBPACK_IMPORTED_MODULE_1__.AppFormComponent, _eager_components_eager_eager__WEBPACK_IMPORTED_MODULE_2__.EagerComponent, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet], encapsulation: 2 });


/***/ }),

/***/ 5859:
/*!*************************************************!*\
  !*** ./src/app/eager/components/eager/eager.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EagerComponent": function() { return /* binding */ EagerComponent; }
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ 6305);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class EagerComponent {
}
EagerComponent.ɵfac = function EagerComponent_Factory(t) { return new (t || EagerComponent)(); };
EagerComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: EagerComponent, selectors: [["eager"]], decls: 13, vars: 4, consts: [["type", "text", 3, "value", "input"]], template: function EagerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Eager module");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "article");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function EagerComponent_Template_input_input_7_listener($event) { return ctx.localBind = $event.target.value; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "article");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function EagerComponent_Template_input_input_12_listener($event) { return ctx.sessionBind = $event.target.value; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("local storage: ", ctx.localBind, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.localBind);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("session storage: ", ctx.sessionBind, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.sessionBind);
    } }, encapsulation: 2 });
__decorate([
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.SessionStorage)('variable', 'default value')
], EagerComponent.prototype, "sessionBind", void 0);
__decorate([
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorage)('variable')
], EagerComponent.prototype, "localBind", void 0);


/***/ }),

/***/ 1315:
/*!*********************************!*\
  !*** ./src/app/eager/module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EagerModule": function() { return /* binding */ EagerModule; }
/* harmony export */ });
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/module */ 1762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib */ 6305);
/* harmony import */ var _components_eager_eager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/eager/eager */ 5859);




class EagerModule {
    constructor(storage) {
    }
    static forRoot() {
        return {
            ngModule: EagerModule,
            providers: []
        };
    }
}
EagerModule.ɵfac = function EagerModule_Factory(t) { return new (t || EagerModule)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_lib__WEBPACK_IMPORTED_MODULE_1__.LocalStorageService)); };
EagerModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: EagerModule });
EagerModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](EagerModule, { declarations: [_components_eager_eager__WEBPACK_IMPORTED_MODULE_2__.EagerComponent], imports: [_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule], exports: [_components_eager_eager__WEBPACK_IMPORTED_MODULE_2__.EagerComponent] }); })();


/***/ }),

/***/ 6305:
/*!************************!*\
  !*** ./src/app/lib.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncStorage": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.AsyncStorage; },
/* harmony export */   "CompatHelper": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.CompatHelper; },
/* harmony export */   "InMemoryStorageStrategy": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.InMemoryStorageStrategy; },
/* harmony export */   "InvalidStrategyError": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.InvalidStrategyError; },
/* harmony export */   "LIB_CONFIG": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LIB_CONFIG; },
/* harmony export */   "LOCAL_STORAGE": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LOCAL_STORAGE; },
/* harmony export */   "LocalStorage": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LocalStorage; },
/* harmony export */   "LocalStorageService": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LocalStorageService; },
/* harmony export */   "LocalStorageStrategy": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LocalStorageStrategy; },
/* harmony export */   "NgxWebstorageModule": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.NgxWebstorageModule; },
/* harmony export */   "SESSION_STORAGE": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SESSION_STORAGE; },
/* harmony export */   "STORAGE_STRATEGIES": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.STORAGE_STRATEGIES; },
/* harmony export */   "SessionStorage": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SessionStorage; },
/* harmony export */   "SessionStorageService": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SessionStorageService; },
/* harmony export */   "SessionStorageStrategy": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SessionStorageStrategy; },
/* harmony export */   "StorageStrategies": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StorageStrategies; },
/* harmony export */   "StorageStrategyStub": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StorageStrategyStub; },
/* harmony export */   "StorageStrategyStubName": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StorageStrategyStubName; },
/* harmony export */   "StorageStub": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StorageStub; },
/* harmony export */   "StrategyCacheService": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StrategyCacheService; },
/* harmony export */   "StrategyIndex": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StrategyIndex; },
/* harmony export */   "SyncStorage": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SyncStorage; },
/* harmony export */   "appInit": function() { return /* reexport safe */ _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.appInit; }
/* harmony export */ });
/* harmony import */ var _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../projects/ngx-webstorage/src/public_api */ 2258);



/***/ }),

/***/ 2794:
/*!***************************!*\
  !*** ./src/app/module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": function() { return /* binding */ AppModule; }
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _components_root_root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components/root/root */ 154);
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/module */ 1762);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib */ 6305);
/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routing */ 6373);
/* harmony import */ var _eager_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eager/module */ 1315);
/* harmony import */ var _components_appForm_appForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_components/appForm/appForm */ 187);
/* harmony import */ var _components_appView_appView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_components/appView/appView */ 2486);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _projects_ngx_webstorage_src_lib_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../projects/ngx-webstorage/src/lib/module */ 1407);













class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_components_root_root__WEBPACK_IMPORTED_MODULE_0__.RootComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_8__.APP_INITIALIZER,
            useFactory: (session) => {
                console.log('app init');
                return () => {
                    console.log(session);
                };
            },
            deps: [_lib__WEBPACK_IMPORTED_MODULE_2__.LocalStorageService],
            multi: true
        },
        //{provide: STORAGE_STRATEGIES, useFactory: () => new StorageStrategyStub(LocalStorageStrategy.strategyName), multi: true}
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule,
            _shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            _routing__WEBPACK_IMPORTED_MODULE_3__.Routing,
            _eager_module__WEBPACK_IMPORTED_MODULE_4__.EagerModule,
            _lib__WEBPACK_IMPORTED_MODULE_2__.NgxWebstorageModule.forRoot({
                prefix: 'prefix',
                separator: '--'
            }),
            // NgxWebstorageCrossStorageStrategyModule.forRoot({
            // 	host: 'http://localhost.crosstorage'
            // })
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_components_root_root__WEBPACK_IMPORTED_MODULE_0__.RootComponent, _components_appForm_appForm__WEBPACK_IMPORTED_MODULE_5__.AppFormComponent, _components_appView_appView__WEBPACK_IMPORTED_MODULE_6__.AppViewComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule,
        _shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule, _eager_module__WEBPACK_IMPORTED_MODULE_4__.EagerModule, _projects_ngx_webstorage_src_lib_module__WEBPACK_IMPORTED_MODULE_7__.NgxWebstorageModule] }); })();


/***/ }),

/***/ 6373:
/*!****************************!*\
  !*** ./src/app/routing.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ROUTES": function() { return /* binding */ ROUTES; },
/* harmony export */   "Routing": function() { return /* binding */ Routing; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 9895);

const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_lazy_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./lazy/module */ 3378)).then(m => m.LazyModule)
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];
const Routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' });


/***/ }),

/***/ 1762:
/*!**********************************!*\
  !*** ./src/app/shared/module.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": function() { return /* binding */ SharedModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7716);




class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ providers: [], imports: [[], _angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SharedModule, { exports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": function() { return /* binding */ environment; }
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/module */ 2794);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendor"], function() { return __webpack_exec__(4431); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main-es2015.js.map