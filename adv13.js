const input = `1000303
41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,541,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,983,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19`.split('\n');

const arrival = parseInt(input[0]);
const busses = input[1].split(',').filter(x => x !== 'x').map(x => parseInt(x))

nearBus = busses.map(x => [Math.floor(arrival / x) * x + x, x]).sort((a, b) => a[0] - b[0])[0]

console.log((nearBus[0] - arrival) * nearBus[1])


const wolfram = input[1].split(',').map((x, idx) => x !== 'x' ? `(t + ${idx}) mod ${x} = ` : '').join('').concat(' 0')
console.log(wolfram)