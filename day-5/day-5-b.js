// seeds

// [[10, 5], [30, 6]]
// 10, 11, 12, 13, 14 - 30, 31, 32, 33, 34, 35

// forwards need to go through every number
// backwards just need to go from lowest number

const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });

const maps = input.split('\n\n')

const seedPairs = []

const seeds = maps.shift().split(': ')[1].split(' ').map(seed => Number(seed))

seeds.forEach((seed, idx) => {
    if (idx % 2 === 1) {
        seedPairs.push([seeds[idx -1], seeds[idx]])
    }
});

const mapOfMaps = new Map();

maps.forEach(map => {
    const tmp = map.split(':\n');
    const mapName = tmp[0].split(' ').shift();
    const mapValues = tmp[1].split('\n').map(tmpInternal => tmpInternal.split(' ')).map(x => x.map(y => Number(y)));
    mapOfMaps.set(mapName, mapValues);
});

const revRecursiveFunction = (value, arrayOfMapNames, index) => {
    if (!mapOfMaps.has(arrayOfMapNames[index])) {
        return value;
    }
   
    const matchedMap = mapOfMaps.get(arrayOfMapNames[index])

    let tmpVal = -1;
    matchedMap.forEach((match, idx) => {
        if (value >= match[0] && value < (match[0] + match[2])) {
            const tmp = value - match[0];
            tmpVal = match[1] + tmp;
            }
        }
    )
    if (tmpVal === -1) tmpVal = value;

    return revRecursiveFunction(tmpVal, arrayOfMapNames, index + 1);
};

const highest = mapOfMaps.get('humidity-to-location').reduce((acc, cur) => {
    if (cur[0] > acc[0]) return cur;
    return acc;
})

let finalRes;
for (let i = 0; i <= (highest[0] + highest[2]); i++) {
    if (i % 1000 === 0) console.log(i);
    const x = revRecursiveFunction(i, [ ...mapOfMaps.keys() ].reverse(), 0);
    const res = seedPairs.find(seedPair => seedPair[0] <= x && (seedPair[0] + seedPair[1]) >= x);
    if (res) {
        finalRes = i;   
        break;
    }
}

console.log(`final res = ${finalRes}`);