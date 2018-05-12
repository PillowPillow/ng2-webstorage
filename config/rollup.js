export default {
  entry: 'dist/app.js',
  external: [
    '@angular/core'
  ],
  dest: 'bundles/core.umd.js',
  format: 'umd',
  sourceMap: 'inline',
  moduleName: 'ng2Webstorage',
  globals: {
    '@angular/core': 'ng.core'
  }
};