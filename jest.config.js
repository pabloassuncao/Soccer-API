module.exports = {
  rootDir: './__tests__',
  testEnvironment: "node",
  testSequencer: './config/sequencer.js',
  // setupFilesAfterEnv: ['./config/setup.js'],
  testRegex: './*\\.test\\.js$',
  testTimeout: 1800000,
};
