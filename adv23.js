const start = `389125467`.split('').map(x => parseInt(x))

const crabShit = (input) =>  {
	const minVal = Math.min(...input);
	const maxVal = Math.max(...input);

    return Array(100).fill('').reduce(_input => {
        const three = _input.splice(1, 3);
		
		let destination = _input[0];
		do {
			destination -= 1;
			if (destination < minVal) destination = maxVal;
		}
		while (three.includes(destination));

		const destinationIndex = _input.indexOf(destination);
		_input.splice(destinationIndex + 1, 0, ...three);
        _input.push(_input.shift());
        return _input;
    }, input)

}

console.log(crabShit(start))