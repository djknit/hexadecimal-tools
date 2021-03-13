const { processInput } = require('../../inputProcessing');
const runConversions = require('./runConversions');

const convertAndPrintHexToDec = genericConverterPrinterForTypeFactory('hex');
const convertAndPrintDecToHex = genericConverterPrinterForTypeFactory('dec');

module.exports = {
  convertAndPrintHexToDec,
  convertAndPrintDecToHex
};


function genericConverterPrinterForTypeFactory(type) {
  return function convertAndPrint(...rawInputs) {
    const processedInputs = rawInputs.map(
      rawInput => processInput(rawInput, type)
    );
    runConversions(processedInputs, type);
    console.log(processedInputs);
    return processedInputs
  };
}
