import { LIB_KEY, LIB_KEY_SEPARATOR } from '../constants/lib';
export var WebstorageConfig = (function () {
    function WebstorageConfig(config) {
        this.prefix = LIB_KEY;
        this.separator = LIB_KEY_SEPARATOR;
        if (config && config.prefix !== undefined) {
            this.prefix = config.prefix;
        }
        if (config && config.separator !== undefined) {
            this.separator = config.separator;
        }
    }
    return WebstorageConfig;
}());
//# sourceMappingURL=config.js.map