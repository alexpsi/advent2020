const fs = require('fs');
const lines = fs.readFileSync('./adv2.txt').toString('utf8')

let pws = lines.split("\n");

let valid = 0;

for (const line of pws) {
  let [range, letter, pw] = line.split(" ");
  letter = letter.replace(/.$/,"");
  [start, end] = range.split("-");
  if ((pw[start-1] == letter) ^ (pw[end-1] == letter)) {
    valid++;
  }
}

console.log(valid);