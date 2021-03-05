const alphabeticHexChars = ['a', 'b', 'c', 'd', 'e', 'f']; // must be in order of increasing value

let decimalNumeralsByValue = [];
for (let i = 0; i < 10; i++) {
  decimalNumeralsByValue.push(i.toString());
}

const hexCharsIndexedByValue = [...decimalNumeralsByValue, ...alphabeticHexChars];


let hexCharValues = {};
hexCharsIndexedByValue.forEach((hexChar, index) => {
  hexCharValues[hexChar] = index;
});


module.exports = {
  hexCharsIndexedByValue,
  hexCharValues
};
