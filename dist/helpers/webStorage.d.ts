import { IWebStorage } from '../interfaces/webStorage';
import { STORAGE } from '../enums/storage';
export declare class WebStorageHelper {
    static store(sType: STORAGE, sKey: string, value: any): void;
    static retrieve(sType: STORAGE, sKey: string): string;
    static retrieveFromStorage(sType: STORAGE, sKey: string): any;
    static refresh(sType: STORAGE, sKey: string): void;
    static refreshAll(sType: STORAGE): void;
    static clearAll(sType: STORAGE): void;
    static clear(sType: STORAGE, sKey: string): void;
    static getStorage(sType: STORAGE): IWebStorage;
    static getWStorage(sType: STORAGE): IWebStorage;
    static isStorageAvailable(sType: STORAGE): any;
}
