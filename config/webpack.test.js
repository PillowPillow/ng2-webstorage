const wmerge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = wmerge(common, {
	resolve: {
		root: './src'
	},

	module: {
		postLoaders: [
			{
				test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
				include: './src',
				exclude: [
					/\.(e2e|spec)\.ts$/,
					/node_modules/
				]
			}
		],
		loaders: [
			{
				test: /\.(spec|e2e)\.ts$/,
				loader: 'ts-loader',
				query: {transpileOnly: true}
			}
		]
	}
});