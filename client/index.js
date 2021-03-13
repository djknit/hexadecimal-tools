const { printHeader, printFooter } = require('./utilities');
const { processInput } = require('./inputProcessing');
const runConversions = require('./runConversions');
const printResults = require('./printResults');

// module.exports = {

//   // ...require('./convertAndPrintComboTools'),
//   inputHex,
//   inputDecimal
// };

const rawMethods = { inputHex, inputDecimal };

let _hasAnyPrintMethodBeenCalled = false;
let processedMethods = { ...rawMethods }; // * for autocomplete only. (see "*" below)

for (const methodName in rawMethods) {
  processedMethods[methodName] = function (...args) {
    if (!_hasAnyPrintMethodBeenCalled) {
      printHeader();
    }
    _hasAnyPrintMethodBeenCalled = true;
    const result = rawMethods[methodName](...args);
    console.log(' ');
    return result;
  }
}

processedMethods.endStaticInputMethodCalls = function() {
  if (_hasAnyPrintMethodBeenCalled) {
    printFooter();
  }
}

module.exports = processedMethods;

function inputHex(...rawInputs) {
  processConvertAndPrintInput(rawInputs, 'hex');
}

function inputDecimal(...rawInputs) {
  processConvertAndPrintInput(rawInputs, 'dec');
}

function processConvertAndPrintInput(rawInputs, type) {
  const processedInputs = rawInputs.map(rawInput => processInput(rawInput, type));
  // console.log(processedInputs)
  runConversions(processedInputs, type);
  // console.log(convertedInput)
  printResults(processedInputs);
  // printResults(
  //   runConversions(processInput(rawInput, type)),
  //   type
  // );
}