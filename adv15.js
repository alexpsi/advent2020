const input = `18,8,0,5,4,1,20`.split(',');
const lastSpoken = {}

input.forEach((inp, idx) => {
    lastSpoken[parseInt(inp)] = [idx + 1]; 
});

console.log(lastSpoken)

const getNext = (lastNumber, pos) => {
    const nextNumber = !lastSpoken[lastNumber] || lastSpoken[lastNumber].length === 1 ? 0 : lastSpoken[lastNumber][1] - lastSpoken[lastNumber][0];
    lastSpoken[nextNumber] = lastSpoken[nextNumber] ? [lastSpoken[nextNumber][lastSpoken[nextNumber].length - 1], pos] : [pos];
    return nextNumber;
}

const takeUntil = (until) => {
    let idx = input.length;
    let lastNumber = input[input.length - 1];
    while (idx !== until) {
        idx += 1;
        lastNumber = getNext(lastNumber, idx)
    }
    return lastNumber;
}

console.log(lastSpoken)
console.log(takeUntil(30000000))

// console.log(getNext(6, 4))
// console.log(getNext(0, 5))
// console.log(getNext(3, 6))
// console.log(getNext(3, 7))
// console.log(getNext(1, 8))
// console.log(getNext(0, 9))
// console.log(getNext(4, 10))
