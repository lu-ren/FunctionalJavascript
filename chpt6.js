markers = [    
    {name: "UY", lat: -34.9, lon: -56.2},    
    {name: "AR", lat: -34.6, lon: -58.4},    
    {name: "BR", lat: -15.8, lon: -47.9},
    {name: "BO", lat: -16.5, lon: -68.1},
    {name: "XO", lat: 14.0, lon: -12.2}
];

let brazilData = markers.find(v => v.name == 'BR'),
    brazilIndex = markers.findIndex(v => v.name == 'BR');
console.log(`${ JSON.stringify(brazilData) }, ${ brazilIndex }`);

let nonData = markers.find(v => v.name == 'MX'),
    nonDataIndex = markers.findIndex(v => v.name == 'MX');
console.log(`${ nonData }, ${ nonDataIndex }`);

console.log([1, 2, NaN, 4].findIndex(v => isNaN(v)));

// Emulating find() and findIndex() with reduce()

const find = (arr, fn) => 
    arr.reduce((ac, v) => (ac === undefined && fn(v) ? v : ac), undefined);

const findIndex = (arr, fn) =>
    arr.reduce((ac, v, i) => (ac === -1 && fn(v) ? i : ac), -1);

console.log( find(markers, x => x.name === 'BO') );

console.log( findIndex(markers, x => x.name === 'BO') );

console.log( markers.every(v => v.lat < 0 && v.lon < 0) );

console.log( markers.some(v => v.lat < 0 && v.lon < 0) );

Array.prototype.none = function(fn) {
    return this.every(x => !fn(x));
};

// 'this' points at the nearest bound this
//
// Array.prototype.none = fn => this.every(x => !fn(x));

console.log(markers.none(x => x.lat < 0 && x.lon < 0));


// Emulating every() and some() using reduce

const every = (arr, fn) =>
    arr.reduce((ac, v) => ac && fn(v), true);

const some = (arr, fn) =>
    arr.reduce((ac, v) => ac || fn(v), false);

console.log( some(markers, v => v.lat > 0 && v.lon > 0 ));

// Randomizer (chpt 6 question 6.3) - higher-order funciton which receives variable number of functions as argument
// Returns a new function that will, on each call, randomly call one of the input functions
// This is useful as a load balancer for instance

const randomizer = (...fn) => fn[ Math.floor(Math.random() * fn.length) ];
const sum1 = x => x + 1;
const sum2 = x => x + 2;
const sum3 = x => x + 3;

const randomSum = randomizer(sum1, sum2, sum3);

console.log( `randomSum: ${randomSum(0)}` )

// Randomizer which ensures no function is called twice in a row

const randomizer2 = (...fn) => {
    let indices = [...Array(fn.length).keys()];

    return (i) => {
        if (indices.length == 0)
            return;

        const index = indices.splice(Math.floor(Math.random() * indices.length), 1);

        return fn[index](i);
    };
};

const randomSum2 = randomizer2(sum1, sum2, sum3);

console.log( `randomSum2: ${randomSum2(0)}` )
console.log( `randomSum2: ${randomSum2(0)}` )
console.log( `randomSum2: ${randomSum2(0)}` )
console.log( `randomSum2: ${randomSum2(0)}` )
