"use strict";
var storage_1 = require('../enums/storage');
var storageObserver_1 = require('./storageObserver');
var keyStorage_1 = require('./keyStorage');
var WebStorageHelper = (function () {
    function WebStorageHelper() {
    }
    WebStorageHelper.store = function (sType, sKey, value) {
        this.getWStorage(sType).setItem(sKey, JSON.stringify(value));
        this.cached[sType][sKey] = value;
        storageObserver_1.StorageObserverHelper.emit(sType, sKey, value);
    };
    WebStorageHelper.retrieve = function (sType, sKey) {
        if (sKey in this.cached[sType])
            return this.cached[sType][sKey];
        var data = null;
        try {
            data = JSON.parse(this.getWStorage(sType).getItem(sKey));
        }
        catch (err) {
            console.error("invalid value for " + sKey);
        }
        return this.cached[sType][sKey] = data;
    };
    WebStorageHelper.clearAll = function (sType) {
        var _this = this;
        var storage = this.getWStorage(sType);
        keyStorage_1.KeyStorageHelper.retrieveKeysFromStorage(storage)
            .forEach(function (sKey) {
            storage.removeItem(sKey);
            delete _this.cached[sType][sKey];
            storageObserver_1.StorageObserverHelper.emit(sType, sKey, null);
        });
    };
    WebStorageHelper.clear = function (sType, sKey) {
        this.getWStorage(sType).removeItem(sKey);
        delete this.cached[sType][sKey];
        storageObserver_1.StorageObserverHelper.emit(sType, sKey, null);
    };
    WebStorageHelper.getWStorage = function (sType) {
        var storage;
        switch (sType) {
            case storage_1.STORAGE.local:
                storage = localStorage;
                break;
            case storage_1.STORAGE.session:
                storage = sessionStorage;
                break;
            default:
                throw Error('invalid storage type');
        }
        return storage;
    };
    WebStorageHelper.cached = (_a = {}, _a[storage_1.STORAGE.local] = {}, _a[storage_1.STORAGE.session] = {}, _a);
    return WebStorageHelper;
    var _a;
}());
exports.WebStorageHelper = WebStorageHelper;
//# sourceMappingURL=webStorage.js.map