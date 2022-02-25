const NameFile = require('./FileName'); 
const forbiddenChar = ["*", "!", "%"];
forbiddenChar.map(char => {
expect(NameFile("Ant*hony")).toContain(char);
})


//@ this afternoon try array list of forbidden characters
// also, 2 funcitons in one file (more than one export statement?)