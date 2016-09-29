import { IWebStorage } from '../interfaces/webStorage';
import { STORAGE } from '../enums/storage';
export declare class MockStorageHelper {
    static securedFields: string[];
    static mockStorages: {};
    static isSecuredField(field: any): boolean;
    static getStorage(sType: STORAGE): IWebStorage;
    static generateStorage(): IWebStorage;
}
