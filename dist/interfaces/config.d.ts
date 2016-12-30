export interface WebstorageConfigInterface {
    prefix?: string;
    separator?: string;
}
export declare class WebstorageConfig implements WebstorageConfigInterface {
    prefix: string;
    separator: string;
    constructor(config?: WebstorageConfigInterface);
}
