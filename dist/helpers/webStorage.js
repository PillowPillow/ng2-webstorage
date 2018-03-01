'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebStorageHelper = undefined;

var _storage = require('../enums/storage');

var _storageObserver = require('./storageObserver');

var _keyStorage = require('./keyStorage');

var _mockStorage = require('./mockStorage');

var _lib = require('../constants/lib');

var CACHED = (_a = {}, _a[_storage.STORAGE.local] = {}, _a[_storage.STORAGE.session] = {}, _a);
var STORAGE_AVAILABILITY = (_b = {}, _b[_storage.STORAGE.local] = null, _b[_storage.STORAGE.session] = null, _b);
var WebStorageHelper = function () {
    function WebStorageHelper() {}
    WebStorageHelper.store = function (sType, sKey, value) {
        this.getStorage(sType).setItem(sKey, JSON.stringify(value));
        CACHED[sType][sKey] = value;
        _storageObserver.StorageObserverHelper.emit(sType, sKey, value);
    };
    WebStorageHelper.retrieve = function (sType, sKey) {
        if (sKey in CACHED[sType]) return CACHED[sType][sKey];
        var value = WebStorageHelper.retrieveFromStorage(sType, sKey);
        if (value !== null) CACHED[sType][sKey] = value;
        return value;
    };
    WebStorageHelper.retrieveFromStorage = function (sType, sKey) {
        var data = null;
        try {
            data = JSON.parse(this.getStorage(sType).getItem(sKey));
        } catch (err) {
            console.warn("invalid value for " + sKey);
        }
        return data;
    };
    WebStorageHelper.refresh = function (sType, sKey) {
        if (!_keyStorage.KeyStorageHelper.isManagedKey(sKey)) return;
        var value = WebStorageHelper.retrieveFromStorage(sType, sKey);
        if (value === null) {
            delete CACHED[sType][sKey];
            _storageObserver.StorageObserverHelper.emit(sType, sKey, null);
        } else if (value !== CACHED[sType][sKey]) {
            CACHED[sType][sKey] = value;
            _storageObserver.StorageObserverHelper.emit(sType, sKey, value);
        }
    };
    WebStorageHelper.refreshAll = function (sType) {
        Object.keys(CACHED[sType]).forEach(function (sKey) {
            return WebStorageHelper.refresh(sType, sKey);
        });
    };
    WebStorageHelper.clearAll = function (sType) {
        var storage = this.getStorage(sType);
        _keyStorage.KeyStorageHelper.retrieveKeysFromStorage(storage).forEach(function (sKey) {
            storage.removeItem(sKey);
            delete CACHED[sType][sKey];
            _storageObserver.StorageObserverHelper.emit(sType, sKey, null);
        });
    };
    WebStorageHelper.clear = function (sType, sKey) {
        this.getStorage(sType).removeItem(sKey);
        delete CACHED[sType][sKey];
        _storageObserver.StorageObserverHelper.emit(sType, sKey, null);
    };
    WebStorageHelper.getStorage = function (sType) {
        if (this.isStorageAvailable(sType)) return this.getWStorage(sType);else return _mockStorage.MockStorageHelper.getStorage(sType);
    };
    WebStorageHelper.getWStorage = function (sType) {
        var storage;
        switch (sType) {
            case _storage.STORAGE.local:
                storage = localStorage;
                break;
            case _storage.STORAGE.session:
                storage = sessionStorage;
                break;
            default:
                throw Error('invalid storage type');
        }
        return storage;
    };
    WebStorageHelper.isStorageAvailable = function (sType) {
        if (typeof STORAGE_AVAILABILITY[sType] === 'boolean') return STORAGE_AVAILABILITY[sType];
        var isAvailable = true,
            storage;
        try {
            storage = this.getWStorage(sType);
            if ((typeof storage === 'undefined' ? 'undefined' : babelHelpers.typeof(storage)) === 'object') {
                storage.setItem('test-storage', 'foobar');
                storage.removeItem('test-storage');
            } else isAvailable = false;
        } catch (e) {
            isAvailable = false;
        }
        if (!isAvailable) console.warn(_lib.STORAGE_NAMES[sType] + " storage unavailable, Ng2Webstorage will use a fallback strategy instead");
        return STORAGE_AVAILABILITY[sType] = isAvailable;
    };
    return WebStorageHelper;
}();
exports.WebStorageHelper = WebStorageHelper;

var _a, _b;
//# sourceMappingURL=webStorage.js.map