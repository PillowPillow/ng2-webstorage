import { WebStorageDecorator } from './webStorage';
import { STORAGE } from '../enums/storage';
export function SessionStorage(webSKey) {
    return function (targetedClass, raw) {
        WebStorageDecorator(webSKey, STORAGE.session, targetedClass, raw);
    };
}
;
//# sourceMappingURL=sessionStorage.js.map