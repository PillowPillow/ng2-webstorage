import { IWebStorage } from '../interfaces/webStorage';
export declare class KeyStorageHelper {
    static isManagedKey(sKey: string): boolean;
    static retrieveKeysFromStorage(storage: IWebStorage): Array<string>;
    static genKey(raw: string): string;
    static setStorageKeyPrefix(key?: string): void;
    static setStorageKeySeparator(separator?: string): void;
}
