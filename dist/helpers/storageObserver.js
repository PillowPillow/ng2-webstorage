'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StorageObserverHelper = undefined;

var _core = require('@angular/core');

var StorageObserverHelper = function () {
    function StorageObserverHelper() {}
    StorageObserverHelper.observe = function (sType, sKey) {
        var oKey = this.genObserverKey(sType, sKey);
        if (oKey in this.observers) return this.observers[oKey];
        return this.observers[oKey] = new _core.EventEmitter();
    };
    StorageObserverHelper.emit = function (sType, sKey, value) {
        var oKey = this.genObserverKey(sType, sKey);
        if (oKey in this.observers) this.observers[oKey].emit(value);
    };
    StorageObserverHelper.genObserverKey = function (sType, sKey) {
        return sType + '|' + sKey;
    };
    StorageObserverHelper.initStorage = function () {
        StorageObserverHelper.storageInitStream.emit(true);
    };
    StorageObserverHelper.observers = {};
    StorageObserverHelper.storageInitStream = new _core.EventEmitter();
    StorageObserverHelper.storageInit$ = StorageObserverHelper.storageInitStream.asObservable();
    return StorageObserverHelper;
}();
exports.StorageObserverHelper = StorageObserverHelper;
//# sourceMappingURL=storageObserver.js.map