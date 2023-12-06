const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'UTF-8' });

const lines = input.split('\n');

const nums = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

const numsReal = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const keys = Object.keys(nums);

const strNumMatch = lines.map(line => {

  const tmp = { firstIndx: null, firstNum: null, lastIndx: null, lastNum: null };

  keys.forEach(key => {
    const tmpMatch = line.indexOf(key);
    if (tmpMatch !== -1) {
        if (tmp.firstIndx === null) {
          tmp.firstIndx = tmpMatch;
          tmp.firstNum = nums[key];
        }
        if (tmp.lastIndx === null) {
          tmp.lastIndx = tmpMatch;
          tmp.lastNum = nums[key];
        }
        if (tmpMatch < tmp.firstIndx) {
          tmp.firstIndx = tmpMatch;
          tmp.firstNum = nums[key];
        }
        if (tmpMatch >= tmp.lastIndx) {
          tmp.lastIndx = tmpMatch + (key.length - 1);
          tmp.lastNum = nums[key];
        }
      }
    const tmpMatchLast = line.lastIndexOf(key);
    if (tmpMatchLast !== -1) {
        if (tmp.firstIndx === null) {
          tmp.firstIndx = tmpMatchLast;
          tmp.firstNum = nums[key];
        }
        if (tmpMatchLast < tmp.firstIndx) {
          tmp.firstIndx = tmpMatchLast;
          tmp.firstNum = nums[key];
        }
        if (tmpMatchLast >= tmp.lastIndx) {
          tmp.lastIndx = tmpMatchLast + (key.length - 1);
          tmp.lastNum = nums[key];
        }
      }
    }
  )

  numsReal.forEach(numReal => {
    const tmpMatchTwo = line.indexOf(numReal);
    if (tmpMatchTwo !== -1) {
        if (tmp.firstIndx === null) {
          tmp.firstIndx = tmpMatchTwo;
          tmp.firstNum = numReal;
        }
        if (tmp.lastIndx === null) {
          tmp.lastIndx = tmpMatchTwo;
          tmp.lastNum = numReal;
        }
        if (tmpMatchTwo < tmp.firstIndx) {
          tmp.firstIndx = tmpMatchTwo;
          tmp.firstNum = numReal;
        }
        if (tmpMatchTwo > tmp.lastIndx) {
          tmp.lastIndx = tmpMatchTwo;
          tmp.lastNum = numReal;
        }
      }
    const tmpMatchTwoLast = line.lastIndexOf(numReal);
    if (tmpMatchTwoLast !== -1) {
        if (tmp.firstIndx === null) {
          tmp.firstIndx = tmpMatchTwoLast;
          tmp.firstNum = numReal;
        } 
        if (tmpMatchTwoLast < tmp.firstIndx) {
          tmp.firstIndx = tmpMatchTwoLast;
          tmp.firstNum = numReal;
        }
        if (tmpMatchTwoLast > tmp.lastIndx) {
          tmp.lastIndx = tmpMatchTwoLast;
          tmp.lastNum = numReal;
        }
      }
  })

  return tmp;
})


const resThree = strNumMatch.map(x => Number([x.firstNum, x.lastNum].join('')));

const resFour = resThree.reduce((acc, cur) => acc + cur);

console.log(resFour);

