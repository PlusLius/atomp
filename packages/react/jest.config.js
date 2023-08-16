module.exports = {
    testEnvironment: "jsdom",
    roots: ['<rootDir>/src'],
    testRegex: '(/.*\\.test)\\.(ts|tsx)',
    setupFilesAfterEnv:['<rootDir>/jest.setup.ts'],
}