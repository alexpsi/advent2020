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
const rotateCW = m => transpose(m.reverse());
const flip = m => m.map(l => l.reverse())

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const uniq = a => a.filter(onlyUnique);


const getRightBorder = (m) => m.map(x => x[x.length -1]).join('');
const getLeftBorder = (m) => m.map(x => x[0]).join('');
const getTopBorder = (m) => m[0].join('');
const getBottomBorder = (m) =>  m[m.length - 1].join('');
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


const matchingTile = (idy, idx, dir = 0, fMap) => {
    const [key, tile] = fMap[idy][idx];
    const border = getBorders(tile)[dir];
    return getRest(fMap).filter(k => k !== key).map(candidateKey => {
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

const getOpenFor = (fMap, idy, idx) => {
    const open = [];
    if (fMap[idy][idx].length === 0) return open;
    open.push(fMap[idy - 1][idx].length === 0 ? [[-1, 0], 0] : false)
    open.push(fMap[idy][idx + 1].length === 0 ? [[ 0, 1], 1] : false)
    open.push(fMap[idy + 1][idx].length === 0 ? [[ 1, 0], 2] : false)
    open.push(fMap[idy][idx - 1].length === 0 ? [[0, -1], 3] : false)
    return open.filter(x => x);
}

const expandTile = (fMap, expanded = []) => {
    printMap(fMap)
    if (expanded.length === 144) return fMap;
    for (let idy = 0; idy < fMap[0].length; idy++) {
        for (let idx = 0; idx < fMap[0].length; idx++) {
            let didExpand = false;
            getOpenFor(fMap, idy, idx).forEach(dir => {
                const match = matchingTile(idy, idx, dir[1], fMap)
                if (match) {
                    fMap[idy + dir[0][0]][idx + dir[0][1]] = match;
                    didExpand = true;
                }
            })
            if (didExpand) {
                return expandTile(fMap, expanded.concat(fMap[idy][idx][0]));
            }
        }
    }
}

let fullMap = new Array(30).fill([]).map(x => new Array(30).fill([]))
fullMap[15][15] = [corners[0], (input[corners[0]])];
expandTile(fullMap) 





