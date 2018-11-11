// Introduction to reduce() function
const array = [22, 9, 60, 12, 4, 56];

const sum = (x, y) => x + y;

const loggedSum = (x, y) => {
    console.log(`${x} + ${y}`);
    return x + y;
};

const summedArray = array.reduce(sum, 0);

// Three different ways to calculating avg using reduce()
const average = (sum, val, ind, arr) => {
    sum += val;

    return ind == arr.length - 1 ? sum / arr.length : sum;
};

const average2 = arr => {
    const sc = arr.reduce((ac, val) => ({ sum: val + ac.sum, count: ac.count + 1}),
        { sum: 0, count: 0 });

    return sc.sum / sc.count;
};

const average3 = arr => {
    const sc = arr.reduce((ac, val) => ([ val + ac[0], ac[1] + 1 ]),
        [0, 0]);

    return sc[0]/ sc[1];
};

// Introduction to reduceRight()
const reverseString = str => {
    const reversed = str.split('').reduceRight((ac, val) => ac + val, '');

    return reversed;
};

console.log(reverseString("HELLOWORLD"));

// Emulating map() with reduce()
const map = (arr, f) => arr.reduce((ac, v) => ac.concat(f(v)), [])
const dup = x => 2 * x;
console.log(map(array, dup));

const accounts = { 
    accountsData: [ 
        { id: "F220960K", balance: 1024 }, 
        { id: "S120456T", balance: 2260 }, 
        { id: "J140793A", balance: -38 }, 
        { id: "M120396V", balance: -114 }, 
        { id: "A120289L", balance: 55000 } 
    ]
};

const delinquent = accounts.accountsData.filter( x => x.balance < 0);
console.log(delinquent);
console.log(delinquent.map( x => x.id ));

// Emulating filter() with reduce()
const filter = (arr, f) => arr.reduce((ac, v) =>
    f(v) ? ac.concat(v) : ac, []);

console.log(filter(accounts.accountsData, data => data.balance > 0));

// Questions
let characters = [
    {name: "Fred", plays: "bowling"}, 
    {name: "Barney", plays: "chess"}, 
    {name: "Wilma", plays: "bridge"}, 
    {name: "Betty", plays: "checkers"}, 
    {name: "Pebbles", plays: "chess"}
];

let listedHtml = (arr, f) => arr.map( x => `<li>${f(x)}</li>`).join('\n');
let divBlock = `<div><ul>\n${listedHtml(characters, x => x.name)}\n</ul></div>`;

console.log(divBlock);

// Basic non-descending range
range = (x, y) => new Array(y - x).fill(0).map((v, i) => x + i);
console.log(range(1, 10));

extendedRange = (x, y, z = 1) => new Array(Math.ceil(Math.abs(y - x) / z)).fill(0).map((v, i) => x + Math.sign(y - x) * z * i);
console.log(extendedRange(10, 1));
console.log(extendedRange(3, 9));
console.log(extendedRange(20, 1, 3));

const alphabet = range('A'.charCodeAt(), 'Z'.charCodeAt() + 1)
    .map(x => String.fromCharCode(x));
console.log(alphabet);

const data = [[1,2,3,4], [5,6,7,8], [9,10,11,12]];

const toCSV = d => d.map(
        r => r.map(x => x.toString()).join(',')
    )
    .join('\n');

console.log(toCSV(data));
