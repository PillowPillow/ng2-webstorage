// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageReporter: {
			dir: require('path').join(__dirname, '../coverage'),
			subdir: '.',
			reporters: [
				{ type: 'html' },
				{ type: 'lcovonly' }
			]
		},
		customLaunchers: {
			chrome_headless: {
				base: 'Chrome',
				flags: [
					'--no-sandbox',
					'--headless',
					'--disable-gpu',
					'--remote-debugging-port=9222',
				],
			}
		},
		reporters: ['progress', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false
	});
};