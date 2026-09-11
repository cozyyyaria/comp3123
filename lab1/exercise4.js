/**
 * COMP 3123 - Lab 1 - Exercise 4
 * Write a JavaScript program to find the types of a given angle.
 * 
 * Types of angles:
 * - Acute angle: An angle between 0 and 90 degrees (exclusive)
 * - Right angle: An angle of exactly 90 degrees
 * - Obtuse angle: An angle between 90 and 180 degrees (exclusive)
 * - Straight angle: An angle of exactly 180 degrees
 */

function angle_Type(angle) {
    if (angle < 90) {
        return "Acute angle";
    } else if (angle === 90) {
        return "Right angle";
    } else if (angle < 180) {
        return "Obtuse angle";
    } else if (angle === 180) {
        return "Straight angle";
    } else {
        return "Invalid angle";
    }
}

console.log("--- Exercise 4: Find Angle Type ---\n");

// Test cases from the lab
console.log("angle_Type(47):", angle_Type(47));   // Output: Acute angle
console.log("angle_Type(90):", angle_Type(90));   // Output: Right angle
console.log("angle_Type(145):", angle_Type(145)); // Output: Obtuse angle
console.log("angle_Type(180):", angle_Type(180)); // Output: Straight angle

// Additional test cases
console.log("\n--- Additional Tests ---");
console.log("angle_Type(1):", angle_Type(1));     // Output: Acute angle
console.log("angle_Type(89):", angle_Type(89));   // Output: Acute angle
console.log("angle_Type(91):", angle_Type(91));   // Output: Obtuse angle
