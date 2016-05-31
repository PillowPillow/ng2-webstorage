import { IWebStorage } from '../interfaces/webStorage';
import { STORAGE } from '../enums/storage';
export declare class WebStorageHelper {
    static cached: {};
    static store(sType: STORAGE, sKey: string, value: any): void;
    static retrieve(sType: STORAGE, sKey: string): string;
    static clearAll(sType: STORAGE): void;
    static clear(sType: STORAGE, sKey: string): void;
    static getWStorage(sType: STORAGE): IWebStorage;
}
