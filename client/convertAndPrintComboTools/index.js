const { printHeader, printFooter } = require('./utilities');

const rawMethods = {
  ...require('./decNumbersToHexStrings'),
  ...require('./hexStringsToDecNumbers')
};

let _hasAnyPrintMethodBeenCalled = false;

let processedMethods = {};

for (const methodName in rawMethods) {
  processedMethods[methodName] = function (...args) {
    if (!_hasAnyPrintMethodBeenCalled) {
      printHeader();
    }
    _hasAnyPrintMethodBeenCalled = true;
    return rawMethods[methodName](...args);
  }
}

processedMethods.endStaticInputMethodCalls = function() {
  if (_hasAnyPrintMethodBeenCalled) {
    printFooter();
  }
}

module.exports = processedMethods;
