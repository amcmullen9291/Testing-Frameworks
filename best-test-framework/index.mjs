import JestHasteMap from 'jest-haste-map';
import { cpus } from 'os';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'jest-worker';
import fs from 'fs';
import chalk from 'chalk';

const root = dirname(fileURLToPath(import.meta.url));

const hasteMap = new JestHasteMap.default({
  extensions: ['js'],
  maxWorkers: cpus().length,
  name: 'best-testing-framework',
  platforms: [],
  rootDir: root,
  roots: [root],
});

const {hasteFS} = await hasteMap.build();

//...test
console.log("exists?", hasteFS.exists('tests/01.test.js')); //tool to locate files
let testFiles1 = hasteFS.matchFilesWithGlob(['**/01.test.js']);
console.log(testFiles1);
//...end test 

const testFiles = hasteFS.matchFilesWithGlob(['**/*.test.js']);

const worker = new Worker(join(root, 'worker.js'), {
    enableWorkerThreads: true,
  });

// await Promise.all(
//     Array.from(testFiles).map(async (testFile) => {
//       let testResult = await worker.runTest(testFile);
//       const code = await fs.promises.readFile(testFile, 'utf8');
//       console.log(testResult.success = true ? console.log( chalk.bgMagentaBright.gray.inverse("Success!")) : console.log( chalk.red.inverse("Failure!")));
//       console.log( "code in file: " + chalk.dim(code));
//     }),
//   );

  for await (const testFile of testFiles){
      const { success, errorMessage } = await worker.runTest(testFile);
      const status = true ? chalk.green.inverse("Success!") : chalk.red.inverse("Failure!");

      console.log (status, '\n' + chalk.dim(relative(root, testFile)));
    } 
//   processes are running at same time. they get reported back as they finish
//   no set order. same data returned as prev console.log

  worker.end(); //closes thread/ process