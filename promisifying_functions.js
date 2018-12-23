const promisify = fn => (...args) =>
    new Promise((resolve, reject) => 
        fn(...args, (err, data) => err ? reject(err) : resolve(data))
    );

// Without promisify function
const fs = require('fs');

const cb = (err, data) => err ? console.log('Error', err) : console.log('Success', data);

fs.readFile('./README.md', cb);
fs.readFile('./doesnt_exist.txt', cb);

// With promisify function
const fsPromise = promisify(fs.readFile.bind(fs));

const goodRead = data => console.log('Successful promise', data);
const badRead = err => console.log('Unsuccessful promise', err);

fsPromise('./README.md')
    .then(goodRead)
    .catch(badRead);

fsPromise('./doesnt_exist.txt')
    .then(goodRead)
    .catch(badRead);
