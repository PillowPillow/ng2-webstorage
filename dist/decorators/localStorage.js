import { WebStorage } from './webStorage';
import { STORAGE } from '../enums/storage';
export var LocalStorage = function LocalStorageDecorator(webstorageKey) {
    return WebStorage(webstorageKey, STORAGE.local);
};
//# sourceMappingURL=localStorage.js.map