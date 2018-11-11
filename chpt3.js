let counter = (function(initialValue = 0) {
    let count = 0;

    return function() {
        return count++;
    };
}) (40);

const altSum3 = x => y => z => x + y + z;


console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());

console.log(altSum3(1)(2)(3));
