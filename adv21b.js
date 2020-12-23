const fs = require('fs');
const input = fs.readFileSync('input21.txt').toString().split('\n').map(line => [
    line.split(' (contains ')[0].split(' '),
    line.split(' (contains ')[1].replace(')','').split(', ')
])

const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const uniq = a => a.filter(onlyUnique);

const allergens = uniq(input.reduce((acc, x) => acc.concat(x[1]), []))
const ingredients = uniq(input.reduce((acc, x) => acc.concat(x[0]), []))
// console.log(JSON.stringify(input))
// console.log(ingredients)

const histo = ingredients.reduce((acc, ingredient) => ({
    ...acc,
    [ingredient]: input.reduce((_acc, food) => {
        if (food[0].includes(ingredient)) {
            _acc.total += 1;
            food[1].forEach(allergen => {
                _acc[allergen] = _acc[allergen] ? _acc[allergen] + 1 : 1;
                _acc.allergenCount = _acc.allergenCount ? _acc.allergenCount + 1 : 1; 
            })
    
        }
        return _acc;

    }, { total: 0 })
}), {})

const histo2 = allergens.reduce((acc, allergen) => ({
    ...acc,
    [allergen]: input.reduce((_acc, food) => {
        if (food[1].includes(allergen)) {
            _acc.total += 1;
            food[0].forEach(ingredient => {
                _acc.ingredients[ingredient] = _acc.ingredients[ingredient] ? _acc.ingredients[ingredient] + 1 : 1;
            })
        }
        return _acc;

    }, { total: 0, ingredients: {} })
}), {})


const badIngredients = uniq(Object.keys(histo2).reduce((acc, allergen) => 
    [...acc, ...Object.keys(histo2[allergen].ingredients).filter(ingredient => histo2[allergen].ingredients[ingredient] === histo2[allergen].total)]
, []))

const goodIngredients = ingredients.filter(ingredient => !badIngredients.includes(ingredient))
console.log(goodIngredients)

console.log(input.reduce((acc, food) => acc + food[0].filter(ingredient => goodIngredients.includes(ingredient)).length, 0))

const histo3 = allergens.reduce((acc, allergen) => ({
    ...acc,
    [allergen]: input.reduce((_acc, food) => {
        if (food[1].includes(allergen)) {
            _acc.total += 1;
            food[0].filter(ingredient => badIngredients.includes(ingredient)).forEach(ingredient => {
                _acc.ingredients[ingredient] = _acc.ingredients[ingredient] ? _acc.ingredients[ingredient] + 1 : 1;
            })
        }
        return _acc;

    }, { total: 0, ingredients: {} })
}), {})

let aList = badIngredients.map(ingredient => [ingredient, Object.keys(histo3).filter(
    allergen => histo3[allergen].total === histo3[allergen].ingredients[ingredient]
)])

let assigned = []

aList.filter(el => el[1].length === 1).forEach(el => {
    assigned.push([el[0], el[1][0]])
})
console.log(aList)
console.log(assigned)

aList = aList.map(el => [el[0], el[1].filter(x => !assigned.map(x => x[1]).includes(x))])
aList.filter(el => el[1].length === 1).forEach(el => {
    assigned.push([el[0], el[1][0]])
})
console.log('')
console.log(aList)
console.log(assigned)

aList = aList.map(el => [el[0], el[1].filter(x => !assigned.map(x => x[1]).includes(x))])
aList.filter(el => el[1].length === 1).forEach(el => {
    assigned.push([el[0], el[1][0]])
})
console.log('')
console.log(aList)
console.log(assigned)

aList = aList.map(el => [el[0], el[1].filter(x => !assigned.map(x => x[1]).includes(x))])
aList.filter(el => el[1].length === 1).forEach(el => {
    assigned.push([el[0], el[1][0]])
})
console.log('')
console.log(aList)
console.log(assigned)

aList = aList.map(el => [el[0], el[1].filter(x => !assigned.map(x => x[1]).includes(x))])
aList.filter(el => el[1].length === 1).forEach(el => {
    assigned.push([el[0], el[1][0]])
})
console.log('')
console.log(aList)
console.log(assigned)

aList = aList.map(el => [el[0], el[1].filter(x => !assigned.map(x => x[1]).includes(x))])
aList.filter(el => el[1].length === 1).forEach(el => {
    assigned.push([el[0], el[1][0]])
})
console.log('')
console.log(aList)
console.log(assigned)

aList = aList.map(el => [el[0], el[1].filter(x => !assigned.map(x => x[1]).includes(x))])
aList.filter(el => el[1].length === 1).forEach(el => {
    assigned.push([el[0], el[1][0]])
})
console.log('')
console.log(aList)
console.log(assigned)

aList = aList.map(el => [el[0], el[1].filter(x => !assigned.map(x => x[1]).includes(x))])
aList.filter(el => el[1].length === 1).forEach(el => {
    assigned.push([el[0], el[1][0]])
})
console.log('')
console.log(aList)
console.log(assigned)

const order = [
    [ 'vxzpfp', 'soy' ],
    [ 'zrvtg', 'peanuts' ],
    [ 'pdpgm', 'fish' ],
    [ 'mkpmkx', 'shellfish' ],
    [ 'flnhl', 'wheat' ],
    [ 'cdslv', 'nuts' ],
    [ 'tmp', 'dairy' ],
    [ 'ttkn', 'sesame' ]
]

console.log(order.sort((a,b) => {
    if(a[1] < b[1]) { return -1; }
    if(a[1] > b[1]) { return 1; }
    return 0;
}).map(x => x[0]).join(','))