import { WebStorageDecorator } from './webStorage';
import { STORAGE } from '../enums/storage';
export function LocalStorage(webSKey, defaultValue) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw, defaultValue);
    };
}
//# sourceMappingURL=localStorage.js.map