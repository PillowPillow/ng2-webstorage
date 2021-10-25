(function () {
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (self["webpackChunkngx_webstorage_env"] = self["webpackChunkngx_webstorage_env"] || []).push([["main"], {
    /***/
    8255:
    /*!*******************************************************!*\
      !*** ./$_lazy_route_resources/ lazy namespace object ***!
      \*******************************************************/

    /***/
    function _(module) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = 8255;
      module.exports = webpackEmptyAsyncContext;
      /***/
    },

    /***/
    9907:
    /*!*************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/constants/config.ts ***!
      \*************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DefaultPrefix": function DefaultPrefix() {
          return (
            /* binding */
            _DefaultPrefix
          );
        },

        /* harmony export */
        "DefaultSeparator": function DefaultSeparator() {
          return (
            /* binding */
            _DefaultSeparator
          );
        },

        /* harmony export */
        "DefaultIsCaseSensitive": function DefaultIsCaseSensitive() {
          return (
            /* binding */
            _DefaultIsCaseSensitive
          );
        }
        /* harmony export */

      });

      var _DefaultPrefix = 'ngx-webstorage';
      var _DefaultSeparator = '|';
      var _DefaultIsCaseSensitive = false;
      /***/
    },

    /***/
    8457:
    /*!***************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/constants/strategy.ts ***!
      \***************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StorageStrategies": function StorageStrategies() {
          return (
            /* binding */
            _StorageStrategies
          );
        }
        /* harmony export */

      });

      var _StorageStrategies;

      (function (StorageStrategies) {
        StorageStrategies["Local"] = "local_strategy";
        StorageStrategies["Session"] = "session_strategy";
        StorageStrategies["InMemory"] = "in_memory_strategy";
      })(_StorageStrategies || (_StorageStrategies = {}));
      /***/

    },

    /***/
    7832:
    /*!****************************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/core/interfaces/storageStrategy.ts ***!
      \****************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /***/

    },

    /***/
    5889:
    /*!***************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/core/nativeStorage.ts ***!
      \***************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LOCAL_STORAGE": function LOCAL_STORAGE() {
          return (
            /* binding */
            _LOCAL_STORAGE
          );
        },

        /* harmony export */
        "getLocalStorage": function getLocalStorage() {
          return (
            /* binding */
            _getLocalStorage
          );
        },

        /* harmony export */
        "LocalStorageProvider": function LocalStorageProvider() {
          return (
            /* binding */
            _LocalStorageProvider
          );
        },

        /* harmony export */
        "SESSION_STORAGE": function SESSION_STORAGE() {
          return (
            /* binding */
            _SESSION_STORAGE
          );
        },

        /* harmony export */
        "getSessionStorage": function getSessionStorage() {
          return (
            /* binding */
            _getSessionStorage
          );
        },

        /* harmony export */
        "SessionStorageProvider": function SessionStorageProvider() {
          return (
            /* binding */
            _SessionStorageProvider
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      7716);

      var _LOCAL_STORAGE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('window_local_storage');

      function _getLocalStorage() {
        return typeof window !== 'undefined' ? window.localStorage : null;
      }

      var _LocalStorageProvider = {
        provide: _LOCAL_STORAGE,
        useFactory: _getLocalStorage
      };

      var _SESSION_STORAGE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('window_session_storage');

      function _getSessionStorage() {
        return typeof window !== 'undefined' ? window.sessionStorage : null;
      }

      var _SessionStorageProvider = {
        provide: _SESSION_STORAGE,
        useFactory: _getSessionStorage
      };
      /***/
    },

    /***/
    409:
    /*!***************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/core/strategyCache.ts ***!
      \***************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StrategyCacheService": function StrategyCacheService() {
          return (
            /* binding */
            _StrategyCacheService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      7716);

      var _StrategyCacheService = /*#__PURE__*/function () {
        function _StrategyCacheService() {
          _classCallCheck(this, _StrategyCacheService);

          this.caches = {};
        }

        _createClass(_StrategyCacheService, [{
          key: "get",
          value: function get(strategyName, key) {
            return this.getCacheStore(strategyName)[key];
          }
        }, {
          key: "set",
          value: function set(strategyName, key, value) {
            this.getCacheStore(strategyName)[key] = value;
          }
        }, {
          key: "del",
          value: function del(strategyName, key) {
            delete this.getCacheStore(strategyName)[key];
          }
        }, {
          key: "clear",
          value: function clear(strategyName) {
            this.caches[strategyName] = {};
          }
        }, {
          key: "getCacheStore",
          value: function getCacheStore(strategyName) {
            if (strategyName in this.caches) return this.caches[strategyName];
            return this.caches[strategyName] = {};
          }
        }]);

        return _StrategyCacheService;
      }();

      _StrategyCacheService.ɵfac = function StrategyCacheService_Factory(t) {
        return new (t || _StrategyCacheService)();
      };

      _StrategyCacheService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _StrategyCacheService,
        factory: _StrategyCacheService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    2639:
    /*!************************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/core/templates/asyncStorage.ts ***!
      \************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AsyncStorage": function AsyncStorage() {
          return (
            /* binding */
            _AsyncStorage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../helpers/storageKeyManager */
      3539);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      8002);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      5435);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      3190);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      7519);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      7349);

      var _AsyncStorage = /*#__PURE__*/function () {
        function _AsyncStorage(strategy) {
          _classCallCheck(this, _AsyncStorage);

          this.strategy = strategy;
        }

        _createClass(_AsyncStorage, [{
          key: "retrieve",
          value: function retrieve(key) {
            return this.strategy.get(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__.StorageKeyManager.normalize(key)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(function (value) {
              return typeof value === 'undefined' ? null : value;
            }));
          }
        }, {
          key: "store",
          value: function store(key, value) {
            return this.strategy.set(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__.StorageKeyManager.normalize(key), value);
          }
        }, {
          key: "clear",
          value: function clear(key) {
            return key !== undefined ? this.strategy.del(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__.StorageKeyManager.normalize(key)) : this.strategy.clear();
          }
        }, {
          key: "getStrategyName",
          value: function getStrategyName() {
            return this.strategy.name;
          }
        }, {
          key: "observe",
          value: function observe(key) {
            var _this = this;

            key = _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_0__.StorageKeyManager.normalize(key);
            return this.strategy.keyChanges.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(function (changed) {
              return changed === null || changed === key;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(function () {
              return _this.strategy.get(key);
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)(), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.shareReplay)());
          }
        }]);

        return _AsyncStorage;
      }();
      /***/

    },

    /***/
    9901:
    /*!***********************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/core/templates/syncStorage.ts ***!
      \***********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SyncStorage": function SyncStorage() {
          return (
            /* binding */
            _SyncStorage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _helpers_noop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../helpers/noop */
      2709);
      /* harmony import */


      var _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../helpers/storageKeyManager */
      3539);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      5435);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      3190);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      7519);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      7349);

      var _SyncStorage = /*#__PURE__*/function () {
        function _SyncStorage(strategy) {
          _classCallCheck(this, _SyncStorage);

          this.strategy = strategy;
        }

        _createClass(_SyncStorage, [{
          key: "retrieve",
          value: function retrieve(key) {
            var value;
            this.strategy.get(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(key)).subscribe(function (result) {
              return value = typeof result === 'undefined' ? null : result;
            });
            return value;
          }
        }, {
          key: "store",
          value: function store(key, value) {
            this.strategy.set(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(key), value).subscribe(_helpers_noop__WEBPACK_IMPORTED_MODULE_0__.noop);
            return value;
          }
        }, {
          key: "clear",
          value: function clear(key) {
            if (key !== undefined) this.strategy.del(_helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(key)).subscribe(_helpers_noop__WEBPACK_IMPORTED_MODULE_0__.noop);else this.strategy.clear().subscribe(_helpers_noop__WEBPACK_IMPORTED_MODULE_0__.noop);
          }
        }, {
          key: "getStrategyName",
          value: function getStrategyName() {
            return this.strategy.name;
          }
        }, {
          key: "observe",
          value: function observe(key) {
            var _this2 = this;

            key = _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(key);
            return this.strategy.keyChanges.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(function (changed) {
              return changed === null || changed === key;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(function () {
              return _this2.strategy.get(key);
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)(), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.shareReplay)());
          }
        }]);

        return _SyncStorage;
      }();
      /***/

    },

    /***/
    9829:
    /*!*******************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/decorators.ts ***!
      \*******************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LocalStorage": function LocalStorage() {
          return (
            /* binding */
            _LocalStorage
          );
        },

        /* harmony export */
        "SessionStorage": function SessionStorage() {
          return (
            /* binding */
            _SessionStorage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _constants_strategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./constants/strategy */
      8457);
      /* harmony import */


      var _helpers_decoratorBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./helpers/decoratorBuilder */
      7085);

      function _LocalStorage(key, defaultValue) {
        return function (prototype, propName) {
          _helpers_decoratorBuilder__WEBPACK_IMPORTED_MODULE_1__.DecoratorBuilder.buildSyncStrategyDecorator(_constants_strategy__WEBPACK_IMPORTED_MODULE_0__.StorageStrategies.Local, prototype, propName, key, defaultValue);
        };
      }

      function _SessionStorage(key, defaultValue) {
        return function (prototype, propName) {
          _helpers_decoratorBuilder__WEBPACK_IMPORTED_MODULE_1__.DecoratorBuilder.buildSyncStrategyDecorator(_constants_strategy__WEBPACK_IMPORTED_MODULE_0__.StorageStrategies.Session, prototype, propName, key, defaultValue);
        };
      }
      /***/

    },

    /***/
    3025:
    /*!***********************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/helpers/compat.ts ***!
      \***********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompatHelper": function CompatHelper() {
          return (
            /* binding */
            _CompatHelper
          );
        }
        /* harmony export */

      });

      var _CompatHelper = /*#__PURE__*/function () {
        function _CompatHelper() {
          _classCallCheck(this, _CompatHelper);
        }

        _createClass(_CompatHelper, null, [{
          key: "isStorageAvailable",
          value: function isStorageAvailable(storage) {
            var available = true;

            try {
              if (typeof storage === 'object') {
                storage.setItem('test-storage', 'foobar');
                storage.removeItem('test-storage');
              } else available = false;
            } catch (e) {
              available = false;
            }

            return available;
          }
        }, {
          key: "getUTCTime",
          value: function getUTCTime() {
            var d = new Date();
            return (d.getTime() + d.getTimezoneOffset() * 60 * 1000) / 1000;
          }
        }]);

        return _CompatHelper;
      }();
      /***/

    },

    /***/
    7085:
    /*!*********************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/helpers/decoratorBuilder.ts ***!
      \*********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DecoratorBuilder": function DecoratorBuilder() {
          return (
            /* binding */
            _DecoratorBuilder
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _services_strategyIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../services/strategyIndex */
      5355);
      /* harmony import */


      var _storageKeyManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./storageKeyManager */
      3539);
      /* harmony import */


      var _noop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./noop */
      2709);

      var _DecoratorBuilder = /*#__PURE__*/function () {
        function _DecoratorBuilder() {
          _classCallCheck(this, _DecoratorBuilder);
        }

        _createClass(_DecoratorBuilder, null, [{
          key: "buildSyncStrategyDecorator",
          value: function buildSyncStrategyDecorator(strategyName, prototype, propName, key) {
            var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
            var rawKey = key || propName;
            var storageKey;
            Object.defineProperty(prototype, propName, {
              get: function get() {
                var value;

                _services_strategyIndex__WEBPACK_IMPORTED_MODULE_0__.StrategyIndex.get(strategyName).get(getKey()).subscribe(function (result) {
                  return value = result;
                });

                return value === undefined ? defaultValue : value;
              },
              set: function set(value) {
                _services_strategyIndex__WEBPACK_IMPORTED_MODULE_0__.StrategyIndex.get(strategyName).set(getKey(), value).subscribe(_noop__WEBPACK_IMPORTED_MODULE_2__.noop);
              }
            });

            function getKey() {
              if (storageKey !== undefined) return storageKey;
              return storageKey = _storageKeyManager__WEBPACK_IMPORTED_MODULE_1__.StorageKeyManager.normalize(rawKey);
            }
          }
        }]);

        return _DecoratorBuilder;
      }();
      /***/

    },

    /***/
    2709:
    /*!*********************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/helpers/noop.ts ***!
      \*********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "noop": function noop() {
          return (
            /* binding */
            _noop
          );
        }
        /* harmony export */

      });

      function _noop() {}
      /***/

    },

    /***/
    3539:
    /*!**********************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/helpers/storageKeyManager.ts ***!
      \**********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StorageKeyManager": function StorageKeyManager() {
          return (
            /* binding */
            _StorageKeyManager
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _constants_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../constants/config */
      9907);

      var _StorageKeyManager = /*#__PURE__*/function () {
        function _StorageKeyManager() {
          _classCallCheck(this, _StorageKeyManager);
        }

        _createClass(_StorageKeyManager, null, [{
          key: "normalize",
          value: function normalize(raw) {
            raw = _StorageKeyManager.isCaseSensitive ? raw : raw.toLowerCase();
            return "".concat(_StorageKeyManager.prefix).concat(_StorageKeyManager.separator).concat(raw);
          }
        }, {
          key: "isNormalizedKey",
          value: function isNormalizedKey(key) {
            return key.indexOf(_StorageKeyManager.prefix + _StorageKeyManager.separator) === 0;
          }
        }, {
          key: "setPrefix",
          value: function setPrefix(prefix) {
            _StorageKeyManager.prefix = prefix;
          }
        }, {
          key: "setSeparator",
          value: function setSeparator(separator) {
            _StorageKeyManager.separator = separator;
          }
        }, {
          key: "setCaseSensitive",
          value: function setCaseSensitive(enable) {
            _StorageKeyManager.isCaseSensitive = enable;
          }
        }, {
          key: "consumeConfiguration",
          value: function consumeConfiguration(config) {
            if ('prefix' in config) this.setPrefix(config.prefix);
            if ('separator' in config) this.setSeparator(config.separator);
            if ('caseSensitive' in config) this.setCaseSensitive(config.caseSensitive);
          }
        }]);

        return _StorageKeyManager;
      }();

      _StorageKeyManager.prefix = _constants_config__WEBPACK_IMPORTED_MODULE_0__.DefaultPrefix;
      _StorageKeyManager.separator = _constants_config__WEBPACK_IMPORTED_MODULE_0__.DefaultSeparator;
      _StorageKeyManager.isCaseSensitive = _constants_config__WEBPACK_IMPORTED_MODULE_0__.DefaultIsCaseSensitive;
      /***/
    },

    /***/
    2615:
    /*!************************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/helpers/valueWithExpiration.ts ***!
      \************************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ValueWithExpiration": function ValueWithExpiration() {
          return (
            /* binding */
            _ValueWithExpiration
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./compat */
      3025);

      var _ValueWithExpiration = /*#__PURE__*/function () {
        function _ValueWithExpiration(v) {
          _classCallCheck(this, _ValueWithExpiration);

          this.v = v;

          if (v._e_in) {
            this._d = v;
          } else {
            this._d = {
              '_v': v
            };
          }
        }

        _createClass(_ValueWithExpiration, [{
          key: "setExpiration",
          value: function setExpiration(expiresIn) {
            this._d._e_in = _compat__WEBPACK_IMPORTED_MODULE_0__.CompatHelper.getUTCTime() + expiresIn * 1000;
          }
        }, {
          key: "isExpired",
          value: function isExpired() {
            return this._d._e_in < _compat__WEBPACK_IMPORTED_MODULE_0__.CompatHelper.getUTCTime();
          }
        }, {
          key: "getValueForStorage",
          value: function getValueForStorage() {
            return this._d;
          }
        }, {
          key: "getRealValue",
          value: function getRealValue() {
            return this._d._v;
          }
        }]);

        return _ValueWithExpiration;
      }();
      /***/

    },

    /***/
    1407:
    /*!***************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/module.ts ***!
      \***************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LIB_CONFIG": function LIB_CONFIG() {
          return (
            /* binding */
            _LIB_CONFIG
          );
        },

        /* harmony export */
        "appInit": function appInit() {
          return (
            /* binding */
            _appInit
          );
        },

        /* harmony export */
        "NgxWebstorageModule": function NgxWebstorageModule() {
          return (
            /* binding */
            _NgxWebstorageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _core_nativeStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./core/nativeStorage */
      5889);
      /* harmony import */


      var _services_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./services/index */
      6955);
      /* harmony import */


      var _strategies_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./strategies/index */
      9617);
      /* harmony import */


      var _services_strategyIndex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./services/strategyIndex */
      5355);
      /* harmony import */


      var _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./helpers/storageKeyManager */
      3539);

      var _LIB_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.InjectionToken('ngx_webstorage_config');

      function _appInit(index) {
        index.indexStrategies();
        return function () {
          return _services_strategyIndex__WEBPACK_IMPORTED_MODULE_3__.StrategyIndex.index;
        };
      }

      var _NgxWebstorageModule = /*#__PURE__*/function () {
        function _NgxWebstorageModule(index, config) {
          _classCallCheck(this, _NgxWebstorageModule);

          if (config) _helpers_storageKeyManager__WEBPACK_IMPORTED_MODULE_4__.StorageKeyManager.consumeConfiguration(config);else console.error('NgxWebstorage : Possible misconfiguration (The forRoot method usage is mandatory since the 3.0.0)');
        }

        _createClass(_NgxWebstorageModule, null, [{
          key: "forRoot",
          value: function forRoot() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return {
              ngModule: _NgxWebstorageModule,
              providers: [{
                provide: _LIB_CONFIG,
                useValue: config
              }, _core_nativeStorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorageProvider, _core_nativeStorage__WEBPACK_IMPORTED_MODULE_0__.SessionStorageProvider].concat(_toConsumableArray(_services_index__WEBPACK_IMPORTED_MODULE_1__.Services), _toConsumableArray(_strategies_index__WEBPACK_IMPORTED_MODULE_2__.Strategies), [{
                provide: _angular_core__WEBPACK_IMPORTED_MODULE_5__.APP_INITIALIZER,
                useFactory: _appInit,
                deps: [_services_strategyIndex__WEBPACK_IMPORTED_MODULE_3__.StrategyIndex],
                multi: true
              }])
            };
          }
        }]);

        return _NgxWebstorageModule;
      }();

      _NgxWebstorageModule.ɵfac = function NgxWebstorageModule_Factory(t) {
        return new (t || _NgxWebstorageModule)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_strategyIndex__WEBPACK_IMPORTED_MODULE_3__.StrategyIndex), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_LIB_CONFIG, 8));
      };

      _NgxWebstorageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: _NgxWebstorageModule
      });
      _NgxWebstorageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({});
      /***/
    },

    /***/
    6955:
    /*!***********************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/services/index.ts ***!
      \***********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "Services": function Services() {
          return (
            /* binding */
            _Services
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./localStorage */
      130);
      /* harmony import */


      var _sessionStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./sessionStorage */
      2588);

      var _Services = [_localStorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorageServiceProvider, _sessionStorage__WEBPACK_IMPORTED_MODULE_1__.SessionStorageServiceProvider];
      /***/
    },

    /***/
    130:
    /*!******************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/services/localStorage.ts ***!
      \******************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LocalStorageService": function LocalStorageService() {
          return (
            /* binding */
            _LocalStorageService
          );
        },

        /* harmony export */
        "buildService": function buildService() {
          return (
            /* binding */
            _buildService
          );
        },

        /* harmony export */
        "LocalStorageServiceProvider": function LocalStorageServiceProvider() {
          return (
            /* binding */
            _LocalStorageServiceProvider
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../core/templates/syncStorage */
      9901);
      /* harmony import */


      var _strategyIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./strategyIndex */
      5355);
      /* harmony import */


      var _constants_strategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../constants/strategy */
      8457);

      var _LocalStorageService = /*#__PURE__*/function (_core_templates_syncS) {
        _inherits(_LocalStorageService, _core_templates_syncS);

        var _super = _createSuper(_LocalStorageService);

        function _LocalStorageService() {
          _classCallCheck(this, _LocalStorageService);

          return _super.apply(this, arguments);
        }

        return _LocalStorageService;
      }(_core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__.SyncStorage);

      function _buildService(index) {
        var strategy = index.indexStrategy(_constants_strategy__WEBPACK_IMPORTED_MODULE_2__.StorageStrategies.Local);
        return new _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__.SyncStorage(strategy);
      }

      var _LocalStorageServiceProvider = {
        provide: _LocalStorageService,
        useFactory: _buildService,
        deps: [_strategyIndex__WEBPACK_IMPORTED_MODULE_1__.StrategyIndex]
      };
      /***/
    },

    /***/
    2588:
    /*!********************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/services/sessionStorage.ts ***!
      \********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SessionStorageService": function SessionStorageService() {
          return (
            /* binding */
            _SessionStorageService
          );
        },

        /* harmony export */
        "buildService": function buildService() {
          return (
            /* binding */
            _buildService2
          );
        },

        /* harmony export */
        "SessionStorageServiceProvider": function SessionStorageServiceProvider() {
          return (
            /* binding */
            _SessionStorageServiceProvider
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../core/templates/syncStorage */
      9901);
      /* harmony import */


      var _strategyIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./strategyIndex */
      5355);
      /* harmony import */


      var _constants_strategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../constants/strategy */
      8457);

      var _SessionStorageService = /*#__PURE__*/function (_core_templates_syncS2) {
        _inherits(_SessionStorageService, _core_templates_syncS2);

        var _super2 = _createSuper(_SessionStorageService);

        function _SessionStorageService() {
          _classCallCheck(this, _SessionStorageService);

          return _super2.apply(this, arguments);
        }

        return _SessionStorageService;
      }(_core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__.SyncStorage);

      function _buildService2(index) {
        var strategy = index.indexStrategy(_constants_strategy__WEBPACK_IMPORTED_MODULE_2__.StorageStrategies.Session);
        return new _core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_0__.SyncStorage(strategy);
      }

      var _SessionStorageServiceProvider = {
        provide: _SessionStorageService,
        useFactory: _buildService2,
        deps: [_strategyIndex__WEBPACK_IMPORTED_MODULE_1__.StrategyIndex]
      };
      /***/
    },

    /***/
    5355:
    /*!*******************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/services/strategyIndex.ts ***!
      \*******************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "InvalidStrategyError": function InvalidStrategyError() {
          return (
            /* binding */
            _InvalidStrategyError
          );
        },

        /* harmony export */
        "StrategyIndex": function StrategyIndex() {
          return (
            /* binding */
            _StrategyIndex
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      9765);
      /* harmony import */


      var _strategies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../strategies */
      9617);
      /* harmony import */


      var _constants_strategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../constants/strategy */
      8457);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      7716);

      var _InvalidStrategyError = 'invalid_strategy';

      var _StrategyIndex = /*#__PURE__*/function () {
        function _StrategyIndex(strategies) {
          _classCallCheck(this, _StrategyIndex);

          this.strategies = strategies;
          this.registration$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
          if (!strategies) strategies = [];
          this.strategies = strategies.reverse().map(function (strategy, index, arr) {
            return strategy.name;
          }).map(function (name, index, arr) {
            return arr.indexOf(name) === index ? index : null;
          }).filter(function (index) {
            return index !== null;
          }).map(function (index) {
            return strategies[index];
          });
        }

        _createClass(_StrategyIndex, [{
          key: "getStrategy",
          value: function getStrategy(name) {
            return _StrategyIndex.get(name);
          }
        }, {
          key: "indexStrategies",
          value: function indexStrategies() {
            var _this3 = this;

            this.strategies.forEach(function (strategy) {
              return _this3.register(strategy.name, strategy);
            });
          }
        }, {
          key: "indexStrategy",
          value: function indexStrategy(name) {
            var overrideIfExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            if (_StrategyIndex.isStrategyRegistered(name) && !overrideIfExists) return _StrategyIndex.get(name);
            var strategy = this.strategies.find(function (strategy) {
              return strategy.name === name;
            });
            if (!strategy) throw new Error(_InvalidStrategyError);
            this.register(name, strategy, overrideIfExists);
            return strategy;
          }
        }, {
          key: "register",
          value: function register(name, strategy) {
            var overrideIfExists = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!_StrategyIndex.isStrategyRegistered(name) || overrideIfExists) {
              _StrategyIndex.set(name, strategy);

              this.registration$.next(name);
            }
          }
        }], [{
          key: "get",
          value: function get(name) {
            if (!this.isStrategyRegistered(name)) throw Error(_InvalidStrategyError);
            var strategy = this.index[name];

            if (!strategy.isAvailable) {
              strategy = this.index[_constants_strategy__WEBPACK_IMPORTED_MODULE_1__.StorageStrategies.InMemory];
            }

            return strategy;
          }
        }, {
          key: "set",
          value: function set(name, strategy) {
            this.index[name] = strategy;
          }
        }, {
          key: "clear",
          value: function clear(name) {
            if (name !== undefined) delete this.index[name];else this.index = {};
          }
        }, {
          key: "isStrategyRegistered",
          value: function isStrategyRegistered(name) {
            return name in this.index;
          }
        }, {
          key: "hasRegistredStrategies",
          value: function hasRegistredStrategies() {
            return Object.keys(this.index).length > 0;
          }
        }]);

        return _StrategyIndex;
      }();

      _StrategyIndex.index = {};

      _StrategyIndex.ɵfac = function StrategyIndex_Factory(t) {
        return new (t || _StrategyIndex)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_strategies__WEBPACK_IMPORTED_MODULE_0__.STORAGE_STRATEGIES, 8));
      };

      _StrategyIndex.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: _StrategyIndex,
        factory: _StrategyIndex.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    3611:
    /*!***********************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/strategies/baseSyncStorage.ts ***!
      \***********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "BaseSyncStorageStrategy": function BaseSyncStorageStrategy() {
          return (
            /* binding */
            _BaseSyncStorageStrategy
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      9765);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs */
      5917);
      /* harmony import */


      var _helpers_compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../helpers/compat */
      3025);
      /* harmony import */


      var _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../helpers/valueWithExpiration */
      2615);

      var _BaseSyncStorageStrategy = /*#__PURE__*/function () {
        function _BaseSyncStorageStrategy(storage, cache) {
          _classCallCheck(this, _BaseSyncStorageStrategy);

          this.storage = storage;
          this.cache = cache;
          this.keyChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        }

        _createClass(_BaseSyncStorageStrategy, [{
          key: "isAvailable",
          get: function get() {
            if (this._isAvailable === undefined) this._isAvailable = _helpers_compat__WEBPACK_IMPORTED_MODULE_0__.CompatHelper.isStorageAvailable(this.storage);
            return this._isAvailable;
          }
        }, {
          key: "get",
          value: function get(key) {
            var data = this.cache.get(this.name, key);

            if (data && data._e_in) {
              var valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_1__.ValueWithExpiration(data);

              if (valueWithExpiration.isExpired()) {
                return (0, rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null);
              }

              data = valueWithExpiration.getRealValue();
            }

            if (data !== undefined) return (0, rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(data);

            try {
              var item = this.storage.getItem(key);

              if (item !== null) {
                var data1 = JSON.parse(item);

                if (data1 && data1._e_in) {
                  var _valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_1__.ValueWithExpiration(data1);

                  if (_valueWithExpiration.isExpired()) {
                    return (0, rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null);
                  }

                  data = _valueWithExpiration.getRealValue();
                } else {
                  data = data1;
                }

                this.cache.set(this.name, key, data1);
              }
            } catch (err) {
              console.warn(err);
            }

            return (0, rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(data);
          }
        }, {
          key: "set",
          value: function set(key, value, expiresIn) {
            var v = value;

            if (expiresIn) {
              var valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_1__.ValueWithExpiration(value);
              valueWithExpiration.setExpiration(expiresIn);
              v = valueWithExpiration.getValueForStorage();
            }

            var data = JSON.stringify(value);
            this.storage.setItem(key, data);
            this.cache.set(this.name, key, v);
            this.keyChanges.next(key);
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(value);
          }
        }, {
          key: "del",
          value: function del(key) {
            this.storage.removeItem(key);
            this.cache.del(this.name, key);
            this.keyChanges.next(key);
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null);
          }
        }, {
          key: "clear",
          value: function clear() {
            this.storage.clear();
            this.cache.clear(this.name);
            this.keyChanges.next(null);
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null);
          }
        }]);

        return _BaseSyncStorageStrategy;
      }();
      /***/

    },

    /***/
    5688:
    /*!****************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/strategies/inMemory.ts ***!
      \****************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "InMemoryStorageStrategy": function InMemoryStorageStrategy() {
          return (
            /* binding */
            _InMemoryStorageStrategy
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs */
      9765);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      5917);
      /* harmony import */


      var _core_strategyCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../core/strategyCache */
      409);
      /* harmony import */


      var _constants_strategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../constants/strategy */
      8457);
      /* harmony import */


      var _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../helpers/valueWithExpiration */
      2615);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      7716);

      var _InMemoryStorageStrategy = /*#__PURE__*/function () {
        function _InMemoryStorageStrategy(cache) {
          _classCallCheck(this, _InMemoryStorageStrategy);

          this.cache = cache;
          this.keyChanges = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
          this.isAvailable = true;
          this.name = _InMemoryStorageStrategy.strategyName;
        }

        _createClass(_InMemoryStorageStrategy, [{
          key: "get",
          value: function get(key) {
            var d = this.cache.get(this.name, key);

            if (d && d._e_in) {
              var valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_2__.ValueWithExpiration(d);

              if (valueWithExpiration.isExpired()) {
                return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(null);
              }

              d = valueWithExpiration.getRealValue();
            }

            return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(d);
          }
        }, {
          key: "set",
          value: function set(key, value, expiresIn) {
            var v = value;

            if (expiresIn) {
              var valueWithExpiration = new _helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_2__.ValueWithExpiration(value);
              valueWithExpiration.setExpiration(expiresIn);
              v = valueWithExpiration.getValueForStorage();
            }

            this.cache.set(this.name, key, v);
            this.keyChanges.next(key);
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(value);
          }
        }, {
          key: "del",
          value: function del(key) {
            this.cache.del(this.name, key);
            this.keyChanges.next(key);
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(null);
          }
        }, {
          key: "clear",
          value: function clear() {
            this.cache.clear(this.name);
            this.keyChanges.next(null);
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(null);
          }
        }]);

        return _InMemoryStorageStrategy;
      }();

      _InMemoryStorageStrategy.strategyName = _constants_strategy__WEBPACK_IMPORTED_MODULE_1__.StorageStrategies.InMemory;

      _InMemoryStorageStrategy.ɵfac = function InMemoryStorageStrategy_Factory(t) {
        return new (t || _InMemoryStorageStrategy)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_strategyCache__WEBPACK_IMPORTED_MODULE_0__.StrategyCacheService));
      };

      _InMemoryStorageStrategy.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
        token: _InMemoryStorageStrategy,
        factory: _InMemoryStorageStrategy.ɵfac
      });
      /***/
    },

    /***/
    9617:
    /*!*************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/strategies/index.ts ***!
      \*************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "STORAGE_STRATEGIES": function STORAGE_STRATEGIES() {
          return (
            /* binding */
            _STORAGE_STRATEGIES
          );
        },

        /* harmony export */
        "Strategies": function Strategies() {
          return (
            /* binding */
            _Strategies
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./localStorage */
      1271);
      /* harmony import */


      var _sessionStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./sessionStorage */
      3938);
      /* harmony import */


      var _inMemory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./inMemory */
      5688);

      var _STORAGE_STRATEGIES = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.InjectionToken('STORAGE_STRATEGIES');

      var _Strategies = [{
        provide: _STORAGE_STRATEGIES,
        useClass: _inMemory__WEBPACK_IMPORTED_MODULE_2__.InMemoryStorageStrategy,
        multi: true
      }, {
        provide: _STORAGE_STRATEGIES,
        useClass: _localStorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorageStrategy,
        multi: true
      }, {
        provide: _STORAGE_STRATEGIES,
        useClass: _sessionStorage__WEBPACK_IMPORTED_MODULE_1__.SessionStorageStrategy,
        multi: true
      }];
      /***/
    },

    /***/
    1271:
    /*!********************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/strategies/localStorage.ts ***!
      \********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LocalStorageStrategy": function LocalStorageStrategy() {
          return (
            /* binding */
            _LocalStorageStrategy
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _baseSyncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./baseSyncStorage */
      3611);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _core_nativeStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../core/nativeStorage */
      5889);
      /* harmony import */


      var _constants_strategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../constants/strategy */
      8457);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      8583);
      /* harmony import */


      var _core_strategyCache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../core/strategyCache */
      409);

      var _LocalStorageStrategy = /*#__PURE__*/function (_baseSyncStorage__WEB) {
        _inherits(_LocalStorageStrategy, _baseSyncStorage__WEB);

        var _super3 = _createSuper(_LocalStorageStrategy);

        function _LocalStorageStrategy(storage, cache, platformId, zone) {
          var _this4;

          _classCallCheck(this, _LocalStorageStrategy);

          _this4 = _super3.call(this, storage, cache);
          _this4.storage = storage;
          _this4.cache = cache;
          _this4.platformId = platformId;
          _this4.zone = zone;
          _this4.name = _LocalStorageStrategy.strategyName;
          if ((0, _angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(_this4.platformId)) _this4.listenExternalChanges();
          return _this4;
        }

        _createClass(_LocalStorageStrategy, [{
          key: "listenExternalChanges",
          value: function listenExternalChanges() {
            var _this5 = this;

            window.addEventListener('storage', function (event) {
              return _this5.zone.run(function () {
                if (event.storageArea !== _this5.storage) return;
                var key = event.key;
                if (key !== null) _this5.cache.del(_this5.name, event.key);else _this5.cache.clear(_this5.name);

                _this5.keyChanges.next(key);
              });
            });
          }
        }]);

        return _LocalStorageStrategy;
      }(_baseSyncStorage__WEBPACK_IMPORTED_MODULE_0__.BaseSyncStorageStrategy);

      _LocalStorageStrategy.strategyName = _constants_strategy__WEBPACK_IMPORTED_MODULE_2__.StorageStrategies.Local;

      _LocalStorageStrategy.ɵfac = function LocalStorageStrategy_Factory(t) {
        return new (t || _LocalStorageStrategy)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_nativeStorage__WEBPACK_IMPORTED_MODULE_1__.LOCAL_STORAGE), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_strategyCache__WEBPACK_IMPORTED_MODULE_3__.StrategyCacheService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.PLATFORM_ID), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone));
      };

      _LocalStorageStrategy.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
        token: _LocalStorageStrategy,
        factory: _LocalStorageStrategy.ɵfac
      });
      /***/
    },

    /***/
    3938:
    /*!**********************************************************************!*\
      !*** ./projects/ngx-webstorage/src/lib/strategies/sessionStorage.ts ***!
      \**********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SessionStorageStrategy": function SessionStorageStrategy() {
          return (
            /* binding */
            _SessionStorageStrategy
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _baseSyncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./baseSyncStorage */
      3611);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _core_nativeStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../core/nativeStorage */
      5889);
      /* harmony import */


      var _constants_strategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../constants/strategy */
      8457);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      8583);
      /* harmony import */


      var _core_strategyCache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../core/strategyCache */
      409);

      var _SessionStorageStrategy = /*#__PURE__*/function (_baseSyncStorage__WEB2) {
        _inherits(_SessionStorageStrategy, _baseSyncStorage__WEB2);

        var _super4 = _createSuper(_SessionStorageStrategy);

        function _SessionStorageStrategy(storage, cache, platformId, zone) {
          var _this6;

          _classCallCheck(this, _SessionStorageStrategy);

          _this6 = _super4.call(this, storage, cache);
          _this6.storage = storage;
          _this6.cache = cache;
          _this6.platformId = platformId;
          _this6.zone = zone;
          _this6.name = _SessionStorageStrategy.strategyName;
          if ((0, _angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(_this6.platformId)) _this6.listenExternalChanges();
          return _this6;
        }

        _createClass(_SessionStorageStrategy, [{
          key: "listenExternalChanges",
          value: function listenExternalChanges() {
            var _this7 = this;

            window.addEventListener('storage', function (event) {
              return _this7.zone.run(function () {
                if (event.storageArea !== _this7.storage) return;
                var key = event.key;
                if (event.key !== null) _this7.cache.del(_this7.name, event.key);else _this7.cache.clear(_this7.name);

                _this7.keyChanges.next(key);
              });
            });
          }
        }]);

        return _SessionStorageStrategy;
      }(_baseSyncStorage__WEBPACK_IMPORTED_MODULE_0__.BaseSyncStorageStrategy);

      _SessionStorageStrategy.strategyName = _constants_strategy__WEBPACK_IMPORTED_MODULE_2__.StorageStrategies.Session;

      _SessionStorageStrategy.ɵfac = function SessionStorageStrategy_Factory(t) {
        return new (t || _SessionStorageStrategy)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_nativeStorage__WEBPACK_IMPORTED_MODULE_1__.SESSION_STORAGE), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_strategyCache__WEBPACK_IMPORTED_MODULE_3__.StrategyCacheService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.PLATFORM_ID), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone));
      };

      _SessionStorageStrategy.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
        token: _SessionStorageStrategy,
        factory: _SessionStorageStrategy.ɵfac
      });
      /***/
    },

    /***/
    2258:
    /*!***************************************************!*\
      !*** ./projects/ngx-webstorage/src/public_api.ts ***!
      \***************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StorageStrategies": function StorageStrategies() {
          return (
            /* reexport safe */
            _lib_constants_strategy__WEBPACK_IMPORTED_MODULE_0__.StorageStrategies
          );
        },

        /* harmony export */
        "CompatHelper": function CompatHelper() {
          return (
            /* reexport safe */
            _lib_helpers_compat__WEBPACK_IMPORTED_MODULE_1__.CompatHelper
          );
        },

        /* harmony export */
        "SyncStorage": function SyncStorage() {
          return (
            /* reexport safe */
            _lib_core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_2__.SyncStorage
          );
        },

        /* harmony export */
        "AsyncStorage": function AsyncStorage() {
          return (
            /* reexport safe */
            _lib_core_templates_asyncStorage__WEBPACK_IMPORTED_MODULE_3__.AsyncStorage
          );
        },

        /* harmony export */
        "StrategyCacheService": function StrategyCacheService() {
          return (
            /* reexport safe */
            _lib_core_strategyCache__WEBPACK_IMPORTED_MODULE_4__.StrategyCacheService
          );
        },

        /* harmony export */
        "LOCAL_STORAGE": function LOCAL_STORAGE() {
          return (
            /* reexport safe */
            _lib_core_nativeStorage__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE
          );
        },

        /* harmony export */
        "SESSION_STORAGE": function SESSION_STORAGE() {
          return (
            /* reexport safe */
            _lib_core_nativeStorage__WEBPACK_IMPORTED_MODULE_5__.SESSION_STORAGE
          );
        },

        /* harmony export */
        "STORAGE_STRATEGIES": function STORAGE_STRATEGIES() {
          return (
            /* reexport safe */
            _lib_strategies_index__WEBPACK_IMPORTED_MODULE_6__.STORAGE_STRATEGIES
          );
        },

        /* harmony export */
        "LocalStorageStrategy": function LocalStorageStrategy() {
          return (
            /* reexport safe */
            _lib_strategies_localStorage__WEBPACK_IMPORTED_MODULE_7__.LocalStorageStrategy
          );
        },

        /* harmony export */
        "SessionStorageStrategy": function SessionStorageStrategy() {
          return (
            /* reexport safe */
            _lib_strategies_sessionStorage__WEBPACK_IMPORTED_MODULE_8__.SessionStorageStrategy
          );
        },

        /* harmony export */
        "InMemoryStorageStrategy": function InMemoryStorageStrategy() {
          return (
            /* reexport safe */
            _lib_strategies_inMemory__WEBPACK_IMPORTED_MODULE_9__.InMemoryStorageStrategy
          );
        },

        /* harmony export */
        "StorageStrategyStub": function StorageStrategyStub() {
          return (
            /* reexport safe */
            _stubs_storageStrategy_stub__WEBPACK_IMPORTED_MODULE_10__.StorageStrategyStub
          );
        },

        /* harmony export */
        "StorageStrategyStubName": function StorageStrategyStubName() {
          return (
            /* reexport safe */
            _stubs_storageStrategy_stub__WEBPACK_IMPORTED_MODULE_10__.StorageStrategyStubName
          );
        },

        /* harmony export */
        "StorageStub": function StorageStub() {
          return (
            /* reexport safe */
            _stubs_storage_stub__WEBPACK_IMPORTED_MODULE_11__.StorageStub
          );
        },

        /* harmony export */
        "InvalidStrategyError": function InvalidStrategyError() {
          return (
            /* reexport safe */
            _lib_services_strategyIndex__WEBPACK_IMPORTED_MODULE_12__.InvalidStrategyError
          );
        },

        /* harmony export */
        "StrategyIndex": function StrategyIndex() {
          return (
            /* reexport safe */
            _lib_services_strategyIndex__WEBPACK_IMPORTED_MODULE_12__.StrategyIndex
          );
        },

        /* harmony export */
        "LocalStorageService": function LocalStorageService() {
          return (
            /* reexport safe */
            _lib_services_localStorage__WEBPACK_IMPORTED_MODULE_13__.LocalStorageService
          );
        },

        /* harmony export */
        "SessionStorageService": function SessionStorageService() {
          return (
            /* reexport safe */
            _lib_services_sessionStorage__WEBPACK_IMPORTED_MODULE_14__.SessionStorageService
          );
        },

        /* harmony export */
        "LocalStorage": function LocalStorage() {
          return (
            /* reexport safe */
            _lib_decorators__WEBPACK_IMPORTED_MODULE_16__.LocalStorage
          );
        },

        /* harmony export */
        "SessionStorage": function SessionStorage() {
          return (
            /* reexport safe */
            _lib_decorators__WEBPACK_IMPORTED_MODULE_16__.SessionStorage
          );
        },

        /* harmony export */
        "LIB_CONFIG": function LIB_CONFIG() {
          return (
            /* reexport safe */
            _lib_module__WEBPACK_IMPORTED_MODULE_17__.LIB_CONFIG
          );
        },

        /* harmony export */
        "NgxWebstorageModule": function NgxWebstorageModule() {
          return (
            /* reexport safe */
            _lib_module__WEBPACK_IMPORTED_MODULE_17__.NgxWebstorageModule
          );
        },

        /* harmony export */
        "appInit": function appInit() {
          return (
            /* reexport safe */
            _lib_module__WEBPACK_IMPORTED_MODULE_17__.appInit
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _lib_constants_strategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./lib/constants/strategy */
      8457);
      /* harmony import */


      var _lib_helpers_compat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./lib/helpers/compat */
      3025);
      /* harmony import */


      var _lib_core_templates_syncStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./lib/core/templates/syncStorage */
      9901);
      /* harmony import */


      var _lib_core_templates_asyncStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./lib/core/templates/asyncStorage */
      2639);
      /* harmony import */


      var _lib_core_strategyCache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./lib/core/strategyCache */
      409);
      /* harmony import */


      var _lib_core_nativeStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./lib/core/nativeStorage */
      5889);
      /* harmony import */


      var _lib_strategies_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./lib/strategies/index */
      9617);
      /* harmony import */


      var _lib_strategies_localStorage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./lib/strategies/localStorage */
      1271);
      /* harmony import */


      var _lib_strategies_sessionStorage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./lib/strategies/sessionStorage */
      3938);
      /* harmony import */


      var _lib_strategies_inMemory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./lib/strategies/inMemory */
      5688);
      /* harmony import */


      var _stubs_storageStrategy_stub__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./stubs/storageStrategy.stub */
      3850);
      /* harmony import */


      var _stubs_storage_stub__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./stubs/storage.stub */
      6203);
      /* harmony import */


      var _lib_services_strategyIndex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./lib/services/strategyIndex */
      5355);
      /* harmony import */


      var _lib_services_localStorage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ./lib/services/localStorage */
      130);
      /* harmony import */


      var _lib_services_sessionStorage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./lib/services/sessionStorage */
      2588);
      /* harmony import */


      var _lib_core_interfaces_storageStrategy__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ./lib/core/interfaces/storageStrategy */
      7832);
      /* harmony import */


      var _lib_decorators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./lib/decorators */
      9829);
      /* harmony import */


      var _lib_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ./lib/module */
      1407);
      /*
       * Public API Surface of ngx-webstorage
       */

      /***/

    },

    /***/
    6203:
    /*!***********************************************************!*\
      !*** ./projects/ngx-webstorage/src/stubs/storage.stub.ts ***!
      \***********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StorageStub": function StorageStub() {
          return (
            /* binding */
            _StorageStub
          );
        }
        /* harmony export */

      });

      var _StorageStub = /*#__PURE__*/function () {
        function _StorageStub() {
          _classCallCheck(this, _StorageStub);

          this.store = {};
        }

        _createClass(_StorageStub, [{
          key: "length",
          get: function get() {
            return Object.keys(this.store).length;
          }
        }, {
          key: "clear",
          value: function clear() {
            this.store = {};
          }
        }, {
          key: "getItem",
          value: function getItem(key) {
            return this.store[key] || null;
          }
        }, {
          key: "key",
          value: function key(index) {
            return Object.keys(this.store)[index];
          }
        }, {
          key: "removeItem",
          value: function removeItem(key) {
            delete this.store[key];
          }
        }, {
          key: "setItem",
          value: function setItem(key, value) {
            this.store[key] = value;
          }
        }]);

        return _StorageStub;
      }();
      /***/

    },

    /***/
    3850:
    /*!*******************************************************************!*\
      !*** ./projects/ngx-webstorage/src/stubs/storageStrategy.stub.ts ***!
      \*******************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StorageStrategyStubName": function StorageStrategyStubName() {
          return (
            /* binding */
            _StorageStrategyStubName
          );
        },

        /* harmony export */
        "StorageStrategyStub": function StorageStrategyStub() {
          return (
            /* binding */
            _StorageStrategyStub
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      9765);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      5917);
      /* harmony import */


      var _lib_helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../lib/helpers/valueWithExpiration */
      2615);

      var _StorageStrategyStubName = 'stub_strategy';

      var _StorageStrategyStub = /*#__PURE__*/function () {
        function _StorageStrategyStub(name) {
          _classCallCheck(this, _StorageStrategyStub);

          this.keyChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
          this.store = {};
          this._available = true;
          this.name = name || _StorageStrategyStubName;
        }

        _createClass(_StorageStrategyStub, [{
          key: "isAvailable",
          get: function get() {
            return this._available;
          }
        }, {
          key: "get",
          value: function get(key) {
            var data = this.store[key];

            if (data && data._e_in) {
              var valueWithExpiration = new _lib_helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_0__.ValueWithExpiration(data);

              if (valueWithExpiration.isExpired()) {
                return (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
              }

              data = valueWithExpiration.getRealValue();
            }

            return (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(data);
          }
        }, {
          key: "set",
          value: function set(key, value, expiresIn) {
            var v = value;

            if (expiresIn) {
              var valueWithExpiration = new _lib_helpers_valueWithExpiration__WEBPACK_IMPORTED_MODULE_0__.ValueWithExpiration(value);
              valueWithExpiration.setExpiration(expiresIn);
              v = valueWithExpiration.getValueForStorage();
            }

            this.store[key] = v;
            this.keyChanges.next(key);
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(value);
          }
        }, {
          key: "del",
          value: function del(key) {
            delete this.store[key];
            this.keyChanges.next(key);
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
          }
        }, {
          key: "clear",
          value: function clear() {
            this.store = {};
            this.keyChanges.next(null);
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
          }
        }]);

        return _StorageStrategyStub;
      }();
      /***/

    },

    /***/
    187:
    /*!************************************************!*\
      !*** ./src/app/_components/appForm/appForm.ts ***!
      \************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppFormComponent": function AppFormComponent() {
          return (
            /* binding */
            _AppFormComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../lib */
      6305);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      7716);

      var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
          if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        }
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };

      var _AppFormComponent = /*#__PURE__*/function () {
        function _AppFormComponent(fb, sessionS, localS) {
          _classCallCheck(this, _AppFormComponent);

          this.fb = fb;
          this.sessionS = sessionS;
          this.localS = localS;
        }

        _createClass(_AppFormComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.localS.store('object', {
              prop: 0
            });
            this.form = this.fb.group({
              text: this.fb.control(this.sessionS.retrieve('variable'), _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required)
            });
            this.sessionS.observe('variable').subscribe(function (data) {
              return console.log('session variable changed : ', data);
            });
            this.localS.observe('variable').subscribe(function (data) {
              return console.log('local variable changed : ', data);
            });
          }
        }, {
          key: "submit",
          value: function submit(value, valid) {
            this.sessionS.store('variable', value.text);
          }
        }, {
          key: "randomizeBoundObjectProperty",
          value: function randomizeBoundObjectProperty() {
            var obj = this.localS.retrieve('object');
            console.log(obj);
            obj.prop = Math.random() * 1000 | 0;
            this.localS.store('object', obj);
          }
        }, {
          key: "clear",
          value: function clear() {
            this.sessionS.clear();
          }
        }]);

        return _AppFormComponent;
      }();

      _AppFormComponent.ɵfac = function AppFormComponent_Factory(t) {
        return new (t || _AppFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_lib__WEBPACK_IMPORTED_MODULE_0__.SessionStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorageService));
      };

      _AppFormComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _AppFormComponent,
        selectors: [["app-form"]],
        decls: 17,
        vars: 3,
        consts: [["novalidate", "", 3, "formGroup", "submit"], ["formControlName", "text"], ["type", "submit"], ["type", "button", 3, "click"], ["type", "text", 3, "ngModel", "ngModelChange"]],
        template: function AppFormComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "form", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("submit", function AppFormComponent_Template_form_submit_0_listener() {
              return ctx.submit(ctx.form.value, ctx.form.valid);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "textarea", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "submit");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppFormComponent_Template_button_click_6_listener() {
              return ctx.clear();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "clear");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "hr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "input", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function AppFormComponent_Template_input_ngModelChange_10_listener($event) {
              return ctx.sessionBind = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "input", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function AppFormComponent_Template_input_ngModelChange_11_listener($event) {
              return ctx.localBind = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "hr");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "button", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppFormComponent_Template_button_click_15_listener() {
              return ctx.randomizeBoundObjectProperty();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "randomize object prop");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.sessionBind);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.localBind);
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgModel],
        encapsulation: 2
      });

      __decorate([(0, _lib__WEBPACK_IMPORTED_MODULE_0__.SessionStorage)('variable')], _AppFormComponent.prototype, "sessionBind", void 0);

      __decorate([(0, _lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorage)('variable', 'default value')], _AppFormComponent.prototype, "localBind", void 0);
      /***/

    },

    /***/
    2486:
    /*!************************************************!*\
      !*** ./src/app/_components/appView/appView.ts ***!
      \************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppViewComponent": function AppViewComponent() {
          return (
            /* binding */
            _AppViewComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../lib */
      6305);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      8583);

      var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
          if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        }
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };

      var _AppViewComponent = function _AppViewComponent() {
        _classCallCheck(this, _AppViewComponent);
      };

      _AppViewComponent.ɵfac = function AppViewComponent_Factory(t) {
        return new (t || _AppViewComponent)();
      };

      _AppViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _AppViewComponent,
        selectors: [["app-view"]],
        decls: 7,
        vars: 5,
        template: function AppViewComponent_Template(rf, ctx) {
          if (rf & 1) {
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
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("local storage: ", ctx.localBind, "");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("object: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 3, ctx.objectLocalBind), "");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("session storage: ", ctx.sessionBind, "");
          }
        },
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.JsonPipe],
        encapsulation: 2
      });

      __decorate([(0, _lib__WEBPACK_IMPORTED_MODULE_0__.SessionStorage)('variable', 'default value')], _AppViewComponent.prototype, "sessionBind", void 0);

      __decorate([(0, _lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorage)('variable')], _AppViewComponent.prototype, "localBind", void 0);

      __decorate([(0, _lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorage)('object')], _AppViewComponent.prototype, "objectLocalBind", void 0);
      /***/

    },

    /***/
    154:
    /*!******************************************!*\
      !*** ./src/app/_components/root/root.ts ***!
      \******************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "RootComponent": function RootComponent() {
          return (
            /* binding */
            _RootComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _appView_appView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../appView/appView */
      2486);
      /* harmony import */


      var _appForm_appForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../appForm/appForm */
      187);
      /* harmony import */


      var _eager_components_eager_eager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../eager/components/eager/eager */
      5859);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      9895);

      var _RootComponent = function _RootComponent() {
        _classCallCheck(this, _RootComponent);
      };

      _RootComponent.ɵfac = function RootComponent_Factory(t) {
        return new (t || _RootComponent)();
      };

      _RootComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _RootComponent,
        selectors: [["root"]],
        decls: 11,
        vars: 0,
        template: function RootComponent_Template(rf, ctx) {
          if (rf & 1) {
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
          }
        },
        directives: [_appView_appView__WEBPACK_IMPORTED_MODULE_0__.AppViewComponent, _appForm_appForm__WEBPACK_IMPORTED_MODULE_1__.AppFormComponent, _eager_components_eager_eager__WEBPACK_IMPORTED_MODULE_2__.EagerComponent, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet],
        encapsulation: 2
      });
      /***/
    },

    /***/
    5859:
    /*!*************************************************!*\
      !*** ./src/app/eager/components/eager/eager.ts ***!
      \*************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "EagerComponent": function EagerComponent() {
          return (
            /* binding */
            _EagerComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../lib */
      6305);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      7716);

      var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
          if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        }
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };

      var _EagerComponent = function _EagerComponent() {
        _classCallCheck(this, _EagerComponent);
      };

      _EagerComponent.ɵfac = function EagerComponent_Factory(t) {
        return new (t || _EagerComponent)();
      };

      _EagerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _EagerComponent,
        selectors: [["eager"]],
        decls: 13,
        vars: 4,
        consts: [["type", "text", 3, "value", "input"]],
        template: function EagerComponent_Template(rf, ctx) {
          if (rf & 1) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function EagerComponent_Template_input_input_7_listener($event) {
              return ctx.localBind = $event.target.value;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "article");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "input", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function EagerComponent_Template_input_input_12_listener($event) {
              return ctx.sessionBind = $event.target.value;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("local storage: ", ctx.localBind, "");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.localBind);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("session storage: ", ctx.sessionBind, "");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.sessionBind);
          }
        },
        encapsulation: 2
      });

      __decorate([(0, _lib__WEBPACK_IMPORTED_MODULE_0__.SessionStorage)('variable', 'default value')], _EagerComponent.prototype, "sessionBind", void 0);

      __decorate([(0, _lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorage)('variable')], _EagerComponent.prototype, "localBind", void 0);
      /***/

    },

    /***/
    1315:
    /*!*********************************!*\
      !*** ./src/app/eager/module.ts ***!
      \*********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "EagerModule": function EagerModule() {
          return (
            /* binding */
            _EagerModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../shared/module */
      1762);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../lib */
      6305);
      /* harmony import */


      var _components_eager_eager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./components/eager/eager */
      5859);

      var _EagerModule = /*#__PURE__*/function () {
        function _EagerModule(storage) {
          _classCallCheck(this, _EagerModule);
        }

        _createClass(_EagerModule, null, [{
          key: "forRoot",
          value: function forRoot() {
            return {
              ngModule: _EagerModule,
              providers: []
            };
          }
        }]);

        return _EagerModule;
      }();

      _EagerModule.ɵfac = function EagerModule_Factory(t) {
        return new (t || _EagerModule)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_lib__WEBPACK_IMPORTED_MODULE_1__.LocalStorageService));
      };

      _EagerModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _EagerModule
      });
      _EagerModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        providers: [],
        imports: [[_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_EagerModule, {
          declarations: [_components_eager_eager__WEBPACK_IMPORTED_MODULE_2__.EagerComponent],
          imports: [_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule],
          exports: [_components_eager_eager__WEBPACK_IMPORTED_MODULE_2__.EagerComponent]
        });
      })();
      /***/

    },

    /***/
    6305:
    /*!************************!*\
      !*** ./src/app/lib.ts ***!
      \************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AsyncStorage": function AsyncStorage() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.AsyncStorage
          );
        },

        /* harmony export */
        "CompatHelper": function CompatHelper() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.CompatHelper
          );
        },

        /* harmony export */
        "InMemoryStorageStrategy": function InMemoryStorageStrategy() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.InMemoryStorageStrategy
          );
        },

        /* harmony export */
        "InvalidStrategyError": function InvalidStrategyError() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.InvalidStrategyError
          );
        },

        /* harmony export */
        "LIB_CONFIG": function LIB_CONFIG() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LIB_CONFIG
          );
        },

        /* harmony export */
        "LOCAL_STORAGE": function LOCAL_STORAGE() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LOCAL_STORAGE
          );
        },

        /* harmony export */
        "LocalStorage": function LocalStorage() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LocalStorage
          );
        },

        /* harmony export */
        "LocalStorageService": function LocalStorageService() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LocalStorageService
          );
        },

        /* harmony export */
        "LocalStorageStrategy": function LocalStorageStrategy() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.LocalStorageStrategy
          );
        },

        /* harmony export */
        "NgxWebstorageModule": function NgxWebstorageModule() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.NgxWebstorageModule
          );
        },

        /* harmony export */
        "SESSION_STORAGE": function SESSION_STORAGE() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SESSION_STORAGE
          );
        },

        /* harmony export */
        "STORAGE_STRATEGIES": function STORAGE_STRATEGIES() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.STORAGE_STRATEGIES
          );
        },

        /* harmony export */
        "SessionStorage": function SessionStorage() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SessionStorage
          );
        },

        /* harmony export */
        "SessionStorageService": function SessionStorageService() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SessionStorageService
          );
        },

        /* harmony export */
        "SessionStorageStrategy": function SessionStorageStrategy() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SessionStorageStrategy
          );
        },

        /* harmony export */
        "StorageStrategies": function StorageStrategies() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StorageStrategies
          );
        },

        /* harmony export */
        "StorageStrategyStub": function StorageStrategyStub() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StorageStrategyStub
          );
        },

        /* harmony export */
        "StorageStrategyStubName": function StorageStrategyStubName() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StorageStrategyStubName
          );
        },

        /* harmony export */
        "StorageStub": function StorageStub() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StorageStub
          );
        },

        /* harmony export */
        "StrategyCacheService": function StrategyCacheService() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StrategyCacheService
          );
        },

        /* harmony export */
        "StrategyIndex": function StrategyIndex() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.StrategyIndex
          );
        },

        /* harmony export */
        "SyncStorage": function SyncStorage() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.SyncStorage
          );
        },

        /* harmony export */
        "appInit": function appInit() {
          return (
            /* reexport safe */
            _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__.appInit
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _projects_ngx_webstorage_src_public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../projects/ngx-webstorage/src/public_api */
      2258);
      /***/

    },

    /***/
    2794:
    /*!***************************!*\
      !*** ./src/app/module.ts ***!
      \***************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppModule": function AppModule() {
          return (
            /* binding */
            _AppModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/platform-browser */
      9075);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _components_root_root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./_components/root/root */
      154);
      /* harmony import */


      var _shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./shared/module */
      1762);
      /* harmony import */


      var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./lib */
      6305);
      /* harmony import */


      var _routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./routing */
      6373);
      /* harmony import */


      var _eager_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./eager/module */
      1315);
      /* harmony import */


      var _components_appForm_appForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./_components/appForm/appForm */
      187);
      /* harmony import */


      var _components_appView_appView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./_components/appView/appView */
      2486);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/router */
      9895);
      /* harmony import */


      var _projects_ngx_webstorage_src_lib_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../projects/ngx-webstorage/src/lib/module */
      1407);

      var _AppModule = function _AppModule() {
        _classCallCheck(this, _AppModule);
      };

      _AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || _AppModule)();
      };

      _AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
        type: _AppModule,
        bootstrap: [_components_root_root__WEBPACK_IMPORTED_MODULE_0__.RootComponent]
      });
      _AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
        providers: [{
          provide: _angular_core__WEBPACK_IMPORTED_MODULE_8__.APP_INITIALIZER,
          useFactory: function useFactory(session) {
            console.log('app init');
            return function () {
              console.log(session);
            };
          },
          deps: [_lib__WEBPACK_IMPORTED_MODULE_2__.LocalStorageService],
          multi: true
        } //{provide: STORAGE_STRATEGIES, useFactory: () => new StorageStrategyStub(LocalStorageStrategy.strategyName), multi: true}
        ],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _routing__WEBPACK_IMPORTED_MODULE_3__.Routing, _eager_module__WEBPACK_IMPORTED_MODULE_4__.EagerModule, _lib__WEBPACK_IMPORTED_MODULE_2__.NgxWebstorageModule.forRoot({
          prefix: 'prefix',
          separator: '--'
        }) // NgxWebstorageCrossStorageStrategyModule.forRoot({
        // 	host: 'http://localhost.crosstorage'
        // })
        ]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](_AppModule, {
          declarations: [_components_root_root__WEBPACK_IMPORTED_MODULE_0__.RootComponent, _components_appForm_appForm__WEBPACK_IMPORTED_MODULE_5__.AppFormComponent, _components_appView_appView__WEBPACK_IMPORTED_MODULE_6__.AppViewComponent],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule, _eager_module__WEBPACK_IMPORTED_MODULE_4__.EagerModule, _projects_ngx_webstorage_src_lib_module__WEBPACK_IMPORTED_MODULE_7__.NgxWebstorageModule]
        });
      })();
      /***/

    },

    /***/
    6373:
    /*!****************************!*\
      !*** ./src/app/routing.ts ***!
      \****************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ROUTES": function ROUTES() {
          return (
            /* binding */
            _ROUTES
          );
        },

        /* harmony export */
        "Routing": function Routing() {
          return (
            /* binding */
            _Routing
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/router */
      9895);

      var _ROUTES = [{
        path: '',
        children: [{
          path: '',
          loadChildren: function loadChildren() {
            return __webpack_require__.e(
            /*! import() */
            "src_app_lazy_module_ts").then(__webpack_require__.bind(__webpack_require__,
            /*! ./lazy/module */
            3378)).then(function (m) {
              return m.LazyModule;
            });
          }
        }, {
          path: '**',
          redirectTo: ''
        }]
      }];

      var _Routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule.forRoot(_ROUTES, {
        relativeLinkResolution: 'legacy'
      });
      /***/

    },

    /***/
    1762:
    /*!**********************************!*\
      !*** ./src/app/shared/module.ts ***!
      \**********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SharedModule": function SharedModule() {
          return (
            /* binding */
            _SharedModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      8583);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      9895);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      7716);

      var _SharedModule = function _SharedModule() {
        _classCallCheck(this, _SharedModule);
      };

      _SharedModule.ɵfac = function SharedModule_Factory(t) {
        return new (t || _SharedModule)();
      };

      _SharedModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: _SharedModule
      });
      _SharedModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        providers: [],
        imports: [[], _angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](_SharedModule, {
          exports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    2340:
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "environment": function environment() {
          return (
            /* binding */
            _environment
          );
        }
        /* harmony export */

      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var _environment = {
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

      /***/
    },

    /***/
    4431:
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      9075);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app/module */
      2794);
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      2340);

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
        (0, _angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)["catch"](function (err) {
        return console.error(err);
      });
      /***/

    }
  },
  /******/
  function (__webpack_require__) {
    // webpackRuntimeModules

    /******/
    "use strict";
    /******/

    /******/

    var __webpack_exec__ = function __webpack_exec__(moduleId) {
      return __webpack_require__(__webpack_require__.s = moduleId);
    };
    /******/


    __webpack_require__.O(0, ["vendor"], function () {
      return __webpack_exec__(4431);
    });
    /******/


    var __webpack_exports__ = __webpack_require__.O();
    /******/

  }]);
})();
//# sourceMappingURL=main-es5.js.map