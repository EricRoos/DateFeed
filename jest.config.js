module.exports = {
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
    "^.+\\.ts?$": "esbuild-jest",
    "^.+\\.js?$": "esbuild-jest",
    "^.+\\.jsx?$": "esbuild-jest"
  },
  collectCoverageFrom : ["app/javascript/**/*.{ts,tsx,js,jsx}", "!**/node_modules/**", "!**/vendor/**"],
  collectCoverage: true,
  setupFilesAfterEnv: [
    '<rootDir>/app/javascript/jest-setup.ts'
  ]
}
