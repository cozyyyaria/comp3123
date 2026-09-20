// Exercise 2: Capitalize first letter using destructuring & spread
const capitalize = (str) => {
    const [first, ...rest] = str;
    return first.toUpperCase() + rest.join('');
};
// Test it
console.log(capitalize("hello"));   // Output: Hello
console.log(capitalize("world"));   // Output: World
console.log(capitalize("ariana"));  // Output: Ariana