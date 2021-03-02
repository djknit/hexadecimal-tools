const input = require('./input');

const { addInputValues } = input;

addInputValues(['ff', 'aa', 'e9']);
addInputValues(12)
addInputValues(['ff'])
addInputValues({ name: 'named', value: 'fff'})
addInputValues({name: 'jeff', isGroup: true, value: 'eee'})

console.log(input.values)