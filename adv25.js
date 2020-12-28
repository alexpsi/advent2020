

const encrypt = (subject, loopSize) => {
    let value = 1;
    for (let i = 0; i < loopSize; i++) {
        value *= subject;
        value %= 20201227;
        // console.log(i + 1, value)
    }
    return value;
}

const bruteForce = (subject, publicKey) => {
    let value = 1;
    let loopSize = 0;
    while(value !== publicKey) {
        value *= subject;
        value %= 20201227;
        loopSize += 1;
    }
    return loopSize
}



console.log(bruteForce(7, 7573546))
console.log(bruteForce(7, 17807724))
console.log(encrypt(7573546, bruteForce(7, 17786549))) // 14897079

