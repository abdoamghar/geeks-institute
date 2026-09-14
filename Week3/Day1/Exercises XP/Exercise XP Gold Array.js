// Exercise1:
const exercise1 = [1, 2, 3].map(num => {
  if (typeof num === "number") return num * 2;
  return;
});

console.log(exercise1);
// [2, 4, 6]


// Exercise2:
const exercise2 = [[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2]
);

console.log(exercise2);
// [1, 2, 0, 1, 2, 3]


// Exercise3:
const arrayNum = [1, 2, 4, 5, 8, 9];

const newArray = arrayNum.map((num, i) => {
  console.log(num, i);
  return num * 2;
});

console.log(newArray);

// i values:
// 0, 1, 2, 3, 4, 5


// Exercise4:
const array = [[1], [2], [3], [[[4]]], [[[5]]]];

const flatArray = array.flat(2);

console.log(flatArray);
// [1, 2, 3, [4], [5]]

console.log([[1], [2], [3], [[[4]]], [[[5]]]].flat(2));

const greeting = [
  ["Hello", "young", "grasshopper!"],
  ["you", "are"],
  ["learning", "fast!"]
];

const greetingArray = greeting.map(words => words.join(" "));

console.log(greetingArray);
// ["Hello young grasshopper!", "you are", "learning fast!"]

const greetingString = greetingArray.join(" ");

console.log(greetingString);
// Hello young grasshopper! you are learning fast!

const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];

const result = trapped.flat(Infinity);

console.log(result);
// [3]