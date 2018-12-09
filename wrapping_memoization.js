// Wrapping functions

const addLogging = fn => (...args) => {
    console.log(`Entering ${fn.name}: ${args}`);
    const ret = fn(...args);
    console.log(`Exiting ${fn.name}: ${ret}`);

    return ret;
};

function subtract(a, b) {
    return a + changeSign(b);
}

function changeSign(a) {
    return -a;
}

subtract = addLogging(subtract);
changeSign = addLogging(changeSign);

let x = subtract(7, 5);

// Handling exceptions in wrapped functions

const addLogging2 = fn => (...args) => {
    console.log(`Entering ${fn.name}: ${args}`);

    try {
        const ret = fn(...args);
        console.log(`Exiting ${fn.name}: ${ret}`);
    } catch (thrownError) {
        console.log(`Exiting ${fn.name}: threw ${thrownError}}`);
        throw thrownError;
    }
}

// More 'pure' logging wrapper

const addLogging3 = (fn, logger = console.log) => (...args) => {
    logger(`Entering ${fn.name}: ${args}`);

    try {
        const ret = fn(...args);
        logger(`Exiting ${fn.name}: ${ret}`);
    } catch (thrownError) {
        logger(`Exiting ${fn.name}: threw ${thrownError}}`);
        throw thrownError;
    }
}

// Timing wrapper

const { performance } = require('perf_hooks');

const put = (text, name, startTime, endTime) =>
    console.log(`${name} - ${text} ${endTime - startTime} ms`);

const get = () => performance.now();

const addTiming = (f, getTime = get, output = put) => (...args) => {
    const startTime = getTime();

    try {
        const ret = f(...args);
        output('normal exit', f.name, startTime, getTime());
    } catch (error) {
        output('caught exception', f.name, startTime, getTime());
        throw error;
    }
};

// Memoization

// Non-memoized fibonacci implementation

function fib(n) {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

const memoize = fn => {
    const cache = {};

    return x => (x in cache ? cache[x] : (cache[x] = fn(x)));
};

// Incorrect use of memoization. All intermediate calculation is not cached, only the end result
console.log('Incorrect memoized fib');
const memoizedFib = memoize(x => fib(x));
addTiming(memoizedFib)(45);
addTiming(memoizedFib)(45);
addTiming(memoizedFib)(40);
addTiming(memoizedFib)(35);

// Correct use of memoization. Note that fib was reassigned to memoized(fib)
fib = memoize(fib);
console.log('Correct memoized fib');
const testFib = x => fib(x);
addTiming(testFib)(45);
addTiming(testFib)(45);
addTiming(testFib)(40);
addTiming(testFib)(35);

// Follow up question, how do we memoize fib without reassigning it?

// Extended memoization for functions with multiple arity
const extendedMemoization = fn => {
    let cache = {};
    const PRIMITIVES = ['number', 'string', 'boolean'];

    return (...args) => {
        const strX = args.length == 1 && PRIMITIVES.includes(typeof args[0]): args[0] ? JSON.stringify(args);

        return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
    };
};
