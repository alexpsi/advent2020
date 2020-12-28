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

const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const uniq = a => a.filter(onlyUnique);

const flipX = m => m.reverse();
const flipY = m => m.map(l => l.reverse())

const rotateCW = m => flipY(transpose(m));

const getRightBorder = (m) => transpose(m)[m.length - 1].join('');
const getLeftBorder = (m) => transpose(m)[0].join('');
const getTopBorder = (m) => m[0].join('');
const getBottomBorder = (m) =>  m[m.length - 1].join('');
const reverseBorder = border => border.split('').reverse().join('');
const getBorders = m => [getTopBorder(m), getRightBorder(m), getBottomBorder(m), getLeftBorder(m)]
const getAllBorders = m => uniq([...getBorders(m), ...getBorders(m).map(reverseBorder)])

const printTile = m => m.map(l => console.log(l.join('')))

const getNeighBors = () => 
    Object.keys(input).reduce((acc, key) => {
        const neighbors = getBorders(input[key]).map(border => 
            Object.keys(input).filter(k => k !== key).filter(k => getAllBorders(input[k]).includes(border))
        )
        return {
            ...acc,
            [key]: neighbors
        }
    }, {})

const rotateNeighbors = (neighborMatrix, key) => {
    let n = neighborMatrix[key].slice(0)
    n.unshift(n.pop())
    neighborMatrix[key] = n;
}

const flipNeighborsX = (neighborMatrix, key) => {
    let n = neighborMatrix[key]
    neighborMatrix[key] = [n[3], n[1], n[2], n[0]];
}

const flipNeighborsY = (neighborMatrix, key) => {
    let n = neighborMatrix[key]
    neighborMatrix[key] = [n[0], n[3], n[2], n[1]];
}

const getCorners = (neighborMatrix) => Object.keys(neighborMatrix).filter(key => neighborMatrix[key].filter(x => x.length !== 0).length === 2)

const getTopLeft = (neighborMatrix) => getCorners(neighborMatrix).filter(key => neighborMatrix[key][1].length === 1 && neighborMatrix[key][2].length === 1)[0];



// console.log(neighborMatrix)

const printMap = fMap => {
    console.log('')
    fMap.map(line => console.log(line.map(x => x ? x[0] : '????').join('|') ))
}

const printMapTilesRow = (fMap, rowId) => {
    for (let idy = 0; idy < 10; idy++) {
        let fullRow = '';
        for (let idx = 0; idx < 3; idx++) {
            // console.log(fMap[0][idx][1][idy])
            let row = fMap[rowId][idx][1][idy].join('');
            fullRow += row + ' '
        }
        console.log(fullRow)
    }
}

const matchTile = (fMap, idy, idx, dir, neighborMatrix) => {
    const prevKey = fMap[idy][idx][0];
    const nextKey = neighborMatrix[prevKey][dir][0];
    const border = getBorders(fMap[idy][idx][1])[dir];
    let rCW = 0;
    let match = input[nextKey];
    while (rCW < 4) {
        const matchBorder = getBorders(match)[(dir + 2) % 4];
        if (matchBorder === border) return [nextKey, match];
        if (matchBorder === border.split('').reverse().join('')) {
            
            if (dir === 1) {
                flipNeighborsX(neighborMatrix, nextKey)
                return [nextKey, flipX(match)];
            } else {
                flipNeighborsY(neighborMatrix, nextKey)
                return [nextKey, flipY(match)];
            }
        }
        rCW += 1;
        rotateNeighbors(neighborMatrix, nextKey)
        match = rotateCW(match)
    }
}

const getFullMap = (neighborMatrix) => {
    const width = Math.sqrt(Object.keys(input).length)
    const topLeft = getTopLeft(neighborMatrix)
    const fullMap = Array(width).fill(null).map(x => Array(width).fill(null))
    fullMap[0][0] = [topLeft, input[topLeft]];
    for (let idy = 0; idy < width; idy++) {
        for (let idx = 0; idx < width - 1; idx++) {
            if (idx === 0 && idy !== width - 1) {
                fullMap[idy + 1][0] = matchTile(fullMap, idy, idx, 2, neighborMatrix)
            }
            fullMap[idy][idx + 1] = matchTile(fullMap, idy, idx, 1, neighborMatrix)
            // printMap(fullMap)
        }
    }
    return fullMap;
}

const removeBorder = (tile) => tile.slice(1, 9).map(row => row.slice(1, 9));

const removeBorders = (fullMap) => {
    const width = Math.sqrt(Object.keys(input).length)
    for (let idy = 0; idy < width; idy++) {
        for (let idx = 0; idx < width; idx++) {
            fullMap[idy][idx][1] = removeBorder(fullMap[idy][idx][1])
        }
    }
    return fullMap;
}

const assemblePieces = (fullMap) => {
    const full = [];
    const width = Math.sqrt(Object.keys(input).length)
    const tWidth = fullMap[0][0][1][0].length;
    for (let idy = 0; idy < width; idy++) {
        for (let idz = 0; idz < tWidth; idz++) {
            let row = [];
            for (let idx = 0; idx < width; idx++) {
                row = [...row, ...fullMap[idy][idx][1][idz]]
            }
            full.push(row);
        }
    }
    return full;
}

const countHashes = (fMap) => fMap.reduce((acc, row) => acc + row.reduce((_acc, elem) => elem === '#' ? _acc + 1 : _acc, 0), 0)

const monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `.split('\n');

const countMonsters = (assembled) => {

	const positions = monster.map((line, y) => line.split('').map((c, x) => ({isHash: c === '#',x,y}))).flat().filter(pos => pos.isHash);
	let count = 0;
	for (let y = 0; y < assembled.length; ++y) {
		for (let x = 0; x < assembled[0].length; ++x) {
			if (positions.every(pos => assembled[ y + pos.y ] && assembled[ y + pos.y ][ x + pos.x ] === '#')) {
				count += positions.length;
			}
		}
	}
	return count;
}

// I found the flipX manually...
const as1 = flipX(assemblePieces(removeBorders(getFullMap(getNeighBors()))))

console.log(countHashes(as1) - countMonsters(as1))