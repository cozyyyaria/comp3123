/**
 * COMP 3123 - Lab 1 - Exercise 1
 * Write a JavaScript program to capitalize the first letter of each word of a given string.
 * 
 * Input:  "the quick brown fox"
 * Output: "The Quick Brown Fox"
 */

function capitalizeWords(str) {
    // Split the string into an array of words
    const words = str.split(' ');
    
    // Map over each word and capitalize the first letter
    const capitalizedWords = words.map(word => {
        // Get the first character, make it uppercase, add the rest of the word
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    
    // Join the words back together with spaces
    return capitalizedWords.join(' ');
}

// Test the function
const input = "the quick brown fox";
const result = capitalizeWords(input);

console.log("Input:  ", input);
console.log("Output: ", result);

// Additional test cases
console.log("\n--- Additional Tests ---");
console.log(capitalizeWords("hello world"));           // "Hello World"
console.log(capitalizeWords("javascript is awesome")); // "Javascript Is Awesome"
