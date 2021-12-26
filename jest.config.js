module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!src/main.ts',
  ],
  "setupFilesAfterEnv": ["jest-extended/all"]
};
