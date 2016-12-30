import { NgZone, ModuleWithProviders, OpaqueToken } from '@angular/core';
import { WebstorageConfig, WebstorageConfigInterface } from './interfaces/config';
export * from './interfaces/index';
export * from './decorators/index';
export * from './services/index';
export declare const WEBSTORAGE_CONFIG: OpaqueToken;
export declare class Ng2Webstorage {
    private ngZone;
    static forRoot(config?: WebstorageConfigInterface): ModuleWithProviders;
    constructor(ngZone: NgZone, config: WebstorageConfig);
    private initStorageListener();
}
export declare function provideConfig(config: WebstorageConfigInterface): WebstorageConfig;
export declare function configure({prefix, separator}?: WebstorageConfigInterface): void;
