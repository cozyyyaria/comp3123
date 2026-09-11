/**
 * COMP 3123 - Lab 1 - Exercise 3
 * Write a JavaScript program to move last three characters to the start of a given string.
 * The string length must be greater or equal to three.
 * 
 * Input:  "Python"
 * Output: "honPyt"
 */

function right(str) {
    // If string length is less than 3, return as is
    if (str.length < 3) {
        return str;
    }
    
    // Get the last 3 characters
    const lastThree = str.slice(-3);
    
    // Get all characters except the last 3
    const remaining = str.slice(0, -3);
    
    // Concatenate: last 3 + remaining
    return lastThree + remaining;
}

console.log("--- Exercise 3: Move Last Three Characters to Start ---\n");

// Test cases from the lab
console.log('right("Python"):', right("Python"));         // Output: honPyt
console.log('right("JavaScript"):', right("JavaScript")); // Output: iptJavaScr
console.log('right("Hi"):', right("Hi"));                 // Output: Hi

// Additional test cases
console.log("\n--- Additional Tests ---");
console.log('right("abc"):', right("abc"));               // Output: abc
console.log('right("Hello"):', right("Hello"));           // Output: lloHe
