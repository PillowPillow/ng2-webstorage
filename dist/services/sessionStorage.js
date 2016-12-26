var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { STORAGE } from '../enums/storage';
import { WebStorageService } from './webStorage';
export var SessionStorageService = (function (_super) {
    __extends(SessionStorageService, _super);
    function SessionStorageService() {
        _super.call(this, STORAGE.session);
    }
    SessionStorageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SessionStorageService.ctorParameters = function () { return []; };
    return SessionStorageService;
}(WebStorageService));
//# sourceMappingURL=sessionStorage.js.map