// Exercise 1:
let randomNumber = Math.floor(Math.random() * 100) + 1;

for (let i = 0; i <= randomNumber; i += 2) {
    console.log(i);
}

// Exercise 2:
function capitalize(str) {
    let even = "";
    let odd = "";

    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            even += str[i].toUpperCase();
            odd += str[i];
        } else {
            even += str[i];
            odd += str[i].toUpperCase();
        }
    }

    return [even, odd];
}

console.log(capitalize("abcdef"));

// Exercise 3:
function isPalindrome(str) {
    let reversed = str.split("").reverse().join("");

    return str === reversed;
}

console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));

// Exercise 4:
function biggestNumberInArray(arrayNumber) {
    if (arrayNumber.length === 0) {
        return 0;
    }

    let biggest = 0;

    for (let i = 0; i < arrayNumber.length; i++) {
        if (typeof arrayNumber[i] === "number" && arrayNumber[i] > biggest) {
            biggest = arrayNumber[i];
        }
    }

    return biggest;
}

const array = [-1, 0, 3, 100, 99, 2, 99];
const array2 = ["a", 3, 4, 2];
const array3 = [];

console.log(biggestNumberInArray(array)); 
console.log(biggestNumberInArray(array2)); 
console.log(biggestNumberInArray(array3)); 

// Exercise 5:
function uniqueElements(array) {
    let newList = [];

    for (let i = 0; i < array.length; i++) {
        if (!newList.includes(array[i])) {
            newList.push(array[i]);
        }
    }

    return newList;
}

let list = [1, 2, 3, 3, 3, 3, 4, 5];

console.log(uniqueElements(list));

// Exercise 6:
function createCalendar(year, month) {
    let table = document.createElement("table");

    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let headerRow = document.createElement("tr");

    for (let day of days) {
        let th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    let firstDay = new Date(year, month - 1, 1);
    let lastDay = new Date(year, month, 0);

    let startDay = firstDay.getDay();

    if (startDay === 0) {
        startDay = 7;
    }

    let daysInMonth = lastDay.getDate();
    let row = document.createElement("tr");

    for (let i = 1; i < startDay; i++) {
        let td = document.createElement("td");
        row.appendChild(td);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let td = document.createElement("td");
        td.textContent = day;
        row.appendChild(td);

        if ((startDay + day - 1) % 7 === 0) {
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }

    if (row.children.length > 0) {
        while (row.children.length < 7) {
            let td = document.createElement("td");
            row.appendChild(td);
        }

        table.appendChild(row);
    }

    document.body.appendChild(table);
}

createCalendar(2012, 9);  // you can find the html file with name "XP Ninja.html"