import { KeyStorageHelper, WebStorageHelper, StorageObserverHelper } from '../helpers/index';
var WebStorageService = (function () {
    function WebStorageService(sType) {
        if (sType === void 0) { sType = null; }
        this.sType = sType;
        this.sType = sType;
    }
    WebStorageService.prototype.store = function (raw, value) {
        var sKey = KeyStorageHelper.genKey(raw);
        WebStorageHelper.store(this.sType, sKey, value);
    };
    WebStorageService.prototype.retrieve = function (raw) {
        var sKey = KeyStorageHelper.genKey(raw);
        return WebStorageHelper.retrieve(this.sType, sKey);
    };
    WebStorageService.prototype.clear = function (raw) {
        if (raw)
            WebStorageHelper.clear(this.sType, KeyStorageHelper.genKey(raw));
        else
            WebStorageHelper.clearAll(this.sType);
    };
    WebStorageService.prototype.observe = function (raw) {
        var sKey = KeyStorageHelper.genKey(raw);
        return StorageObserverHelper.observe(this.sType, sKey);
    };
    WebStorageService.prototype.isStorageAvailable = function () {
        return WebStorageHelper.isStorageAvailable(this.sType);
    };
    return WebStorageService;
}());
export { WebStorageService };
//# sourceMappingURL=webStorage.js.map