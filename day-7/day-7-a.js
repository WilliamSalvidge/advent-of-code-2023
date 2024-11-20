const fs = require('fs');

const input = fs.readFileSync('./test.txt', { encoding: 'UTF-8' });

const lines = input.split('\n').map(line => line.split(/\s+/));

console.log(lines);

//

const getHandType = (handArr) => {
    const tmpMap = new Map();
    const hand = handArr[0].split('');
    hand.forEach((card) => {
        if (!tmpMap.has(card)) {
            tmpMap.set(hand, 1);
            return;
        }
        tmpMap.set(card, tmpMap.get(card) + 1)

    })

    let res
    switch ([ ...tmpMap.keys ].length) {
        case 1:
            res = 7
            break;
        case 2:
            if ([ ...tmpMap.values() ].some(val => val === 4)) res = 6
            else res = 5
            break
        case 3:
            if ([ ...tmpMap.values() ].some(val => val === 3)) res = 4
            else res = 3
            break;
        case 4:
            res= 2
            break
        default:
            res = 1;
            break
    }
    return res;
}

const selectWinner = (contestantOne, contestantTwo) => {
    const contestantOneRes = getHandType(contestantOne);
    const contestantTwoRes = getHandType(contestantTwo);
    if (contestantOneRes > contestantTwoRes) return 
}

// order array
// merge sort

// unsorted is ref to array

const merge = (unsorted, l, m, r) => {
    let i, j, k
    /// middle - low + 1
    const n1 = m - l
}

const mergeSort = (unsorted, l, r) => {

    if (l < r) {
        const mid = Math.floor((y.length / 2) + 1);

        mergeSort(unsorted, l, mid)
        mergeSort(unsorted, mid + 1, r)

        mergeSort(unsorted, l, mid + 1, r);
    } 


    // if (unsorted.length = 1) {
    //     return unsorted;
    // }
    // // L = [10] R = [20]
    // const left = unsorted.slice(0, Math.floor((y.length / 2) + 1));
    // const right = unsorted.slice(Math.floor(y.length / 2) + 1, y.length);

    // mergeSort(left);
    // mergeSort(right);



    // [30, 10, 20, 40]
    // [30] [10]
    // [10, 30] [20, 40]

}


[10,20,30,40,50]

