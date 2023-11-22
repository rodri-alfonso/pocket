const nextJest = require('next/jest')

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
})

const customJestConfig = {
	moduleNameMapper: {
		// Handle module aliases (this will be automatically configured for you soon)
		'^@/(.*)$': '<rootDir>/src/$1',

		'^@/public/(.*)$': '<rootDir>/public/$1',

		'^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
	},
	setupFilesAfterEnv: ['./jest.setup.ts'],
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: ['./**/*.{js,jsx,ts,tsx}', '!./**/_*.{js,jsx,ts,tsx}'],
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
