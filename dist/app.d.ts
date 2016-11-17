import { NgZone, ModuleWithProviders } from '@angular/core';
import { ModuleConfig } from './interfaces/config';
export * from './interfaces/index';
export * from './decorators/index';
export * from './services/index';
export declare class Ng2Webstorage {
    private ngZone;
    static forRoot({prefix, separator}?: ModuleConfig): ModuleWithProviders;
    constructor(ngZone: NgZone);
    private initStorageListener();
}
