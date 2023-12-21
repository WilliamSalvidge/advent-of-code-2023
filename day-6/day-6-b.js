const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'UTF-8' });

const lines = input.split('\n');

const time = Number(lines[0].split(':')[1].trim().split(/\s+/).join(''));
const distance = Number(lines[1].split(':')[1].trim().split(/\s+/).join(''));

const finalRes = () => {
    tmp = []
    for (let i = 0; i <= time; i++) {
        const speed = i;
        const remainingTime = time - i;
        const res = remainingTime * speed;
        if (res <= distance) tmp.push(i);
        else break;
    }
    for (let i = time; i >= 0; i--) {
        const speed = i;
        const remainingTime = time - i;
        const res = remainingTime * speed;
        if (res <= distance) tmp.push(i);
        else break;
    }
    return tmp;
}

console.log((time + 1) - (finalRes()).length);
