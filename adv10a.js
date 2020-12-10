const _input = `152
18
146
22
28
133
114
67
19
37
66
14
90
163
26
149
71
106
46
143
145
12
151
105
58
130
93
49
74
83
129
122
63
134
86
136
166
169
159
3
178
88
103
97
110
53
125
128
9
15
78
1
50
87
56
89
60
139
113
43
36
118
170
96
135
23
144
153
150
142
95
180
35
179
80
13
115
2
171
32
70
6
72
119
29
79
27
47
107
73
162
172
57
40
48
100
64
59
175
104
156
94
77
65`.split('\n').map(x => parseInt(x)).sort((a,b) => a - b);

const __input = [0, ..._input, Math.max(..._input) + 3];

const input = __input;

// const diffs = input.map((x, idx) => { return idx === 0 ? x : x - input[idx - 1]})
// const [ones, threes] =[diffs.filter(x => x === 1).length, diffs.filter(x => x === 3).length + 1] 

// console.log(diffs)
// console.log(ones, threes + 1)
// console.log(ones * threes)

const validMoves = (base, remaining) => {
    const valid = [];
    let idr = 0;
    while (remaining[idr] - base <= 3) {
        valid.push(remaining[idr]); 
        idr++;
    }
    return valid;
}

const countArrangements = (base, count = 0) => {
    const remaining = input.filter(x => x > base);
    const next = validMoves(base, remaining)
    return next.length === 0 ? count + 1 : next.reduce((acc, nextMove) => acc + countArrangements(nextMove, count), count)
}

//console.log(countArrangements(input[0]));

const countArrangements2 = () => input.reduce((steps, x, i) => {
    let j = i + 1;
    while(input[j] - input[i] <= 3) {
        steps[j] = steps[j] ? steps[i] + steps[j] : steps[i]; 
        j++;
    }
    return steps;
}, { 0: 1 })[input.length - 1]

console.log(countArrangements2());