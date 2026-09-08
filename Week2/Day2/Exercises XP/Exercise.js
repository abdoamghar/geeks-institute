/////// Exercise 1:
const people = ["Greg", "Mary", "Devon", "James"]

people.shift()
people[2] = "Jason"
people.push("Abdelhamid")
console.log(people.indexOf("Mary"))
const new_people = people.slice(1, 3)
console.log(new_people.indexOf("Foo"))
/// it returns -1 because Foo doesnt exist in the array

let last = people[people.length - 1]

for (let x of people) {
    console.log(x)
}

for (let x of people) {
    console.log(x)
    if (x == "Devon") break
}

// Exercise 2:
let colors = ["blue", "green", "brown"]
let suffixes = ["st", "nd", "rd"];

for (let i = 0; i < colors.length; i++) {
    console.log(`My #${i + 1} choice is ${colors[i]}`) }

for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}

// Exercise 3:
let number = Number(prompt("Enter a number: "));

while (number < 10 && typeof(number) == "number") {
    number = Number(prompt("Enter a new number: "));
} 

// Exercise 4:
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent: {
        sarah: [3, 990],
        dan: [4, 1000],
        david: [1, 500],
    },
};

console.log(building.numberOfFloors);

console.log(building.numberOfAptByFloor.firstFloor);
console.log(building.numberOfAptByFloor.thirdFloor);

console.log(building.nameOfTenants[1]);
console.log(building.numberOfRoomsAndRent.dan[0]);

if (
    building.numberOfRoomsAndRent.sarah[1] +
    building.numberOfRoomsAndRent.david[1] >
    building.numberOfRoomsAndRent.dan[1]
) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}

// Exercise 5:
const family = {
    father: "aymen",
    mother: "Sarah",
    son: "ilyess",
    daughter: "fatima"
};

for (let key in family) {
    console.log(key);
}

for (let key in family) {
    console.log(family[key]);
}

// Exercise 6:
const details = {
    my: "name",
    is: "Rudolf",
    the: "reindeer"
};

let sentence = "";

for (let key in details) {
    sentence += key + " " + details[key] + " "
}

console.log(sentence);

// Exercise 7:
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

let letters = [];

for (let name of names) {
    letters.push(name[0]);
}

letters.sort();

console.log(letters.join(""));

