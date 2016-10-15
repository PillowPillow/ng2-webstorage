import { WebStorage } from './webStorage';
import { STORAGE } from '../enums/storage';
export var SessionStorage = function SessionStorageDecorator(webstorageKey) {
    return WebStorage(webstorageKey, STORAGE.session);
};
//# sourceMappingURL=sessionStorage.js.map