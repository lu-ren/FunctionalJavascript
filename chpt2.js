const once = fn => {
    let done = false;

    return (...args) => {
        if (!done) {
            done = true;
            fn(...args);
        }
    }
};

const onceAndAfter = (f, g) => {
    let done = false;

    return (...args) => {
        if (!done) {
            done = true;
            f(...args);
        } else {
            g(...args);
        }
    };
};

const alternator = (f, g) => {
    let bool = true;

    return (...args) => {
        const x = bool ? f : g;
        bool = !bool;

        return x(...args);
    };
}

const thisManyTimes = (f, n) => {
    let i = 0;

    return (...args) => {
        if (i++ < n)
            return f(...args);
        return;
    };
};

const squeak = (x) => console.log(`${x} goes squeak!`);
const creak = (x) => console.log(`${x} goes creak!`);

const squeakThenCreak = onceAndAfter(squeak, creak);
const alternateSqueakAndCreate = alternator(squeak, creak);

const squeakNTimes = thisManyTimes(squeak, 2);

squeakThenCreak('Fox');
squeakThenCreak('Fox');
squeakThenCreak('Fox');

alternateSqueakAndCreate('Bear');
alternateSqueakAndCreate('Bear');
alternateSqueakAndCreate('Bear');
alternateSqueakAndCreate('Bear');

squeakNTimes('Wolf');
squeakNTimes('Wolf');
squeakNTimes('Wolf');
squeakNTimes('Wolf');
