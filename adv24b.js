// This one ended being extremely slow.


const fs = require('fs');
const input =  fs.readFileSync('input24.txt').toString().split('\n')
    .map(line => line.match(/(e|se|sw|w|nw|ne)/g).map(dir => dir.toUpperCase()))

const maxRadius = 100;

const Honeycomb = require('honeycomb-grid')
const Hex = Honeycomb.extendHex({ orientation: 'pointy' })
const Grid = Honeycomb.defineGrid()
const grid = Grid.hexagon({ radius:  maxRadius })


const identifyTile = (grid, line) => {
    let coord = {x: 0, y: 0}
    line.forEach(dir => {
        coord = grid.neighborsOf(Hex(coord), dir)[0]
    })
    return coord;
}

const getBlackSet = () => {
    const blackSet = new Set();
    input.forEach(line => {
        const tile = identifyTile(grid, line);
        if (blackSet.has(tile.x + '/' + tile.y)) { 
            blackSet.delete(tile.x + '/' + tile.y) 
        } else {
            blackSet.add(tile.x + '/' + tile.y) 
        }
    })
    return blackSet;
}

const getAllSet = blackSet => {
    const newSet = new Set(blackSet);
    blackSet.forEach(coords => {
        grid.neighborsOf(Hex(coords.split('/').map(x => parseInt(x)))).forEach(tile => newSet.add(tile.x + '/' + tile.y))
    })
    return newSet;
}

const flipTiles = (allSet, blackSet) => {
    const newSet = new Set();
    allSet.forEach(tile => {
        const hex = Hex(tile.split('/').map(x => parseInt(x)));
        const nBlackNeighbors = grid.neighborsOf(hex).filter(coord => blackSet.has(coord.x + '/' + coord.y)).length
        // console.log(hex, nBlackNeighbors, blackSet.has(tile))
        // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
        // Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
        if ( blackSet.has(tile) ) {
            if (nBlackNeighbors === 1 || nBlackNeighbors === 2)  newSet.add(tile);
        } else {
            if (nBlackNeighbors === 2)  newSet.add(tile);
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

run()
// const bSet = getBlackSet();
// const aSet = getAllSet(bSet);
// const fSet = flipTiles(aSet, bSet);
// console.log(bSet)
// console.log(bSet.size, aSet.size, fSet.size)


// console.log(identifyTile(grid, 'nwwswee'.match(/(e|se|sw|w|nw|ne)/g).map(dir => dir.toUpperCase())))