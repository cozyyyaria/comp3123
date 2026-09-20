// Exercise 6: ES6 Classes - Car and Sedan

class Car {
    constructor(model, year) {
        this.model = model;
        this.year = year;
    }

    getInfo() {
        return `${this.year} ${this.model}`;
    }
}

class Sedan extends Car {
    constructor(model, year, balance) {
        super(model, year);  // Call parent constructor
        this.balance = balance;
    }

    getFullInfo() {
        return `${this.getInfo()} - Balance: $${this.balance}`;
    }
}

// Test it
const myCar = new Sedan('Toyota Camry', 2024, 25000);
console.log(myCar.model);        // Toyota Camry
console.log(myCar.year);         // 2024
console.log(myCar.balance);      // 25000
console.log(myCar.getInfo());    // 2024 Toyota Camry
console.log(myCar.getFullInfo()); // 2024 Toyota Camry - Balance: $25000