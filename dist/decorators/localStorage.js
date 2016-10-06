import { WebStorage } from './webStorage';
import { STORAGE } from '../enums/storage';
export function LocalStorage(webstorageKey) {
    return WebStorage(webstorageKey, STORAGE.local);
}
//# sourceMappingURL=localStorage.js.map