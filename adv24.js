const fs = require('fs');
const input = fs.readFileSync('input24.txt').toString().split('\n')
    .map(line => line.match(/(e|se|sw|w|nw|ne)/g).map(dir => dir.toUpperCase()))

const maxRadius = Math.max(...input.map(line => line.length)) + 1

const Honeycomb = require('honeycomb-grid')
const Hex = Honeycomb.extendHex({ orientation: 'pointy' })
const Grid = Honeycomb.defineGrid()


const identifyTile = (grid, line) => {
    let coord = {x: 0, y: 0}
    line.forEach(dir => {
        coord = grid.neighborsOf(Hex(coord), dir)[0]
    })
    return coord;
}

const run = () => {
    const grid = Grid.hexagon({ radius:  maxRadius })
    const blackSet = new Set();
    input.forEach(line => {
        const tile = identifyTile(grid, line);
        console.log(tile)
        if (blackSet.has(tile.x + '/' + tile.y)) { 
            blackSet.delete(tile.x + '/' + tile.y) 
        } else {
            blackSet.add(tile.x + '/' + tile.y) 
        }
    })
    return blackSet.size;
}

console.log(run())


// console.log(identifyTile(grid, 'nwwswee'.match(/(e|se|sw|w|nw|ne)/g).map(dir => dir.toUpperCase())))