const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'UTF-8' });

const lines = input.split('\n');

const times = lines[0].split(':')[1].trim().split(/\s+/).map(num => Number(num));
const distances = lines[1].split(':')[1].trim().split(/\s+/).map(num => Number(num));

const finalRes = times.map((time, index) => {
    const distance = distances[index];
    tmp = []
    for (let i = 0; i <= time; i++) {
        const speed = i;
        const remainingTime = time - i;
        const res = remainingTime * speed;
        if (res > distance) tmp.push(i);
    }
    return tmp.length;
}).reduce((acc, curr) => acc * curr);

console.log(finalRes);
