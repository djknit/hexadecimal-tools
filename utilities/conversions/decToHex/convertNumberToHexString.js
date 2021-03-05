const { hexCharsIndexedByValue } = require('../../constants');

module.exports = convertNumberToHexString;


function convertNumberToHexString(number) { // number should be an integer
  const integerValue = Math.round(parseFloat(number));
  let order = 0; // Order of magnitude base 16. Equal to 1 less than the number of digits/chars in the hex representation
  while (Math.pow(16, order + 1) <= integerValue) {
    ++order;   // should possibly use logarithms instead of while loop and exponents, but this method works
  }
  let hexString = '', remainder = integerValue;
  for (let i = order; i >= 0; i--) {
    const orderUnitVal = Math.pow(16, i);
    const digitValue = Math.floor(remainder / orderUnitVal);
    remainder = remainder % orderUnitVal;
    hexString += hexCharsIndexedByValue[digitValue];
  }
  return hexString;
}
