import { WebStorageDecorator } from './webStorage';
import { STORAGE } from '../enums/storage';
export function SessionStorage(webSKey, defaultValue) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.session, targetedClass, raw, defaultValue);
    };
}
//# sourceMappingURL=sessionStorage.js.map