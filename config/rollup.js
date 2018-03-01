import babel from 'rollup-plugin-babel';

export default {
    input: 'dist/app.js',
    output: {
        file: 'bundles/core.umd.js',
        format: 'umd',
        sourceMap: 'inline',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            babelrc: false,
            presets: [
                ["es2015", { "modules": false }]
            ],
            plugins: [
                'external-helpers'
            ],
        }),
    ],
    moduleName: 'ng2Webstorage',
    globals: {
        '@angular/core': 'ng.core'
    }
};