var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { STORAGE } from '../enums/storage';
import { WebStorageService } from './webStorage';
var SessionStorageService = (function (_super) {
    __extends(SessionStorageService, _super);
    function SessionStorageService() {
        return _super.call(this, STORAGE.session) || this;
    }
    SessionStorageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SessionStorageService.ctorParameters = function () { return []; };
    return SessionStorageService;
}(WebStorageService));
export { SessionStorageService };
//# sourceMappingURL=sessionStorage.js.map