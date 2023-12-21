
const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });

const maps = input.split('\n\n')

const seeds = maps.shift().split(': ')[1].split(' ').map(seed => Number(seed));

const mapOfMaps = new Map();

maps.forEach(map => {
    const tmp = map.split(':\n');
    const mapName = tmp[0].split(' ').shift();
    const mapValues = tmp[1].split('\n').map(tmpInternal => tmpInternal.split(' ')).map(x => x.map(y => Number(y)));
    mapOfMaps.set(mapName, mapValues);
});

const recursiveFunction = (value, arrayOfMapNames, index) => {
    if (!mapOfMaps.has(arrayOfMapNames[index])) {
        return value;
    }
    
    const matchedMap = mapOfMaps.get(arrayOfMapNames[index])
    
    let tmpVal = -1;
    matchedMap.forEach((match, idx) => {
        if (value >= match[1] && value < (match[1] + match[2])) {
            const tmp = value - match[1];
            tmpVal = match[0] + tmp;
            }
        }
    )
    if (tmpVal === -1) tmpVal = value;

    return recursiveFunction(tmpVal, arrayOfMapNames, index + 1);
};

const res = seeds.map((seed, indx) => {
    console.log(`seed ${indx + 1} of ${seeds.length}`)
    return recursiveFunction(seed, [...mapOfMaps.keys()], 0);
})

const reduceRes = res.reduce((acc, cur) => cur < acc ? cur : acc);

console.log(reduceRes);
