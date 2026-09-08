// Exercise 1:
let numbers = [123, 8409, 100053, 333333333, 7];

for (let number of numbers) {
    console.log(number % 3 === 0);
}

// Exercise 2:
let guestList = {
    randy: "Germany",
    karla: "France",
    wendy: "Japan",
    norman: "England",
    sam: "Argentina"
};

let name = prompt("What is your name?");

if (name in guestList) {
    console.log(`Hi! I'm ${name}, and I'm from ${guestList[name]}.`);
} else {
    console.log("Hi! I'm a guest.");
}

// Exercise  3:
let age = [20, 5, 12, 43, 98, 55];

let sum = 0;
let highest = age[0];

for (let i = 0; i < age.length; i++) {
    sum += age[i];

    if (age[i] > highest) {
        highest = age[i];
    }
}

console.log(sum);
console.log(highest);