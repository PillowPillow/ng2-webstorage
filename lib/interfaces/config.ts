import {LIB_KEY, LIB_KEY_SEPARATOR} from '../constants/lib';

export interface WebstorageConfigInterface {
	prefix?: string,
	separator?: string
}

export class WebstorageConfig implements WebstorageConfigInterface {
	prefix: string = LIB_KEY;
	separator: string = LIB_KEY_SEPARATOR;

	constructor(config?: WebstorageConfigInterface) {
		if (config && config.prefix !== undefined) {
			this.prefix = config.prefix;
		}

		if (config && config.separator !== undefined) {
			this.separator = config.separator;
		}
	}
}
