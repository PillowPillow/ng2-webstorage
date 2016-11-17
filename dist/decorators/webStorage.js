import { KeyStorageHelper, WebStorageHelper } from '../helpers/index';
export var WebStorage = function WebStorageDecorator(webSKey, sType) {
    return function (targetedClass, raw) {
        var key = webSKey || raw;
        Object.defineProperty(targetedClass, raw, {
            get: function () {
                var sKey = KeyStorageHelper.genKey(key);
                return WebStorageHelper.retrieve(sType, sKey);
            },
            set: function (value) {
                var sKey = KeyStorageHelper.genKey(key);
                this[sKey] = value;
                WebStorageHelper.store(sType, sKey, value);
            }
        });
    };
};
//# sourceMappingURL=webStorage.js.map