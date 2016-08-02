"use strict";
var lib_1 = require('../constants/lib');
var CUSTOM_LIB_KEY = lib_1.LIB_KEY;
var KeyStorageHelper = (function () {
    function KeyStorageHelper() {
    }
    KeyStorageHelper.retrieveKeysFromStorage = function (storage) {
        return Object.keys(storage).filter(function (key) { return key.indexOf(CUSTOM_LIB_KEY) === 0; });
    };
    KeyStorageHelper.genKey = function (raw) {
        if (typeof raw !== 'string')
            throw Error('attempt to generate a storage key with a non string value');
        return CUSTOM_LIB_KEY + "|" + raw.toString().toLowerCase();
    };
    KeyStorageHelper.setStorageKeyPrefix = function (key) {
        if (key === void 0) { key = lib_1.LIB_KEY; }
        CUSTOM_LIB_KEY = key;
    };
    return KeyStorageHelper;
}());
exports.KeyStorageHelper = KeyStorageHelper;
//# sourceMappingURL=keyStorage.js.map