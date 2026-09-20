// Exercise 1: ES6 Syntax Practice
// Using: const, let, arrow functions, template literals, for...of
const name = "Ariana";
const greeting = `Hello ${name}! Welcome to ES6.`;
console.log(greeting);
const numbers = [1, 2, 3, 4, 5];
// Using for...of loop
for (const num of numbers) {
    console.log(`Number: ${num}`);
}
// Arrow function
const multiply = (a, b) => a * b;
console.log(`3 x 4 = ${multiply(3, 4)}`);