const {
  printRgbColorForHexColor,
  printHexStringForNumber,
  convertHexColorToRgb,
  convertHexStringToNumber,
  convertNumberToHexString,
  convertRgbColorToHex,
  printHexColorForRgbColor,
  printNumberForHexString,
  endStaticInputMethodCalls
} = require('./client');

require('./STATIC_INPUT');
endStaticInputMethodCalls();


module.exports = {
  ...require('./utilities')
};
