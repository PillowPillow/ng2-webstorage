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
			require('karma-coverage'),
			require('karma-junit-reporter'),
			require('@angular-devkit/build-angular/plugins/karma')
		],
		client: {
			jasmine: {
			  // you can add configuration options for Jasmine here
			  // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
			  // for example, you can disable the random execution with `random: false`
			  // or set a specific seed with `seed: 4321`
			},
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageReporter: {
		  dir: require('path').join(__dirname, './../coverage'),
		  subdir: '.',
		  reporters: [
			{ type: 'html' },
			{ type: 'text-summary' }
		  ]
		},
		junitReporter: {
			outputDir: require('path').join(__dirname, '../../junit'),
			outputFile: 'junit.xml',
			useBrowserName: false,
		},
		jasmineHtmlReporter: {
		  suppressAll: true // removes the duplicated traces
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
		reporters,
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false,
		restartOnFileChange: true
	});
};
