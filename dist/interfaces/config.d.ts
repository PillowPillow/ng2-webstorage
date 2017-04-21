export interface IWebstorageConfig {
    prefix?: string;
    separator?: string;
    caseSensitive?: boolean;
}
export declare class WebstorageConfig implements IWebstorageConfig {
    prefix: string;
    separator: string;
    caseSensitive: boolean;
    constructor(config?: IWebstorageConfig);
}
