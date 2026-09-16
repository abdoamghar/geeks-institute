import people from './data.js';

function averageAge(people) {
    const totalAge = people.reduce((sum, person) => sum + person.age, 0);
    return totalAge / people.length;
}

console.log(averageAge(people));