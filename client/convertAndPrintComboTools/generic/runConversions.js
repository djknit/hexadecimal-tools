const {
  convertHexStringToNumber,
  convertNumberToHexString
} = require('../utilities');

module.exports = runConversionsOnGenericInputs;

function runConversionsOnGenericInputs(processedInputs, hexOrNum) {
  processedInputs.forEach(processedInput => {
    const convert = (
      (Array.isArray(processedInput) && runMultipleGroupsConversions) ||
      (isGroup && runGroupOfValuesConversions) ||
      runSingleValueConversion
    );
    return convert(processedInput, hexOrNum);
  });
}

function runSingleValueConversion(processedInput, hexOrNum) {
  const convert = hexOrNum === 'hex' ? convertHexStringToNumber : convertNumberToHexString;
  const { value, name } = processedInput;
  return { name, inputValue: value, outputValue: convert(value) };
}

function runGroupOfValuesConversions(processedInput, hexOrNum) {
  const { name, values, isGroup } = processedInput;
  return {
    name,
    values: values.map(val => runSingleValueConversion(val, hexOrNum)),
    isGroup
  };
}

function runMultipleGroupsConversions(processedInput, hexOrNum) {
  return processedInput.map(group => runGroupOfValuesConversions(group, hexOrNum));
}
