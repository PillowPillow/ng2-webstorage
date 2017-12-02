import { InjectionToken, ModuleWithProviders, NgZone } from '@angular/core';
import { IWebstorageConfig, WebstorageConfig } from './interfaces/config';
export * from './interfaces/index';
export * from './decorators/index';
export * from './services/index';
export declare const WEBSTORAGE_CONFIG: InjectionToken<{}>;
export declare class Ng2Webstorage {
    private ngZone;
    static forRoot(config?: IWebstorageConfig): ModuleWithProviders;
    constructor(ngZone: NgZone, config: WebstorageConfig);
    private initStorageListener();
}
export declare function provideConfig(config: IWebstorageConfig): WebstorageConfig;
