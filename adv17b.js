class ArraySet extends Set {
    add(arr) {
      super.add(arr.toString());
    }
    has(arr) {
      return super.has(arr.toString());
    }
}
let grid = new ArraySet()
const neighbors3D = [[-1, 0, 0], [1, 0, 0], [-1, -1, -1], [-1, -1, 0], [-1, -1, 1], [-1, 0, -1], [-1, 0, 1], [-1, 1, -1], [-1, 1, 0], [-1, 1, 1], [0, -1, -1], [0, -1, 0], [0, -1, 1], [0, 0, -1], [0, 0, 1], [0, 1, -1], [0, 1, 0], [0, 1, 1], [1, -1, -1], [1, -1, 0], [1, -1, 1], [1, 0, -1], [1, 0, 1], [1, 1, -1], [1, 1, 0], [1, 1, 1]]

const neighbors4D = [[0,0,0,-1], [0,0,0,1], ...[-1, 0, 1].reduce((acc, w) => [...acc, ...neighbors3D.map(elem => [elem[0], elem[1], elem[2], w])], [])]
console.log(neighbors4D.length)

const input = `##...#.#
#..##..#
..#.####
.#..#...
########
######.#
.####..#
.###.#..`.split('\n').map((line, idy) => line.split('').forEach((square, idx) => {
    if (square === '#') grid.add([idy, idx, 0, 0])
}))

const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start + 1) / step)).fill(start).map((x, y) => x + y * step)

const seedX = 7;
const seedY = 7;
const seedZ = 0;
const seedW = 0;


const getActiveNeighbors = (grid, y, x, z, w) => neighbors4D.reduce((acc, n) => grid.has([y + n[1], x + n[2], z + n[0], w + n[3]]) ? acc + 1 : acc, 0);

const nextCycle = (oldGrid, nCycle) => {
    const newGrid = new ArraySet();
    range(0 - nCycle, seedW + nCycle).map(idw => range(0 - nCycle, seedZ + nCycle).map(idz => range(0 - nCycle, seedX + nCycle).map(idy => range(0 - nCycle, seedY + nCycle).map(idx => {
        const activeNeighbors =  getActiveNeighbors(oldGrid, idy, idx, idz, idw);
        if (oldGrid.has([idy, idx, idz, idw]) && (activeNeighbors === 2 || activeNeighbors === 3)) newGrid.add([idy, idx, idz, idw]);
        if (!oldGrid.has([idy, idx, idz, idw]) &&  activeNeighbors === 3) newGrid.add([idy, idx, idz, idw]);
    }))))
    return newGrid;
}

const printGrid = (oldGrid, nCycle) => 
    range(0 - nCycle, seedZ + nCycle).map(idz => {
    console.log(idz)
    range(0 - nCycle, seedX + nCycle).map(idy =>  
        console.log(range(0 - nCycle, seedY + nCycle).map(idx => oldGrid.has([idy, idx, idz]) ? '#' : '.' ))
    )})

grid = nextCycle(grid, 1); console.log(grid.size)
grid = nextCycle(grid, 2); console.log(grid.size)
grid = nextCycle(grid, 3); console.log(grid.size)
grid = nextCycle(grid, 4); console.log(grid.size)
grid = nextCycle(grid, 5); console.log(grid.size)
grid = nextCycle(grid, 6); console.log(grid.size)
