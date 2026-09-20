// Exercise 5: Use reduce() for sum and product
const numbers = [1, 2, 3, 4, 5];
// Calculate sum
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(`Sum: ${sum}`);  // Output: Sum: 15
// Calculate product
const product = numbers.reduce((acc, curr) => acc * curr, 1);
console.log(`Product: ${product}`);  // Output: Product: 120