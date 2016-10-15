import { KeyStorageHelper, WebStorageHelper } from '../helpers/index';
export var WebStorage = function WebStorageDecorator(webSKey, sType) {
    return function (targetedClass, raw) {
        var key = webSKey || raw, sKey = KeyStorageHelper.genKey(key);
        Object.defineProperty(targetedClass, raw, {
            get: function () {
                return WebStorageHelper.retrieve(sType, sKey);
            },
            set: function (value) {
                this[sKey] = value;
                WebStorageHelper.store(sType, sKey, value);
            }
        });
    };
};
//# sourceMappingURL=webStorage.js.map