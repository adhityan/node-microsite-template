module.exports = {
    files: [
		'tsconfig.json',
		'src/**/*.ts',
		'package.json',
		'!test',
	],
	compilers: {
		'**/*.ts': wallaby.compilers.typeScript(),
		'**/*.js': wallaby.compilers.babel()
	},
	tests: [
		'test',
	],
	filesWithNoCoverageCalculated: [
		'.*.js'
	],
	env: {
		type: 'node',
		runner: 'node',
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