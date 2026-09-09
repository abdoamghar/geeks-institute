// EXercise 1:
function isBlank(str) {
    return str === "";
}

console.log(isBlank(""));     
console.log(isBlank("abc"));

// Exercise 2:
function abbrevName(name) {
    let parts = name.split(" ");
    return parts[0] + " " + parts[1][0].toUpperCase() + ".";
}

console.log(abbrevName("Robin Singh"));

// Exercise 3:
function swapCase(str) {
    let result = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase()) {
            result += str[i].toLowerCase();
        } else {
            result += str[i].toUpperCase();
        }
    }

    return result;
}

console.log(swapCase("The Quick Brown Fox"));

// Exercise 4:
function isOmnipresent(array, value) {
    for (let subArray of array) {
        if (!subArray.includes(value)) {
            return false;
        }
    }

    return true;
}

console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); 
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6));

// Exercise 5: 
// you can find it in "XP Gold Exercise 5.html"
