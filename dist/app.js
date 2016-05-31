"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var index_1 = require('./services/index');
__export(require('./decorators/index'));
__export(require('./services/index'));
exports.NG2_WEBSTORAGE = [
    index_1.SessionStorageService,
    index_1.LocalStorageService
];
//# sourceMappingURL=app.js.map