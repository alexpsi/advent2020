const fs = require('fs');
const lines = fs.readFileSync('./adv2.txt').toString('utf8')

let re = /(\w+)-(\w+) (\w): (\w+)/

console.log(lines.split('\n').map(line => {
    const parse = re.exec(line);
    const min = parseInt(parse[1])
    const max = parseInt(parse[2])
    const occurences = parse[4].split('').filter(x => x === parse[3]).length;
    return occurences >= min && occurences <= max;
}).filter(x => x).length)