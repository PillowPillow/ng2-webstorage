import { KeyStorageHelper, WebStorageHelper } from '../helpers/index';
import { STORAGE } from '../enums/storage';
export function WebStorage(webSKey, sType) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw);
    };
}
;
export function WebStorageDecorator(webSKey, sType, targetedClass, raw) {
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
}
;
//# sourceMappingURL=webStorage.js.map