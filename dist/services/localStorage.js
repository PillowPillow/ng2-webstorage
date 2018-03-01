'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocalStorageService = undefined;

var _core = require('@angular/core');

var _storage = require('../enums/storage');

var _webStorage = require('./webStorage');

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

var LocalStorageService = function (_super) {
    __extends(LocalStorageService, _super);
    function LocalStorageService() {
        return _super.call(this, _storage.STORAGE.local) || this;
    }
    LocalStorageService.decorators = [{ type: _core.Injectable }];
    /** @nocollapse */
    LocalStorageService.ctorParameters = function () {
        return [];
    };
    return LocalStorageService;
}(_webStorage.WebStorageService);
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localStorage.js.map