"use strict";
var index_1 = require('../helpers/index');
var index_2 = require('../helpers/index');
function WebStorage(webSKey, sType) {
    return function (targetedClass, raw) {
        var key = webSKey || raw, sKey = index_1.KeyStorageHelper.genKey(key);
        Object.defineProperty(targetedClass, raw, {
            get: function () {
                return index_2.WebStorageHelper.retrieve(sType, sKey);
            },
            set: function (value) {
                this[sKey] = value;
                index_2.WebStorageHelper.store(sType, sKey, value);
            }
        });
    };
}
exports.WebStorage = WebStorage;
//# sourceMappingURL=webStorage.js.map