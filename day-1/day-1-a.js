const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'UTF-8' });

const lines = input.split('\n');

const linesSplit = lines.map(line => line.split(''))

const res = linesSplit.map(lineSplit => lineSplit.filter((x) => !!Number(x)).map((x) => Number(x)));

const resTwo = res.map(innerRes => Number([innerRes[0], innerRes[innerRes.length - 1]].join(''))).reduce((acc, cur) => acc + cur);

console.log(resTwo);

