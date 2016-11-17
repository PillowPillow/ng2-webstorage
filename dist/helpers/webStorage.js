import { STORAGE } from '../enums/storage';
import { StorageObserverHelper } from './storageObserver';
import { KeyStorageHelper } from './keyStorage';
import { MockStorageHelper } from './mockStorage';
import { STORAGE_NAMES } from '../constants/lib';
export var WebStorageHelper = (function () {
    function WebStorageHelper() {
    }
    WebStorageHelper.store = function (sType, sKey, value) {
        this.getStorage(sType).setItem(sKey, JSON.stringify(value));
        this.cached[sType][sKey] = value;
        StorageObserverHelper.emit(sType, sKey, value);
    };
    WebStorageHelper.retrieve = function (sType, sKey) {
        if (this.cached[sType][sKey])
            return this.cached[sType][sKey];
        return this.cached[sType][sKey] = WebStorageHelper.retrieveFromStorage(sType, sKey);
    };
    WebStorageHelper.retrieveFromStorage = function (sType, sKey) {
        var data = null;
        try {
            data = JSON.parse(this.getStorage(sType).getItem(sKey));
        }
        catch (err) {
            console.warn("invalid value for " + sKey);
        }
        return data;
    };
    WebStorageHelper.refresh = function (sType, sKey) {
        if (!KeyStorageHelper.isManagedKey(sKey))
            return;
        var value = WebStorageHelper.retrieveFromStorage(sType, sKey);
        if (value != null && value !== this.cached[sType][sKey]) {
            this.cached[sType][sKey] = value;
            StorageObserverHelper.emit(sType, sKey, value);
        }
    };
    WebStorageHelper.clearAll = function (sType) {
        var _this = this;
        var storage = this.getStorage(sType);
        KeyStorageHelper.retrieveKeysFromStorage(storage)
            .forEach(function (sKey) {
            storage.removeItem(sKey);
            delete _this.cached[sType][sKey];
            StorageObserverHelper.emit(sType, sKey, null);
        });
    };
    WebStorageHelper.clear = function (sType, sKey) {
        this.getStorage(sType).removeItem(sKey);
        delete this.cached[sType][sKey];
        StorageObserverHelper.emit(sType, sKey, null);
    };
    WebStorageHelper.getStorage = function (sType) {
        return this.isStorageAvailable(sType) ? this.getWStorage(sType) : MockStorageHelper.getStorage(sType);
    };
    WebStorageHelper.getWStorage = function (sType) {
        var storage;
        switch (sType) {
            case STORAGE.local:
                storage = localStorage;
                break;
            case STORAGE.session:
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
            console.warn(STORAGE_NAMES[sType] + " storage unavailable, Ng2Webstorage will use a fallback strategy instead");
        return this.storageAvailability[sType] = isAvailable;
    };
    WebStorageHelper.cached = (_a = {}, _a[STORAGE.local] = {}, _a[STORAGE.session] = {}, _a);
    WebStorageHelper.storageAvailability = (_b = {}, _b[STORAGE.local] = null, _b[STORAGE.session] = null, _b);
    return WebStorageHelper;
    var _a, _b;
}());
//# sourceMappingURL=webStorage.js.map