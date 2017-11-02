import { LIB_KEY, LIB_KEY_CASE_SENSITIVE, LIB_KEY_SEPARATOR } from '../constants/lib';
var WebstorageConfig = /** @class */ (function () {
    function WebstorageConfig(config) {
        if (config && config.prefix !== undefined) {
            this.prefix = config.prefix;
        }
        if (config && config.separator !== undefined) {
            this.separator = config.separator;
        }
        if (config && config.caseSensitive !== undefined) {
            this.caseSensitive = config.caseSensitive;
        }
    }
    return WebstorageConfig;
}());
export { WebstorageConfig };
//# sourceMappingURL=config.js.map