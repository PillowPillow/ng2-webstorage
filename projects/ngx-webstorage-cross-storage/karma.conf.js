// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
	const options = config.buildWebpack.options || {};
	const reporters = options.codeCoverage ? ['junit', 'progress', 'kjhtml'] : ['progress', 'kjhtml'];

	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('karma-junit-reporter'),
			require('@angular-devkit/build-angular/plugins/karma')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, '../../coverage'),
			reports: ['html', 'lcovonly'],
			fixWebpackSourcePaths: true
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
		junitReporter: {
			outputDir: require('path').join(__dirname, '../../junit'),
			outputFile: 'junit.xml',
			useBrowserName: false,
		},
		reporters,
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false
	});
};
