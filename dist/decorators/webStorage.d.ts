import { STORAGE } from '../enums/storage';
export declare function WebStorage(webSKey: string, sType: STORAGE, defaultValue?: any): (targetedClass: Object, raw: string) => void;
export declare function WebStorageDecorator(webSKey: string, sType: STORAGE, targetedClass: Object, raw: string, defaultValue?: any): void;
