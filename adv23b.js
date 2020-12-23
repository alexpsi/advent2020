const start = `716892543`.split('').map(x => parseInt(x))

class LinkedList {
    reverseIndex = new Map();
    nodes = [];
    constructor(input) { 
        this.nodes = input.map(x => ({ value: x }));
        this.nodes.forEach((node, idx) => { 
            this.nodes[idx === 0 ? this.nodes.length - 1: idx  - 1].next = node;
            this.reverseIndex.set(node.value, node)
        });
    }

    getNode(value) {
        return this.reverseIndex.get(value);
    }

    spliceThree(currentNode) {
        const firstNode = currentNode.next;
        const secondNode = currentNode.next.next;
        const thirdNode = currentNode.next.next.next;
        const endNode = currentNode.next.next.next.next;
        currentNode.next = endNode;
        return [firstNode, secondNode, thirdNode];
    }

    inject(targetNode, firstNode, lastNode) {
        lastNode.next = targetNode.next;
        targetNode.next = firstNode;
    }
}

const minVal = Math.min(...start);
const maxStartVal = Math.max(...start);

const bigStart = [
    ...start,
    ...Array(1e6-start.length).fill().map((_,i) => i + maxStartVal + 1)
];
const maxVal = bigStart[bigStart.length - 1];

const crabList = new LinkedList(bigStart)

let current = crabList.nodes[0];
let destination, three, destinationNode;

for (let i = 0; i < 10e6; ++i) {
    let destination = current.value;
    let three = crabList.spliceThree(current)
    do {
        destination -= 1;
        if (destination < minVal) destination = maxVal;
    }
    while (three.map(node => node.value).includes(destination));
    let destinationNode = crabList.getNode(destination);
    crabList.inject(destinationNode, three[0], three[2]);
    current = current.next;
}

console.log(crabList.getNode(1).next.value * crabList.getNode(1).next.next.value);

// console.log(bigStart[bigStart.length-1])
// console.log(minVal, maxVal)
// crabList.getNode(3).next.value 
// [a,b,c] = crabList.spliceThree(crabList.getNode(3))
// crabList.getNode(3).next.value
// crabList.inject(crabList.getNode(3), a, c)
// crabList.getNode(3).next.value
// crabList.getNode(3).next.next.value
// crabList.getNode(3).next.next.next.value
// crabList.getNode(3).next.next.next.next.value

