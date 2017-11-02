import { WebStorageDecorator } from './webStorage';
import { STORAGE } from '../enums/storage';
export function SessionStorage(webSKey, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.session, targetedClass, raw, defaultValue);
    };
}
;
//# sourceMappingURL=sessionStorage.js.map