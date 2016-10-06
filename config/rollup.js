export default {
  entry: 'index.js',
  dest: 'bundles/core.umd.js',
  format: 'umd',
  sourceMap: 'inline',
  moduleName: 'ng2Webstorage',
  globals: {
    '@angular/core': 'ng.core'
  }
};