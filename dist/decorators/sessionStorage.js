import { WebStorage } from './webStorage';
import { STORAGE } from '../enums/storage';
export function SessionStorage(webstorageKey) {
    return WebStorage(webstorageKey, STORAGE.session);
}
//# sourceMappingURL=sessionStorage.js.map