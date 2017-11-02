import { EventEmitter } from '@angular/core';
export interface IStorage {
    store(key: string, value: any): void;
    retrieve(key: string): any;
    clear(key?: string): void;
    observe(key: string): EventEmitter<any>;
}
