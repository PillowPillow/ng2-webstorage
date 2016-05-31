"use strict";
var index_1 = require('../helpers/index');
var WebStorageService = (function () {
    function WebStorageService(sType) {
        this.sType = null;
        this.sType = sType;
    }
    WebStorageService.prototype.store = function (raw, value) {
        var sKey = index_1.KeyStorageHelper.genKey(raw);
        index_1.WebStorageHelper.store(this.sType, sKey, value);
    };
    WebStorageService.prototype.retrieve = function (raw) {
        var sKey = index_1.KeyStorageHelper.genKey(raw);
        return index_1.WebStorageHelper.retrieve(this.sType, sKey);
    };
    WebStorageService.prototype.clear = function (raw) {
        if (raw)
            index_1.WebStorageHelper.clear(this.sType, index_1.KeyStorageHelper.genKey(raw));
        else
            index_1.WebStorageHelper.clearAll(this.sType);
    };
    WebStorageService.prototype.observe = function (raw) {
        var sKey = index_1.KeyStorageHelper.genKey(raw);
        return index_1.StorageObserverHelper.observe(this.sType, sKey);
    };
    return WebStorageService;
}());
exports.WebStorageService = WebStorageService;
//# sourceMappingURL=webStorage.js.map