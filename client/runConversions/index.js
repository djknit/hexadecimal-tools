const {
  convertHexStringToNumber,
  convertNumberToHexString,
  constants
} = require('../utilities');

const { invalidHexInputString } = constants;

module.exports = runConversionsOnGenericInputs;


function runConversionsOnGenericInputs(processedInputs, hexOrNum) {
  processedInputs.forEach(processedInput => {
    const convert = (
      (Array.isArray(processedInput) && runMultipleGroupsConversions) ||
      (processedInput.isGroup && runGroupOfValuesConversions) ||
      runSingleValueConversion
    );
    return convert(processedInput, hexOrNum);
  });
  return processedInputs;
}

function runSingleValueConversion(processedInput, hexOrNum, reportNamedValueExistence) {
  const isHex = hexOrNum === 'hex';
  const convert = isHex ? convertHexStringToNumber : convertNumberToHexString;
  const { value, name } = processedInput;
  const isValidInputVal = isHex ? value === invalidHexInputString : isNaN(value);
  delete processedInput.value;
  if (name) reportNamedValueExistence();
  Object.assign(
    processedInput,
    {
      inputValue: isValidInputVal ? value : '(INVALID)',
      outputValue: isValidInputVal ? convert(value) : undefined,
      ...getInputOutputTypes(hexOrNum)
    });
  return processedInput;
}

function runGroupOfValuesConversions(processedInput, hexOrNum) {
  let hasNamedValue = false;
  const reportNamedValueExistence = () => hasNamedValue = true;
  processedInput.values = processedInput.values.map(
    val => runSingleValueConversion(val, hexOrNum, reportNamedValueExistence)
  );
  Object.assign(
    processedInput,
    { hasNamedValue, ...getInputOutputTypes(hexOrNum) }
  );
  return processedInput;
}

function runMultipleGroupsConversions(processedInput, hexOrNum) {
  let hasNamedValue = false;
  const convertedGroups = processedInput.map(group => {
    const convertedGroup = runGroupOfValuesConversions(group, hexOrNum);
    if (convertedGroup.hasNamedValue) hasNamedValue = true;
  });
  return {
    hasNamedValue, groups: convertedGroups, ...getInputOutputTypes(hexOrNum)
  };
}

function getInputOutputTypes(inputType) {
  return {
    inputType,
    outputType: inputType === 'hex' ? 'num' : 'hex'
  };
}
