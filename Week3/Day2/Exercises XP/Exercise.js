// EXercise 1:
function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num <= 10) {
            resolve(`${num} is less than or equal to 10`);
        } else {
            reject(`${num} is greater than 10`);
        }
    });
}

compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log(error));

compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// EXercise 2:
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
    }, 4000);
});

promise.then(result => console.log(result));

// EXercise 3:
const promise1 = Promise.resolve(3);
const promise2 = Promise.reject("Boo!");

promise1.then(result => console.log(result));
promise2.catch(error => console.log(error));

// Exercise 4:

