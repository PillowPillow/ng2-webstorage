import { WebStorageDecorator } from './webStorage';
import { STORAGE } from '../enums/storage';
export function LocalStorage(webSKey) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.local, targetedClass, raw);
    };
}
;
//# sourceMappingURL=localStorage.js.map