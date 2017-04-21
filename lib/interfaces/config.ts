import {LIB_KEY, LIB_KEY_CASE_SENSITIVE, LIB_KEY_SEPARATOR} from '../constants/lib';

export interface IWebstorageConfig {
	prefix?:string;
	separator?:string;
	caseSensitive?:boolean;
}

export class WebstorageConfig implements IWebstorageConfig {
	prefix:string = LIB_KEY;
	separator:string = LIB_KEY_SEPARATOR;
	caseSensitive:boolean = LIB_KEY_CASE_SENSITIVE;

	constructor(config?:IWebstorageConfig) {
		if(config && config.prefix !== undefined) {
			this.prefix = config.prefix;
		}

		if(config && config.separator !== undefined) {
			this.separator = config.separator;
		}

		if(config && config.caseSensitive !== undefined) {
			this.caseSensitive = config.caseSensitive;
		}
	}
}
