// Exercise 1:
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, "foo");
});

Promise.all([promise1, promise2, promise3])
    .then(result => console.log(result))
    .catch(error => console.log(error));

/*
Promise.all() waits for all the promises to resolve.
It returns their values in the same order as the array.

promise1 resolves to 3.
promise2 is already the value 42.
promise3 resolves to "foo" after 3 seconds.
*/

// EXercise 2:
 /// the output will be [2, 4, 6]
