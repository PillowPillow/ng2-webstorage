module.exports = function(config) {
	var wconfig = require('./webpack.test');

	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		exclude: [],
		files: [{pattern: './config/spec-bundle.js', watched: false}],
		preprocessors: {'./config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']},
		webpack: wconfig,
		client: {
			captureConsole: true
		},
		coverageReporter: {
			dir: 'coverage/',
			reporters: [
				{type: 'text-summary'},
				// {type: 'json'},
				// {type: 'html'}
			]
		},
		webpackServer: {noInfo: true},
		reporters: ['mocha', 'coverage'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: [
			'Chrome'
		],
		singleRun: true
	});

};