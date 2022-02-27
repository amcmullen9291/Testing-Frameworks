const NameFile = require('./FileName'); 

expect(NameFile("Anth?ony")).not.toContain("*");
expect(NameFile("Anth?ony")).not.toContain("/");
expect(NameFile("Anth/ony")).not.toContain("/");
expect(NameFile("Anth?ony")).not.toContain("?");
expect(NameFile("Anth?ony")).not.toContain("$");

//you run multiple tests in a file but it will stop after the first fail


//@ this afternoon try array list of forbidden characters
// also, 2 funcitons in one file (more than one export statement?)