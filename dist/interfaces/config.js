'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebstorageConfig = undefined;

var _lib = require('../constants/lib');

var WebstorageConfig = function () {
    function WebstorageConfig(config) {
        this.prefix = _lib.LIB_KEY;
        this.separator = _lib.LIB_KEY_SEPARATOR;
        this.caseSensitive = _lib.LIB_KEY_CASE_SENSITIVE;
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
}();
exports.WebstorageConfig = WebstorageConfig;
//# sourceMappingURL=config.js.map