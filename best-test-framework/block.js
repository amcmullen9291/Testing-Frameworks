let inventory = new Map();
let addToInventory = (item, n) => {
    // if(typeof n !== "number") throw new Error("quantity must be a number");

    let currentQuantity = inventory.get(item) || 0;
    let newQuantity = currentQuantity = n;
    inventory.set(item, newQuantity);
    return newQuantity
}

const getInventory = () => {
    let contentArray = Array.from(inventory.entries());
    let contents = contentArray.reduce(
        (contents, [name,quantity]) => {
            return { ...contents, [name]: quantity};
        },
        {}
    );
    return {...contents, generatedAt: new Date() };
}

module.exports = { inventory, addToInventory, getInventory };
