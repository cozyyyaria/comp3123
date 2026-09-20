// Exercise 3: Use map() to capitalize each color
const capitalize = (str) => {
    const [first, ...rest] = str;
    return first.toUpperCase() + rest.join('');
};
const colors = ['red', 'green', 'blue', 'yellow', 'orange'];
const capitalizedColors = colors.map(color => capitalize(color));
console.log(capitalizedColors);
// Output: ['Red', 'Green', 'Blue', 'Yellow', 'Orange']