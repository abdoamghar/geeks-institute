// Exercise 1:
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);
/// the output will be: I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)

// EXercise 2:
function displayStudentInfo(objUser){
    let fullname = objUser.first + " " + objUser.last
    console.log(`Your full name is ${fullname}`)
}

displayStudentInfo({first: 'Elie', last:'Schoppik'});

// Exercise 3:
const users = { user1: 18273, user2: 92833, user3: 90315 }
let usersArray = Object.entries(users)
console.log(usersArray)

const doubledUsers = usersArray.map(user => [user[0], user[1] * 2]);
console.log(doubledUsers);

// Exercise 4:
class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);
/// the output will be object

// Exercise 5:
// The correct answer is #2 ✅

class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
};

// Exercise 6:
"[2] === [2]"  // false
"{} === {} "   // false

const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;

console.log(object2.number); // 4
console.log(object3.number); // 4
console.log(object4.number); // 5
/// three variables point to the same object, JavaScript doesn't make a copy of the object. object2 points to the same object as object1.
class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}

class Mammal extends Animal {
    constructor(name, type, color) {
        super(name, type, color);
    }

    sound(animalSound) {
        return `${animalSound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
    }
}

const farmerCow = new Mammal("Lily", "cow", "brown and white");

console.log(farmerCow.sound("Moooo"));
