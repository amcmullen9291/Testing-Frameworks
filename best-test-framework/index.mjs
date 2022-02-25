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

  await Promise.all(
    Array.from(testFiles).map(async (testFile) => {
      let { success, errorMessage } = await worker.runTest(testFile);
      const code = await fs.promises.readFile(testFile, 'utf8');
    //   console.log("init pass: ", status);
       success == true ? console.log(chalk.green("Success!"))  : console.log(chalk.white.bgRedBright.inverse("Fail!"));
      if(errorMessage){console.log(chalk.bgRedBright.black("Error: ")+ ' ' + errorMessage);}
    //   console.log( "code in file " + chalk.dim(relative(root, testFile)) + ': ' + code);
    }),
  );

  for await (const testFile of testFiles){
      const { success, errorMessage } = await worker.runTest(testFile);
      console.log(await worker.runTest(testFile))
  } 
//   processes are running at same time. they get reported back as they finish
//   no set order. same data returned as prev console.log

  worker.end(); //closes thread/ process