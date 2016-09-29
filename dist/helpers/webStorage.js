"use strict";
var storage_1 = require('../enums/storage');
var storageObserver_1 = require('./storageObserver');
var keyStorage_1 = require('./keyStorage');
var mockStorage_1 = require('./mockStorage');
var lib_1 = require('../constants/lib');
var WebStorageHelper = (function () {
    function WebStorageHelper() {
    }
    WebStorageHelper.store = function (sType, sKey, value) {
        this.getStorage(sType).setItem(sKey, JSON.stringify(value));
        this.cached[sType][sKey] = value;
        storageObserver_1.StorageObserverHelper.emit(sType, sKey, value);
    };
    WebStorageHelper.retrieve = function (sType, sKey) {
        if (this.cached[sType][sKey])
            return this.cached[sType][sKey];
        var data = null;
        try {
            data = JSON.parse(this.getStorage(sType).getItem(sKey));
        }
        catch (err) {
            console.warn("invalid value for " + sKey);
        }
        return this.cached[sType][sKey] = data;
    };
    WebStorageHelper.clearAll = function (sType) {
        var _this = this;
        var storage = this.getStorage(sType);
        keyStorage_1.KeyStorageHelper.retrieveKeysFromStorage(storage)
            .forEach(function (sKey) {
            storage.removeItem(sKey);
            delete _this.cached[sType][sKey];
            storageObserver_1.StorageObserverHelper.emit(sType, sKey, null);
        });
    };
    WebStorageHelper.clear = function (sType, sKey) {
        this.getStorage(sType).removeItem(sKey);
        delete this.cached[sType][sKey];
        storageObserver_1.StorageObserverHelper.emit(sType, sKey, null);
    };
    WebStorageHelper.getStorage = function (sType) {
        return this.isStorageAvailable(sType) ? this.getWStorage(sType) : mockStorage_1.MockStorageHelper.getStorage(sType);
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
    WebStorageHelper.isStorageAvailable = function (sType) {
        if (typeof this.storageAvailability[sType] === 'boolean')
            return this.storageAvailability[sType];
        var isAvailable = true, storage = this.getWStorage(sType);
        if (typeof storage === 'object') {
            try {
                storage.setItem('test-storage', 'foobar');
                storage.removeItem('test-storage');
            }
            catch (e) {
                isAvailable = false;
            }
        }
        else
            isAvailable = false;
        if (!isAvailable)
            console.warn(lib_1.STORAGE_NAMES[sType] + " storage unavailable, Ng2Webstorage will use a fallback strategy instead");
        return this.storageAvailability[sType] = isAvailable;
    };
    WebStorageHelper.cached = (_a = {}, _a[storage_1.STORAGE.local] = {}, _a[storage_1.STORAGE.session] = {}, _a);
    WebStorageHelper.storageAvailability = (_b = {}, _b[storage_1.STORAGE.local] = null, _b[storage_1.STORAGE.session] = null, _b);
    return WebStorageHelper;
    var _a, _b;
}());
exports.WebStorageHelper = WebStorageHelper;
//# sourceMappingURL=webStorage.js.map