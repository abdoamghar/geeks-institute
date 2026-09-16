const products = require("./products");

function findProduct(productName) {
    return products.find(product => product.name === productName);
}

console.log(findProduct("Laptop"));
console.log(findProduct("Phone"));
console.log(findProduct("Shoes"));
console.log(findProduct("Book"));