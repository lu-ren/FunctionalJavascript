const make3 = (a, b, c) => String(100 * a + 10 * b + c);
const make3c = a => b => c => String(100 * a + 10 * b + c);

console.log( `make3: ${make3(1, 2, 4)}` );
console.log( `make3c: ${make3c(1)(2)(4)}` );

// Practical example for currying
// Below is a function for Value Added Tax

const addVAT = (rate, amount) => amount * (1 + rate / 100);
console.log(addVAT(20, 500)); // 500 + 0.2 * 500
console.log(addVAT(15, 200));

const addVATc = rate => amount => amount * (1 + rate / 100);
const addNationalVAT = addVATc(6); // National tax is 6%
console.log( `National VAT on $500: ${addNationalVAT(500)}` );

// Automatic currying function

const curryByBind = fn => fn.length === 0 ? fn() : p => curryByBind(fn.bind(null, p));
const f1 = curryByBind(make3);
const f2 = f1(6);
const f3 = f2(5);
console.log(f3(8)); // Expect 658

// Non-recursive manual version

const step1 = make3.bind(null, 6);
const step2 = step1.bind(null, 5);
const step3 = step2.bind(null, 8);
step3(); // 658

// Automatic currying function for input function with varying length arguments

const curryByBind2 = (fn, len = fn.length) => len === 0 ? fn() : p => curryByBind2(fn.bind(null, p), len - 1);
const sum = (...args) => args.reduce((x, y) => x + y);
console.log( sum(1, 2, 3, 4, 5) );

const curriedSum5 = curryByBind2(sum, 5);
console.log( curriedSum5(1)(2)(3)(4)(5) );

// Partial application - Basically like currying, except you get to fix some of the arguments and curry the rest

const nonsense = (a, b, c, d, e) => `${a}/${b}/${c}/${d}/${e}`;
const fix2and5 = (a, c, d) => nonsense(a, 22, c, d, 1960);
const fixLast = (a, c) => fix2and5(a, c, 9);
