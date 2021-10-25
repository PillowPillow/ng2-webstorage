(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkngx_webstorage_env"] = self["webpackChunkngx_webstorage_env"] || []).push([["src_app_lazy_module_ts"], {
    /***/
    585:
    /*!**********************************************!*\
      !*** ./src/app/lazy/components/lazy/lazy.ts ***!
      \**********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LazyComponent": function LazyComponent() {
          return (
            /* binding */
            _LazyComponent
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

      var _LazyComponent = function _LazyComponent() {
        _classCallCheck(this, _LazyComponent);
      };

      _LazyComponent.ɵfac = function LazyComponent_Factory(t) {
        return new (t || _LazyComponent)();
      };

      _LazyComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _LazyComponent,
        selectors: [["lazy"]],
        decls: 13,
        vars: 4,
        consts: [["type", "text", 3, "value", "input"]],
        template: function LazyComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Lazy module");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "article");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function LazyComponent_Template_input_input_7_listener($event) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function LazyComponent_Template_input_input_12_listener($event) {
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

      __decorate([(0, _lib__WEBPACK_IMPORTED_MODULE_0__.SessionStorage)('variable', 'default value')], _LazyComponent.prototype, "sessionBind", void 0);

      __decorate([(0, _lib__WEBPACK_IMPORTED_MODULE_0__.LocalStorage)('variable')], _LazyComponent.prototype, "localBind", void 0);
      /***/

    },

    /***/
    3378:
    /*!********************************!*\
      !*** ./src/app/lazy/module.ts ***!
      \********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LazyModule": function LazyModule() {
          return (
            /* binding */
            _LazyModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../shared/module */
      1762);
      /* harmony import */


      var _routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./routing */
      7459);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      7716);
      /* harmony import */


      var _components_lazy_lazy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./components/lazy/lazy */
      585);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      9895);

      var _LazyModule = function _LazyModule() {
        _classCallCheck(this, _LazyModule);
      };

      _LazyModule.ɵfac = function LazyModule_Factory(t) {
        return new (t || _LazyModule)();
      };

      _LazyModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _LazyModule
      });
      _LazyModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        providers: [],
        imports: [[_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _routing__WEBPACK_IMPORTED_MODULE_1__.Routing]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_LazyModule, {
          declarations: [_components_lazy_lazy__WEBPACK_IMPORTED_MODULE_2__.LazyComponent],
          imports: [_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    7459:
    /*!*********************************!*\
      !*** ./src/app/lazy/routing.ts ***!
      \*********************************/

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


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      9895);
      /* harmony import */


      var _components_lazy_lazy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./components/lazy/lazy */
      585);

      var _ROUTES = [{
        path: '',
        component: _components_lazy_lazy__WEBPACK_IMPORTED_MODULE_0__.LazyComponent
      }];

      var _Routing = _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(_ROUTES);
      /***/

    }
  }]);
})();
//# sourceMappingURL=src_app_lazy_module_ts-es5.js.map