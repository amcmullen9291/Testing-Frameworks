const fs = require('fs');

exports.runTest = async function (testFile) {
    const code = await fs.promises.readFile(testFile, 'utf8');
    const testResult = {
      success: false,
      errorMessage: null,
    };
    try {

      const expect = (received) => ({
        toBe: (expected) => {
          if (received !== expected) {
            throw new Error(`Expected ${expected} but received ${received}.`);
          }
          return true;
        },
        toBeGreaterThanOrEqual: (expected) => { //test. this would be a frontend validation...
          if (received !== expected) {
            throw new Error(`Screenames must be longer than ${expected} characters. received ${received} characters.`);
          }
          return true;
        },
        toContain: (expected) => { 
          if (received.indexOf(expected) > -1) {
            throw new Error("Forbidden character!");
          }
          return true;
        },
      });
      eval(code);
      testResult.success = true;
    } catch (error) {
      testResult.errorMessage = error.message;
    }
    return testResult;
  };