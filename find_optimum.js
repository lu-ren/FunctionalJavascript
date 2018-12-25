// This approach is not sufficiently general

const findOptimum = arr => Math.max(...arr);

const array = [22, 9, 60, 12, 4, 56];
console.log( findOptimum(array) );

// General findOptimum higher-order function with comparator function argument

const findOptimum2 = fn => arr => arr.reduce(fn);

const findMaximum = findOptimum2((x, y) => (x > y ? x : y));
const findMinimum = findOptimum2((x, y) => (x > y ? y : x));

console.log( findMaximum(array) );
console.log( findMinimum(array) );
