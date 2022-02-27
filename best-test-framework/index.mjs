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
        // console.log("exists?", hasteFS.exists('tests/01.test.js')); //tool to locate files
        // let testFiles1 = hasteFS.matchFilesWithGlob(['**/01.test.js']);
        // console.log(testFiles1);
//...end test 

// const testFiles = hasteFS.matchFilesWithGlob(['**/*.test.js']);

const testFiles = hasteFS.matchFilesWithGlob([
    process.argv[2] ? `**/${process.argv[2]}*` : '**/*.test.js',
  ]);

const worker = new Worker(join(root, 'worker.js'), {
    enableWorkerThreads: true,
  });

let hasFailed = false;
await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    const {success, errorMessage} = await worker.runTest(testFile);
    const status = success
      ? chalk.green.inverse.bold(' PASS ')
      : chalk.red.inverse.bold(' FAIL ');

    console.log(status + ' ' + chalk.dim(relative(root, testFile)));
    if (!success) {
      hasFailed = true;
      console.log('  ' + errorMessage);
    }
  }),
);
worker.end();
if (hasFailed) {
  console.log(
    '\n' + chalk.red.bold('Test run failed, please fix all the failing tests.'),
  );

  process.exitCode = 1;
}
  //...for notes
        // for await (const testFile of testFiles){
        //     const { success, errorMessage } = await worker.runTest(testFile);
        //     console.log(await worker.runTest(testFile))
        // } 
//   processes are running at same time. they get reported back as they finish
//   no set order. same data returned as prev console.log

//   worker.end(); //closes thread/ process (processes already ended with exitCode = 1);