import { KeyStorageHelper, WebStorageHelper } from '../helpers/index';
import { StorageObserverHelper } from '../helpers/storageObserver';
export function WebStorage(webSKey, sType, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, sType, targetedClass, raw, defaultValue);
    };
}
export function WebStorageDecorator(webSKey, sType, targetedClass, raw, defaultValue) {
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
    if (targetedClass[raw] === null && defaultValue !== undefined) {
        var sub_1 = StorageObserverHelper.storageInit$.subscribe(function () {
            targetedClass[raw] = defaultValue;
            sub_1.unsubscribe();
        });
    }
}
//# sourceMappingURL=webStorage.js.map