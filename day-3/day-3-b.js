const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'UTF-8' });

const lines = input.split('\n');

const schematics = lines.map(line => line.split(''));

const findNum = (rowIndx, colIndx, table) => {
    const numReg = new RegExp(/\d/);

    if (colIndx < 0 || !numReg.test(table[rowIndx][colIndx])) {
        return '';
    }

    return findNum(rowIndx, colIndx - 1, table) +  table[rowIndx][colIndx];

}

const findEndOfNum = (rowIndx, colIndx, table) => {
    const numReg = new RegExp(/\d/);

    if (!numReg.test(table[rowIndx][colIndx]) || colIndx >= table[0].length) {
        return ''
    }

    return [...findEndOfNum(rowIndx, colIndx + 1, table), String(colIndx)];  
}

const test = schematics.flatMap((schematic, engineIndex) => {
   
    const eIMinusOne = engineIndex - 1; // row - 1
    const eIPlusOne = engineIndex + 1; // row + 1
    
    const tmp = []
    
    // Need to check if it is a symbol otherwise we can skip
    // const nonCharOrNum = new RegExp(/\W/);
    const starCheck = new RegExp(/\*/);

    // All other Rows
    schematic.forEach((cog, cogIndex) => {

        if (starCheck.test(cog)) {
            // Need to ensure we only get a number once

            const tmpStar = []

            const cIMinusOne = cogIndex - 1;
            const cIPlusOne = cogIndex + 1;

            const numReg = new RegExp(/\d/);
            
            const rows = [];
            const cols = [];

            if (engineIndex === 0) {
                rows.push(engineIndex, eIPlusOne);
            } else if (engineIndex === (schematics.length - 1)) {
                rows.push(eIMinusOne, engineIndex);
            } else {
                rows.push(eIMinusOne, engineIndex, eIPlusOne)
            }

            if (cogIndex === 0) {
                cols.push(cogIndex, cIPlusOne);
            } else if (cogIndex === (schematic.length - 1)) {
                cols.push(cIMinusOne, cogIndex);
            } else {
                cols.push(cIMinusOne, cogIndex, cIPlusOne)
            }

            rows.forEach(row => {
                const dirty = [];
                cols.forEach((col, colI) => {
                    
                    const testRes = numReg.test(schematics[row][col]);

                    if (dirty[colI - 1] === true) {
                        dirty.push(testRes);
                        return;
                    }

                    if (testRes) {
                        const numEndIndx = Number(findEndOfNum(row, col, schematics)[0]);
                        const foundNum = Number(findNum(row, numEndIndx, schematics))
                        let tmpNum = (numEndIndx - col)
                        while (tmpNum >= 0) {
                            dirty.push(true);
                            tmpNum = tmpNum - 1;
                        }
                        // tmp.push([cog, `row-${row}`, `col-${col}`, `numEndIndx: ${numEndIndx}`, foundNum, dirty])
                        tmpStar.push(foundNum);
                    }
                    
                    return;
                })
            })

            tmp.push(tmpStar);
        }
    })

    return tmp;
}).filter(x => x.length > 1).map(x => x.reduce((acc, curr) => acc * curr)).reduce((acc, curr) => acc + curr);



console.log(test);