// worker.js
const fs = require('fs');
const expect = require('expect');
const mock = require('block');
// Provide `describe` and `it` to tests.
const {describe, it, run} = require('jest-circus');

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, 'utf8');
  const testResult = {
    success: false,
    errorMessage: null,
  };
  try {
    eval(code);
    // Run jest-circus.
    const {testResults} = await run();
    testResult.testResults = testResults;
    testResult.success = testResults.every((result) => !result.errors.length);
  } catch (error) {
    testResult.errorMessage = error.message;
  }
  return testResult;
};