'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocalStorage = LocalStorage;

var _webStorage = require('./webStorage');

var _storage = require('../enums/storage');

function LocalStorage(webSKey, defaultValue) {
    return function (targetedClass, raw) {
        (0, _webStorage.WebStorageDecorator)(webSKey, _storage.STORAGE.local, targetedClass, raw, defaultValue);
    };
}
//# sourceMappingURL=localStorage.js.map