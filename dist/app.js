import { NgModule } from '@angular/core';
import { LocalStorageService, SessionStorageService } from './services/index';
export * from './interfaces/index';
export * from './helpers/keyStorage';
export * from './decorators/index';
export * from './services/index';
export var Ng2Webstorage = (function () {
    function Ng2Webstorage() {
    }
    Ng2Webstorage.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    providers: [SessionStorageService, LocalStorageService],
                    imports: []
                },] },
    ];
    /** @nocollapse */
    Ng2Webstorage.ctorParameters = [];
    return Ng2Webstorage;
}());
//# sourceMappingURL=app.js.map