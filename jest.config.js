const nextJest = require('next/jest')

const createJestConfig = nextJest({
	dir: './',
})

const customJestConfig = {
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',

		'^@/public/(.*)$': '<rootDir>/public/$1',

		'^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
	},
	setupFilesAfterEnv: ['./jest.setup.ts'],
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		'./utils/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./hooks/**/*.{ts,tsx}',
		'./context/**/*.{ts,tsx}',
	],
	coverageThreshold: {
		global: {
			branches: 30,
			functions: 30,
			lines: 30,
			statements: 30,
		},
	},
	testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
