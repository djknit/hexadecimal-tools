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

function runSingleValueConversion(processedInput, hexOrNum, reportNamedValueExistence) {
  const convert = hexOrNum === 'hex' ? convertHexStringToNumber : convertNumberToHexString;
  const { value, name } = processedInput;
  delete processedInput.value;
  if (name) reportNamedValueExistence();
  Object.assign(processedInput, { inputValue: value, outputValue: convert(value) });
  return processedInput;
}

function runGroupOfValuesConversions(processedInput, hexOrNum) {
  let hasNamedValue = false;
  const reportNamedValueExistence = () => hasNamedValue = true;
  processedInput.values = processedInput.values.map(
    val => runSingleValueConversion(val, hexOrNum, reportNamedValueExistence)
  );
  Object.assign(processedInput, { hasNamedValue });
  return processedInput;
}

function runMultipleGroupsConversions(processedInput, hexOrNum) {
  let hasNamedValue = false;
  const convertedGroups = processedInput.map(group => {
    const convertedGroup = runGroupOfValuesConversions(group, hexOrNum);
    if (convertedGroup.hasNamedValue) hasNamedValue = true;
  });
  return { hasNamedValue, groups: convertedGroups };
}
