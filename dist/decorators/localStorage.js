import { WebStorageDecorator } from './webStorage';
import { STORAGE } from '../enums/storage';
export function LocalStorage(webSKey, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw, defaultValue);
    };
}
;
//# sourceMappingURL=localStorage.js.map