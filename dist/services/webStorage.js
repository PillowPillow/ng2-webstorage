'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebStorageService = undefined;

var _index = require('../helpers/index');

var WebStorageService = function () {
    function WebStorageService(sType) {
        if (sType === void 0) {
            sType = null;
        }
        this.sType = sType;
        this.sType = sType;
    }
    WebStorageService.prototype.store = function (raw, value) {
        var sKey = _index.KeyStorageHelper.genKey(raw);
        _index.WebStorageHelper.store(this.sType, sKey, value);
    };
    WebStorageService.prototype.retrieve = function (raw) {
        var sKey = _index.KeyStorageHelper.genKey(raw);
        return _index.WebStorageHelper.retrieve(this.sType, sKey);
    };
    WebStorageService.prototype.clear = function (raw) {
        if (raw) _index.WebStorageHelper.clear(this.sType, _index.KeyStorageHelper.genKey(raw));else _index.WebStorageHelper.clearAll(this.sType);
    };
    WebStorageService.prototype.observe = function (raw) {
        var sKey = _index.KeyStorageHelper.genKey(raw);
        return _index.StorageObserverHelper.observe(this.sType, sKey);
    };
    WebStorageService.prototype.isStorageAvailable = function () {
        return _index.WebStorageHelper.isStorageAvailable(this.sType);
    };
    return WebStorageService;
}();
exports.WebStorageService = WebStorageService;
//# sourceMappingURL=webStorage.js.map