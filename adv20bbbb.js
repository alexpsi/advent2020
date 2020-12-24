const fs = require('fs');
const input = fs.readFileSync('input20.txt').toString().split('\n\n').reduce((acc, tile) => {
    const _tile = tile.split('\n');
    const key = parseInt(_tile[0].match(/Tile (\d+):/)[1]);
    acc[key] = _tile.slice(1).map(line => line.split(''));
    return acc;
}, {})


const cloneMatrix = m => m.map(l => l.slice())

const transpose = _m => {
    const m = cloneMatrix(_m);
    return m[0].map((x,i) => m.map(x => x[i])) 
}

const rotateCCW = m => transpose(m).reverse();
const flip = m => m.map(l => l.reverse())

const rotateCW = m => flip(transpose(m));

const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const uniq = a => a.filter(onlyUnique);

const getRightBorder = (m) => transpose(m)[m.length - 1].join('');
const getLeftBorder = (m) => transpose(m)[0].join('');
const getTopBorder = (m) => m[0].join('');
const getBottomBorder = (m) =>  m[m.length - 1].reverse().join('');
const getBorders = m => [getTopBorder(m), getRightBorder(m), getBottomBorder(m), getLeftBorder(m)]

const printTile = m => m.map(l => console.log(l.join('')))

const corners = ['1151', '1663', '2659', '3079']
const width = Math.sqrt(Object.keys(input).length);

const getRest = fMap => {
    const placed = fMap.reduce((acc, x) => acc.concat(x.map(x => x[0]).filter(x => x)), [])
    return Object.keys(input).filter(key => !placed.includes(key));
}

const printMap = fMap => {
    console.log('')
    fMap.map(line => console.log(line.map(x => x.length !== 0 ? x[0] : '????').join('|') ))
}


const matchingTile = (tile, rest, dir) => {
    const border = getBorders(tile)[dir];
    console.log(border)
    return rest.map(candidateKey => {
        let rCW = 0;
        let candidate = input[candidateKey];
        while (rCW < 4) {
            const candidateBorder = getBorders(candidate)[(dir + 2) % 4];
            if (candidateBorder === border) return [candidateKey, candidate];
            if (candidateBorder === border.split('').reverse().join('')) return [candidateKey, flip(candidate)];
            rCW += 1;
            candidate = rotateCW(candidate)
        }
        return false;
    }).filter(x => x)[0]
}

const expandTile = (fMap) => {
    let rest = getRest(fMap)
    if (rest.length === 0) return fMap;
    for (let idy = 0; idy < 1; idy++) {
        for (let idx = 0; idx < fMap[0].length - 1; idx++) {
            console.log(idx, idy)
            const match = matchingTile(fMap[idy][idx][1], rest, 1)
            fMap[idy][idx + 1] = match;
            printMap(fMap)

            rest =  getRest(fMap)
        }
    }

}

let fullMap = new Array(12).fill([]).map(x => new Array(12).fill([]))
fullMap[0][0] = [corners[3], input[corners[3]]];
expandTile(fullMap) 





