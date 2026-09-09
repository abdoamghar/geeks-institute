//  Exercise 1:
let number = 500
let sum = 0
function displayNumbersDivisible(divisor) { // i added parameter for the bonus
    for (let i = 0; i <= number; i++) {
      if (i % divisor == 0) {
        console.log(i)
        sum += i
      }
    }
    console.log("sum: " + sum)
}

displayNumbersDivisible(23)

// Exercise 2:
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 

let shoppingList = ["banana", "orange", "apple"]

function myBill() {
    let total_price = 0

    for (let item of shoppingList) {
        if (stock[item] > 0) {
            total_price += prices[item]
            stock[item]--
        }
        else {
            console.log(item + " out of stock")
        }
    }
}

myBill()

// Exercise 3:
function changeEnough(itemPrice, amountOfChange) {
    let quarters = amountOfChange[0] * 0.25;
    let dimes = amountOfChange[1] * 0.10;
    let nickels = amountOfChange[2] * 0.05;
    let pennies = amountOfChange[3] * 0.01;

    let total = quarters + dimes + nickels + pennies;

    return total >= itemPrice;
}

console.log(changeEnough(4.25, [25, 20, 5, 0]));

// Exercise 4:
function hotelCost() {
    let nights;

    do {
        nights = prompt("How many nights would you like to stay?");
    } while (nights === "" || nights === null || isNaN(nights));

    return Number(nights) * 140;
}

function planeRideCost() {
    let destination;

    do {
        destination = prompt("What is your destination?");
    } while (destination === "" || destination === null || typeof destination !== "string");

    if (destination.toLowerCase() === "london") {
        return 183;
    } else if (destination.toLowerCase() === "paris") {
        return 220;
    } else {
        return 300;
    }
}

function rentalCarCost() {
    let days;

    do {
        days = prompt("How many days would you like to rent the car?");
    } while (days === "" || days === null || isNaN(days));

    let total = Number(days) * 40;

    if (days > 10) {
        total = total * 0.95;
    }

    return total;
}

function totalVacationCost() {
    let hotel = hotelCost();
    let plane = planeRideCost();
    let car = rentalCarCost();

    console.log(
        `The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`
    );

    return hotel + plane + car;
}

console.log("Total vacation cost: $" + totalVacationCost());

// Exercise 5:
// look folder name exercise 5