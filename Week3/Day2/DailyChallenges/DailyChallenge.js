// first challenge:
function makeAllCaps(words) {
    return new Promise((resolve, reject) => {
        if (words.every(word => typeof word === "string")) {
            resolve(words.map(word => word.toUpperCase()));
        } else {
            reject("All items must be strings");
        }
    });
}

function sortWords(words) {
    return new Promise((resolve, reject) => {
        if (words.length > 4) {
            resolve(words.sort());
        } else {
            reject("Array length must be bigger than 4");
        }
    });
}

makeAllCaps([1, "pear", "banana"])
    .then(arr => sortWords(arr))
    .then(result => console.log(result))
    .catch(error => console.log(error));

makeAllCaps(["apple", "pear", "banana"])
    .then(arr => sortWords(arr))
    .then(result => console.log(result))
    .catch(error => console.log(error));

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
    .then(arr => sortWords(arr))
    .then(result => console.log(result))
    .catch(error => console.log(error));

// second challenge:
const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`

function toJs() {
    return new Promise((resolve, reject) => {
        const morseJS = JSON.parse(morse);

        if (Object.keys(morseJS).length === 0) {
            reject("Morse object is empty");
        } else {
            resolve(morseJS);
        }
    });
}


function toMorse(morseJS) {
    return new Promise((resolve, reject) => {
        const input = prompt("Enter a word or sentence: ").toLowerCase();

        const letters = input.split("");
        const translation = [];

        for (let letter of letters) {
            if (letter === " ") {
                translation.push("/");
            } else if (letter in morseJS) {
                translation.push(morseJS[letter]);
            } else {
                reject(`Character "${letter}" doesn't exist in Morse`);
                return;
            }
        }

        resolve(translation);
    });
}


function joinWords(morseTranslation) {
    const result = morseTranslation.join("<br>");
    document.body.innerHTML += result;
}


toJs()
    .then(morseJS => toMorse(morseJS))
    .then(morseTranslation => joinWords(morseTranslation))
    .catch(error => console.log(error));