// Higher-order negation function
const not = fn => (...args) => !fn(...args);
const invert = fn => (...args) => -fn(...args);

//Arity change
const unary = fn => (...args) => fn(args[0]);
