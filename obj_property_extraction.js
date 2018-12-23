markers = [
    {name: "UY", lat: -34.9, lon: -56.2},
    {name: "AR", lat: -34.6, lon: -58.4},
    {name: "BR", lat: -15.8, lon: -47.9},
    {name: "BO", lat: -16.5, lon: -68.1}
];

const average = arr => {
    const sc = arr.reduce((ac, val) => ({ sum: val + ac.sum, count: ac.count + 1}),
        { sum: 0, count: 0});

    return sc.sum / sc.count;
};

// Without generalized getField()
let averageLat = average(markers.map(x => x.lat));
let averageLon = average(markers.map(x => x.lon));

console.log(`avg_lat: ${averageLat}, avg_lon: ${averageLon}`);

const getField = attr => obj => obj[attr];

let averageLat2 = average(markers.map(getField('lat')));
let averageLon2 = average(markers.map(getField('lon')));

console.log(`avg_lat: ${averageLat2}, avg_lon: ${averageLon2}`);
