const { hexCharValues } = require('./constants');

function getSingleHexCharValue(hexChar) {
  return hexCharValues[hexChar];
}

function getNDigitHexStringValue(hexString) {
  let totalValue = 0;
  const startIndex = hexString[0] === '#' ? 1 : 0;
  for (let i = 0; i < hexString.length - startIndex; i++) {
    const currentDigitValue = getSingleHexCharValue(hexString[startIndex + i]);
    totalValue += currentDigitValue * Math.pow(16, i);
  }
  return totalValue;
}

function calculateValuesOfHexStrings(hexStrings) {
  let hexStrNumberPairs = {};
  for (const hexString of hexStrings) {
    hexStrNumberPairs[hexString] = getNDigitHexStringValue(hexString);
  }
  return hexStrNumberPairs;
}

module.exports = {
  getNDigitHexStringValue,
  calculateValuesOfHexStrings
};
