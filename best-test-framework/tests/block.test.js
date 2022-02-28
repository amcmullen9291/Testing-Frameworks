
const { beforeEach, describe } = require('jest-circus');
 
const { inventory, getInventory, addToInventory } = require("./block");


beforeEach(() => inventory.clear()); 
 

describe("returned value", () => {
    let result = addToInventory("cheesecake", 2);
    expect(typeof result).toBe("number");
  });

  describe("returned value", () => {
    let result = addToInventory("cheesecake", "not a number");
    expect(typeof result).toBe("string");
  });

  describe("returned value", () => {
    let result = addToInventory("cheesecake", true);
    expect(typeof result).toBe("boolean");
  });

  describe("returned value", () => {
    const result = addToInventory("cheesecake", 9);
    expect(result).toBeGreaterThan(3); 
  });
   
  
 describe("array contents", () => {
   inventory
     .set("cheesecake", 1)
     .set("macarroon", 3)
     .set("croissant", 3)
     .set("eclaire", 7)
   const result = getInventory();
  
   expect(result).toEqual({ 
     "eclaire": 7,
     food2: 3,
     food3: 3,
     food4: 7,
     "macarroon": 3
   });
 });

   

 //your testing to see if the .save() funcitons save data/ creates a new Class instance
 //@do it with inventory.length() just reset length aftereach()?

 //the reason one test per file is the test stop when it reaches a fail.