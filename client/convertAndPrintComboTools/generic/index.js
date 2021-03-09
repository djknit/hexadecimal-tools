const { processInput } = require('../../inputProcessing');
const runConversions = require('./runConversions');

function genericConverterPrinterFactory(type) {
  return function convertAndPrint(...rawInputs) {
    const processedAndConvertedInputs = rawInputs.map(rawInput => {
      const processedInput = processInput(rawInput, type);
      // array of groups, group, or single value
      if (Array.isArray(processedInput)) {
        // array of groups
      }
      else if (isGroup) {
        // group
      }
      else {
        // single value
      }
    });
    
  };
}
