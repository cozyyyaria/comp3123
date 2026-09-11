/**
 * COMP 3123 - Lab 1 - Exercise 2
 * Write a JavaScript program to find the largest of three given integers.
 * 
 * Uses Math.max() to find the maximum value among three numbers.
 */

// Using the built-in Math.max function
console.log("--- Exercise 2: Find Largest of Three Integers ---\n");

// Test cases from the lab
console.log("max(1, 0, 1):", Math.max(1, 0, 1));           // Output: 1
console.log("max(0, -10, -20):", Math.max(0, -10, -20));   // Output: 0
console.log("max(1000, 510, 440):", Math.max(1000, 510, 440)); // Output: 1000

// Additional test cases
console.log("\n--- Additional Tests ---");
console.log("max(5, 10, 3):", Math.max(5, 10, 3));         // Output: 10
console.log("max(-1, -2, -3):", Math.max(-1, -2, -3));     // Output: -1
