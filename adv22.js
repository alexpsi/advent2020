const input = `Player 1:
15
31
26
4
36
30
43
39
50
21
25
46
6
44
12
20
23
9
48
11
16
42
17
13
10

Player 2:
34
49
19
24
45
28
7
41
18
38
2
3
33
14
35
40
32
47
22
29
8
37
5
1
27`.split('\n\n').map(deck => deck.split('\n').slice(1).map(x => parseInt(x)))

console.log(input)

const playRound = (deckA, deckB) => {
    const topCardA = deckA.shift();
    const topCardB = deckB.shift();
    return (topCardA > topCardB) ? [deckA.concat(topCardA).concat(topCardB), deckB] : [deckA, deckB.concat(topCardB).concat(topCardA)]
}

const run = (inA, inB) => {
    if (inA.length === 0 || inB.length === 0) {
        const deck = inA.length === 0 ? inB : inA;
        return deck.reverse().reduce((acc, x, i) => acc + x * (i + 1), 0)
    };
    const [deckA, deckB] = playRound(inA, inB)
    console.log()
    console.log(deckA.join(','))
    console.log(deckB.join(','))
    return run(deckA, deckB)
}

console.log(run(input[0], input[1]))