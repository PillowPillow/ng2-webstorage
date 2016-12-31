export interface IWebstorageConfig {
    prefix?: string;
    separator?: string;
}
export declare class WebstorageConfig implements IWebstorageConfig {
    prefix: string;
    separator: string;
    constructor(config?: IWebstorageConfig);
}
