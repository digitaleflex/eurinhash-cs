const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/.kilo/'],
  modulePathIgnorePatterns: ['<rootDir>/.kilo/'],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'middleware.ts',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
  ],
  coverageThreshold: {
    // Seuil strict appliqué aux fichiers couverts par la suite de tests.
    // Les seuils globaux restent à atteindre au fur et à mesure de l'ajout de tests.
    './lib/sanitize.ts': { branches: 70, functions: 70, lines: 70, statements: 70 },
    './lib/rate-limit.ts': { branches: 70, functions: 70, lines: 70, statements: 70 },
    './app/api/contact/route.ts': { branches: 70, functions: 70, lines: 70, statements: 70 },
    './app/api/blog/upload/route.ts': { branches: 70, functions: 70, lines: 70, statements: 70 },
    './lib/authorization.ts': { branches: 70, functions: 70, lines: 70, statements: 70 },
    './lib/actions/admin.ts': { branches: 70, functions: 70, lines: 70, statements: 70 },
    './lib/actions/events.ts': { branches: 70, functions: 70, lines: 70, statements: 70 },
    './middleware.ts': { branches: 70, functions: 70, lines: 70, statements: 70 },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
