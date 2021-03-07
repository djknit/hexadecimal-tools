const { printHeader, printFooter } = require('./utilities');

const rawMethods = {
  ...require('./decNumbersToHexStrings'),
  ...require('./hexStringsToDecNumbers')
};

let _hasAnyPrintMethodBeenCalled = false;

let processedMethods = { ...rawMethods }; // * for autocomplete only. (see "*" below)

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


/*
Footnotes:
  * Methods are all overwritten in next step; would work the same with empty obj `{}`, but beginning w/ `{ ...rawMethods }` enables VS Code to suggest the method names for autocomplete when using the methods exported from this folder.
*/
