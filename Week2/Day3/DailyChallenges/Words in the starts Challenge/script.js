let words = prompt("Enter several words separated by commas:");

let wordsArray = words.split(",").map(word => word.trim());

let longestWord = 0;

for (let word of wordsArray) {
    if (word.length > longestWord) {
        longestWord = word.length;
    }
}

let border = "*".repeat(longestWord + 4);

console.log(border);

for (let word of wordsArray) {
    console.log(`* ${word.padEnd(longestWord, " ")} *`);
}

console.log(border);