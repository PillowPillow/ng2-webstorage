var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { STORAGE } from '../enums/storage';
import { WebStorageService } from './webStorage';
export var LocalStorageService = (function (_super) {
    __extends(LocalStorageService, _super);
    function LocalStorageService() {
        _super.call(this, STORAGE.local);
    }
    LocalStorageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LocalStorageService.ctorParameters = function () { return []; };
    return LocalStorageService;
}(WebStorageService));
//# sourceMappingURL=localStorage.js.map