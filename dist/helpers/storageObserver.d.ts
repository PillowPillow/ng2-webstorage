import { STORAGE } from '../enums/storage';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export declare class StorageObserverHelper {
    static observers: Object;
    static storageInitStream: EventEmitter<boolean>;
    static storageInit$: Observable<boolean>;
    static observe(sType: STORAGE, sKey: string): EventEmitter<any>;
    static emit(sType: STORAGE, sKey: string, value: any): void;
    static genObserverKey(sType: STORAGE, sKey: string): string;
    static initStorage(): void;
}
