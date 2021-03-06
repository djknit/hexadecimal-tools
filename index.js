const {
  printRgbColorForHexColor,
  printHexStringForNumber,
  convertHexColorToRgb,
  convertHexStringToNumber,
  convertNumberToHexString,
  convertRgbColorToHex,
  printHexColorForRgbColor,
  printNumberForHexString
} = require('./client');

const testVals0 = ['aa', 'bec', '450', '9'];
testVals0.forEach(printNumberForHexString)

convertNumberToHexString(255, true)

printRgbColorForHexColor('aae277')

module.exports = {
  ...require('./utilities')
};
