const display = require('./display');
const {
  convertHexStringToNumber, calculateValuesOfHexStrings
} = require('./hexStringToNumber');
const {
  convertNumberToHexString, calculateHexStringsForNumbers
} = require('./numberToHexString');
const { consoleLogKeyValuePairs } = display;
const { input, inputValues } = require('./input');

function runCalculationsAndConsoleLogResults() {
  // const { hex, num } = inputValues;
  // for (const { values, name } of hex) {
  //   consoleLogValuesOfHexStrings(values, name);
  // }
  // for (const { values, name } of num) {
  //   consoleLogHexStringsForNumbers(values, name);
  // }
}

module.exports = {
  convertHexStringToNumber,
  calculateValuesOfHexStrings,
  convertNumberToHexString,
  calculateHexStringsForNumbers,
  runCalculationsAndConsoleLogResults,
  inputValues,
  input
};
