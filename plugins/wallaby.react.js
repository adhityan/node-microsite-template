module.exports = {
    files: [
		'tsconfig.json',
		'src/**/*.tsx',
		'src/**/*.ts',
		'package.json',
		'!test',
	],
	compilers: {
		'**/*.ts': wallaby.compilers.typeScript({
				presets: ['react-app']
		}),
		'**/*.js': wallaby.compilers.babel({
				presets: ['react-app']
		})
	},
	tests: [
		'**.spec.js'
	],
	filesWithNoCoverageCalculated: [
		'.*.js'
	],
	env: {
		kind: 'chrome',
		params: {
			runner: '--headless'
		}
	},
	testFramework: 'jest',
	setup(/** @type {any} */ w2) {
		const jestConfig = require('jest.config.js');
		w2.testFramework.configure(jestConfig)
	},
	lowCoverageThreshold: 80,
	slowTestThreshold: 200,
	debug: true
}