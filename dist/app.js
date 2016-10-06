var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LocalStorageService, SessionStorageService } from './services/index';
export * from './decorators/index';
export * from './interfaces/index';
export * from './services/index';
export * from './helpers/keyStorage';
export var Ng2Webstorage = (function () {
    function Ng2Webstorage() {
    }
    Ng2Webstorage = __decorate([
        NgModule({
            declarations: [],
            providers: [SessionStorageService, LocalStorageService],
            imports: []
        })
    ], Ng2Webstorage);
    return Ng2Webstorage;
}());
//# sourceMappingURL=app.js.map