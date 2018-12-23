// Motivation: methods such as .filter() and .map() are only available for arrays.
// Generally, modifying the prototypes in built-in Javascript objects is frowned upon
// So we turn to demethodizing for the answer

const demethodize1 = fn => (arg0, ...args) => fn.apply(arg0, args);
const demethodize2 = fn => (arg0, ...args) => fn.call(arg0, ...args);
const demethodize3 = fn => (...args) => fn.bind(...args)();

// Without demethodization
const name = 'functional';
const result = name.split('').map(x => x.toUpperCase());
console.log(result);

const map = demethodize3(Array.prototype.map);
const toUpperCase = demethodize3(String.prototype.toUpperCase);
const result2 = map(name, toUpperCase);
console.log(result2);

const toLocaleString = demethodize3(Number.prototype.toLocaleString);
const numbers = [2209.6, 124.56, 1048576];
const strings = numbers.map(toLocaleString);
console.log(strings);

