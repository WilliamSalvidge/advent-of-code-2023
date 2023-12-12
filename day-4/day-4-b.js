const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'UTF-8' });

const lines = input.split('\n');

const recur = (lines, lineIndx) => {
    const initialSplit = lines[lineIndx].split(': ');
    const nums = initialSplit[1].split(' | ');
    const winningNumbers = nums[0].split(' ').filter(num => num !== '').map(num => Number(num));
    const gameNumbers = nums[1].split(' ').filter(num => num !== '').map(num => Number(num));

    let res = [];
    gameNumbers.forEach(gameNumber => {
        if (winningNumbers.some(winningNumber => winningNumber === gameNumber)) {
            res.push(gameNumber);
        }
    })
    
    if (!res.length) {
        return 0;
    }

    let tmpStore = 0
    for (let i = 1; i <= res.length; i++) {
        const tmp = recur(lines, lineIndx + i);
        tmpStore = tmpStore + tmp;
    }

    return res.length + tmpStore;
} 

const res = []

lines.forEach((_, lineIndx) => {

    console.log(lineIndx)
    const invk = recur(lines, lineIndx);
    res.push(invk);
})

const reduceRes = res.reduce((acc, curr) => acc + curr)

// Add each line as they also count as 1 scratch card
console.log(reduceRes + lines.length);