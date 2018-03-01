'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebStorage = WebStorage;
exports.WebStorageDecorator = WebStorageDecorator;

var _index = require('../helpers/index');

var _storageObserver = require('../helpers/storageObserver');

function WebStorage(webSKey, sType, defaultValue) {
    if (defaultValue === void 0) {
        defaultValue = null;
    }
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, sType, targetedClass, raw, defaultValue);
    };
}
function WebStorageDecorator(webSKey, sType, targetedClass, raw, defaultValue) {
    var key = webSKey || raw;
    Object.defineProperty(targetedClass, raw, {
        get: function get() {
            var sKey = _index.KeyStorageHelper.genKey(key);
            return _index.WebStorageHelper.retrieve(sType, sKey);
        },
        set: function set(value) {
            var sKey = _index.KeyStorageHelper.genKey(key);
            this[sKey] = value;
            _index.WebStorageHelper.store(sType, sKey, value);
        }
    });
    if (targetedClass[raw] === null && defaultValue !== undefined) {
        var sub_1 = _storageObserver.StorageObserverHelper.storageInit$.subscribe(function () {
            targetedClass[raw] = defaultValue;
            sub_1.unsubscribe();
        });
    }
}
//# sourceMappingURL=webStorage.js.map