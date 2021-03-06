const { hexCharValues } = require('../../constants');

module.exports = convertHexStringToNumber;


function convertHexStringToNumber(hexString) {
  let totalValue = 0;
  const startIndex = hexString[0] === '#' ? 1 : 0;
  for (let i = 0; i < hexString.length - startIndex; i++) { // must start at 0 (instead of startIndex) b/c `i` is also the exponent a couple lines down
    const currentDigitValue = getSingleHexCharValue(hexString[startIndex + i]);
    totalValue += currentDigitValue * Math.pow(16, i);
  }
  return totalValue;
}

function getSingleHexCharValue(hexChar) {
  return hexCharValues[hexChar];
}
