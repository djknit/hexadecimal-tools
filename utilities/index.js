const display = require('./display');
const {
  convertHexStringToNumber, calculateValuesOfHexStrings
} = require('./hexStringToNumber');
const {
  convertNumberToHexString, calculateHexStringsForNumbers
} = require('./numberToHexString');
const { consoleLogKeyValuePairs } = display;
const { addHexInput, addNumInput, inputValues } = require('./input');

function consoleLogValuesOfHexStrings(hexStrings, name = 'Hex String Values') {
  consoleLogKeyValuePairs(calculateValuesOfHexStrings(hexStrings), hexStrings, name);
}

function consoleLogHexStringsForNumbers(numbers, name = 'Numbers Converted to Hex') {
  consoleLogKeyValuePairs(calculateHexStringsForNumbers(numbers), numbers, name);
}

function runCalculationsAndConsoleLogResults() {
  const { hex, num } = inputValues;
  for (const { values, name } of hex) {
    consoleLogValuesOfHexStrings(values, name);
  }
  for (const { values, name } of num) {
    consoleLogHexStringsForNumbers(values, name);
  }
}

module.exports = {
  convertHexStringToNumber,
  calculateValuesOfHexStrings,
  convertNumberToHexString,
  calculateHexStringsForNumbers,
  consoleLogValuesOfHexStrings,
  consoleLogHexStringsForNumbers,
  runCalculationsAndConsoleLogResults,
  addHexInput,
  addNumInput
};
