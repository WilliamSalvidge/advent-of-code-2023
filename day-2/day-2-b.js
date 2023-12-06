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

    // fs.writeFileSync('./output.json', JSON.stringify(output));
})

// Game 2

// Does each game have every colour

const gamesWithAllColours = Object.keys(output).filter(game => {
      
    // const tmp = true if the Set is of length 3 meaning all colours are present in game
    const colourSet = new Set();

    Object.keys(output[game]).forEach(draw => {
      Object.keys(output[game][draw]).forEach(colour => {
        colourSet.add(colour);
      })
    })

    // return if 
    return colourSet.size === 3;
});

//

const fewestCubes = Object.keys(output).map(game => {
      
    const lowestColours = new Map();

    Object.keys(output[game]).forEach(draw => {
      Object.keys(output[game][draw]).forEach(colour => {
        if (!lowestColours.has(colour)) {
          lowestColours.set(colour, output[game][draw][colour]);
          return;
        }
        if (lowestColours.get(colour) >= output[game][draw][colour]) return;
        lowestColours.set(colour, output[game][draw][colour]);
        return;
      })
    })
   
    return [ ...lowestColours.values() ].reduce((acc, curr) => acc * curr);
    
}).reduce((acc, curr) => acc + curr);

console.log(fewestCubes);
