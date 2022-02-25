// index.mjs
import JestHasteMap from 'jest-haste-map';
import {cpus} from 'os';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';

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
// .log("exists?", hasteFS.exists('tests/01.test.js')); //tool to locate files
//let testFiles1 = hasteFS.matchFilesWithGlob(['**/01.test.js']);
//...end test 

const testFiles = hasteFS.matchFilesWithGlob(['**/*.test.js']);

await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    const code = await fs.promises.readFile(testFile, 'utf8');
    console.log(testFile + ':\n' + "code in file: " + code);
  }),
);
