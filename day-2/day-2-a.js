const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'UTF-8'});

const lines = data.split('\n');

const linesClean = lines.slice(0, 100);

const output = {};

linesClean.forEach(line => {

    const splitLine = line.split(':')

    const game = splitLine[0].split(' ').join('_')
    const draws = splitLine[1].split(';').map(res => res.trim());

    const tmp = {}

    draws.forEach((draw, index) => {
        const tmpDraw = draw
        .split(',')
        .map(res => res.trim())
        .map(res => res.split(' '));

        const tmpTmp = {};

        tmpDraw.forEach(x => {
            tmpTmp[x[1]] = Number(x[0]);
        })

        tmp[`Draw_${index + 1}`] =  tmpTmp;

    })

    output[game] = tmp;

    fs.writeFileSync('./output.json', JSON.stringify(output));
})

const maxColours = { red: 12, green: 13, blue: 14 };

const result = Object.keys(output)
    .filter(game => { // Game_1 etc.
        const tmp = Object.keys(output[game]) // Draw_1 etc.
            .filter(draw => {
                const tmpTwo = Object.keys(output[game][draw]) // 'red', 'green', 'blue'
                    .map(colour => {
                        return output[game][draw][colour] > maxColours[colour] ? false : true;
                })
                console.log(tmpTwo)
                return tmpTwo.every(x => x === true);
            })
        console.log(tmp)
        return tmp.length === Object.keys(output[game]).length;
        
}).reduce((acc, curr) => {
    currNum = Number(curr.split('_')[1]);
    return acc + currNum;
}, 0)

console.log(result);