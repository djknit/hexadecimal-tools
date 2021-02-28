const { constants: { hexCharValues } } = require('./utilities');

module.exports = {
  calculateValuesOfHexStrings
};

//-----------------------------------

function calculateValuesOfHexStrings(hexStrings) {
  let hexStrNumberPairs = {};
  for (const hexString of hexStrings) {
    hexStrNumberPairs[hexString] = convertHexStringToNumber(hexString);
  }
  return hexStrNumberPairs;
}

function convertHexStringToNumber(hexString) {
  let totalValue = 0;
  const startIndex = hexString[0] === '#' ? 1 : 0;
  for (let i = 0; i < hexString.length - startIndex; i++) {
    const currentDigitValue = getSingleHexCharValue(hexString[startIndex + i]);
    totalValue += currentDigitValue * Math.pow(16, i);
  }
  return totalValue;
}

function getSingleHexCharValue(hexChar) {
  return hexCharValues[hexChar];
}
