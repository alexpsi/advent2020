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


const score = deck => deck.reverse().reduce((acc, x, i) => acc + x * (i + 1), 0)

const deckHash = (deckA, deckB) => [deckA.join(','), '|', deckB.join(',')].join('')
const seenBefore = (history, deckA, deckB) => history.has(deckHash(deckA, deckB))
const addToHistory = (history, deckA, deckB) => history.add(deckHash(deckA, deckB))

const playGame = (deckA, deckB) => {
	const history = new Set();
	while (deckA.length && deckB.length) {
        
        if (seenBefore(history, deckA, deckB)) {
            return [0, deckA]
        }
        addToHistory(history, deckA, deckB);
        
		const cardA = deckA.shift();
		const cardB = deckB.shift();

        const win = (deckA.length >= cardA && deckB.length >= cardB) ? 
            playGame(deckA.slice(0, cardA), deckB.slice(0, cardB))[0] : cardA > cardB ? 0 : 1;
	
		if (win === 0) { deckA = [...deckA, cardA, cardB] } else { deckB = [...deckB, cardB, cardA] }
	}

	return deckA.length ? [0, deckA] : [1, deckB];
}



const run = () => {
    const [ ,deck] = playGame(input[0], input[1]);
    return score(deck);
}

console.log(run())