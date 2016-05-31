"use strict";
var webStorage_1 = require('./webStorage');
var storage_1 = require('../enums/storage');
function SessionStorage(webstorageKey) {
    return webStorage_1.WebStorage(webstorageKey, storage_1.STORAGE.session);
}
exports.SessionStorage = SessionStorage;
//# sourceMappingURL=sessionStorage.js.map