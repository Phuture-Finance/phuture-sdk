/* eslint-disable */
export default {
	displayName: 'index-betting',
	preset: '../../jest.preset.js',
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	transform: {
		'^.+\\.[tj]s$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../coverage/packages/index-betting',
};
