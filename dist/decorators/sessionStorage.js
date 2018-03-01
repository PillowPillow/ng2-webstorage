'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SessionStorage = SessionStorage;

var _webStorage = require('./webStorage');

var _storage = require('../enums/storage');

function SessionStorage(webSKey, defaultValue) {
    return function (targetedClass, raw) {
        (0, _webStorage.WebStorageDecorator)(webSKey, _storage.STORAGE.session, targetedClass, raw, defaultValue);
    };
}
//# sourceMappingURL=sessionStorage.js.map