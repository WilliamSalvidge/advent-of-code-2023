const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'UTF-8' });

const lines = input.split('\n');

const gameResults = [];

lines.forEach(line => {
    const initialSplit = line.split(': ');
    // const game = initialSplit[0].replace(' ', '_');
    const nums = initialSplit[1].split(' | ');
    const winningNumbers = nums[0].split(' ').filter(num => num !== '').map(num => Number(num));
    const gameNumbers = nums[1].split(' ').filter(num => num !== '').map(num => Number(num));

    let res = 0;
    gameNumbers.forEach(gameNumber => {
        if (winningNumbers.some(winningNumber => winningNumber === gameNumber)) {
            if (res === 0) {
                res = 1;
                return
            }
            res = res * 2
        }
    })
    
    gameResults.push(res);
})

const finalRes = gameResults.reduce((acc, curr) => acc + curr);

console.log(finalRes);