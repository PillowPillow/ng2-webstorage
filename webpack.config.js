var webpack = require('webpack');
var HMR = process.argv.join('').indexOf('hot') > -1;

module.exports = {
	devtool: 'eval',
	debug: false,
	cache: true,
	entry: [
		'webpack/hot/dev-server',
		'./example/app'
	],
	output: {
		publicPath: '/',
		filename: 'app.js',
		chunkFilename: '[chunkhash].bundle.js'
	},
	resolve: {
		extensions: ['', '.ts', '.async.ts', '.js']
	},
	module: {
		preLoaders: [
			{test: /\.ts$/, loader: 'tslint-loader', exclude: ['./node_modules']},
			{test: /\.js$/, loader: "source-map-loader", exclude: ['./node_modules/rxjs']}
		],
		loaders: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				query: {transpileOnly: true},
				exclude: [/\.(spec|e2e)\.ts$/]
			}
		]
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],

	tslint: {
		emitErrors: false,
		failOnHint: false,
		resourcePath: 'src'
	},
	node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};
