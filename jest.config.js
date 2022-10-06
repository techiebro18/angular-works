module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  transform: {
    '^.+\\.ts?$': 'jest-preset-angular',
    '<rootDir>/node_modules/(?!@instantsearch.js/)': 'jest-preset-angular',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|instantsearch.js|angular-instantsearch)',
  ],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    "@shared/(.*)": "<rootDir>/src/app/shared/$1",
    "@services/(.*)": "<rootDir>/src/app/core/services/$1",
    "@schemas/(.*)": "<rootDir>/src/app/shared/schemas/$1",
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "@environments/(.*)": "<rootDir>/src/environments/$1",
    "src/environments/(.*)": "<rootDir>/src/environments/$1",
    "src/app/core/(.*)": "<rootDir>/src/app/core/$1",
    "instantsearch.js/es/(.*)": '<rootDir>/node_modules/instantsearch.js/cjs/$1',
    "<rootDir>/node_modules/instantsearch.js/es/(.*)": '<rootDir>/node_modules/instantsearch.js/cjs/$1'
  }
};
