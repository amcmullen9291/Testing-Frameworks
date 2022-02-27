const fs = require('fs');
const expect = require('expect');
const mock = require('jest-mock');
const {describe, it, run, resetState} = require('jest-circus')

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, 'utf8');
  const testResult = {
    success: false,
    errorMessage: null,
  };
  try {
    resetState();
    const describeFns = [];
    let currentDescribeFn;
    const describe = (name, fn) => describeFns.push([name, fn]);
    const it = (name, fn) => currentDescribeFn.push([name, fn]);
    eval(code);
    for (const [name, fn] of describeFns) {
      currentDescribeFn = [];
      testName = name;
      fn();
   
      currentDescribeFn.forEach(([name, fn]) => {
        testName += ' ' + name;
        fn();
      });
    }
    testResult.success = true;
    const {testResults, errorMessage, success} = await run();
    testResult.testResults = testResults;
    testResult.success = testResults.every((result) => !result.errors.length);
  } catch (error) {
    testResult.errorMessage = error.message;
  }
  return testResult;
};