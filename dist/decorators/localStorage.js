"use strict";
var webStorage_1 = require('./webStorage');
var storage_1 = require('../enums/storage');
function LocalStorage(webstorageKey) {
    return webStorage_1.WebStorage(webstorageKey, storage_1.STORAGE.local);
}
exports.LocalStorage = LocalStorage;
//# sourceMappingURL=localStorage.js.map