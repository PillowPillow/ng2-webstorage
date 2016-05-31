"use strict";
var lib_1 = require('../constants/lib');
var KeyStorageHelper = (function () {
    function KeyStorageHelper() {
    }
    KeyStorageHelper.retrieveKeysFromStorage = function (storage) {
        return Object.keys(storage).filter(function (key) { return key.indexOf(lib_1.LIB_KEY) === 0; });
    };
    KeyStorageHelper.genKey = function (raw) {
        if (typeof raw !== 'string')
            throw Error('attempt to generate a storage key with a non string value');
        return lib_1.LIB_KEY + "|" + raw.toString().toLowerCase();
    };
    return KeyStorageHelper;
}());
exports.KeyStorageHelper = KeyStorageHelper;
//# sourceMappingURL=keyStorage.js.map