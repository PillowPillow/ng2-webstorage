import { STORAGE } from '../enums/storage';
import { EventEmitter } from '@angular/core';
export declare class StorageObserverHelper {
    static observers: Object;
    static observe(sType: STORAGE, sKey: string): EventEmitter<any>;
    static emit(sType: STORAGE, sKey: string, value: any): void;
    static genObserverKey(sType: STORAGE, sKey: string): string;
}
