const fs = require('fs');
const input =  fs.readFileSync('input24.txt').toString().split('\n')
    .map(line => line.match(/(e|se|sw|w|nw|ne)/g))

const evenq_directions = [
    [[+1, +1], [+1,  0], [ 0, -1], 
     [-1,  0], [-1, +1], [ 0, +1]],
    [[+1,  0], [+1, -1], [ 0, -1], 
     [-1, -1], [-1,  0], [ 0, +1]],
]

const compass = { e: 0, se: 1, sw: 2, w: 3, nw: 4, ne: 5 }

const hexHash = (hex) => hex.row + '/' + hex.col;
const hashHex = (hash) => {
    const hex = hash.split('/');
    return {
        row: parseInt(hex[0]),
        col: parseInt(hex[1]),
    }
}

const getNeighbor = (hex, dir) => {
    const parity = hex.col & 1
    const direction = evenq_directions[parity][compass[dir]]
    return {
        row: hex.row + direction[1],
        col: hex.col + direction[0]
    };
}

const getAllNeighbors = (hex) => {
    const parity = hex.col & 1
    const dir = evenq_directions[parity]
    return dir.map(direction => ({
        row: hex.row + direction[1],
        col: hex.col + direction[0]
    }))
}
  
const identifyTile = (line) => {
    let coord = {row: 0, col: 0}
    line.forEach(dir => {
      coord = getNeighbor(coord, dir)
    })
    return coord;
}

const getBlackSet = () => {
    const blackSet = new Set();
    input.forEach(line => {
        const hex = identifyTile(line);
        const hash = hexHash(hex);
        if (blackSet.has(hash)) { blackSet.delete(hash) } else { blackSet.add(hash)} 
    })
    return blackSet;
}

const getAllSet = blackSet => {
    const newSet = new Set(blackSet);
    blackSet.forEach(hash => getAllNeighbors(hashHex(hash)).map(hex => newSet.add(hexHash(hex))))
    return newSet;
}

const flipTiles = (allSet, blackSet) => {
    const newSet = new Set();
    allSet.forEach(hash => {
        const nBlackNeighbors = getAllNeighbors(hashHex(hash)).filter(hex => blackSet.has(hexHash(hex))).length
        
        if ( blackSet.has(hash) ) {
            if (nBlackNeighbors === 1 || nBlackNeighbors === 2)  newSet.add(hash);
        } else {
            if (nBlackNeighbors === 2)  newSet.add(hash);
        }
    })
    return newSet;
}

const run = () => {
    let bSet = getBlackSet();
    let aSet;
    for (let k = 0; k < 100; k++) {
        aSet = getAllSet(bSet);
        bSet = flipTiles(aSet, bSet);
        console.log(k + 1, bSet.size)
    }
}

run();