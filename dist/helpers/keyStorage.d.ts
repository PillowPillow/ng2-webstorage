import { IWebStorage } from '../interfaces/webStorage';
export declare class KeyStorageHelper {
    static retrieveKeysFromStorage(storage: IWebStorage): Array<string>;
    static genKey(raw: string): string;
}
