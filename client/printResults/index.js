const columnify = require('columnify');
const chalk = require('chalk');
const {
  formatHexString
} = require('../../utilities');

module.exports = printResults;

function printResults(convertedValues) {
  convertedValues.forEach(printSingleInputResults);
}

function printSingleInputResults(convertedValue) {
  return (
    (convertedValue.groups && printMultipleGroupsResults) ||
    (convertedValue.isGroup && printGroupOfValuesResults) ||
    printSingleValueResult
  )(convertedValue);
}

function printSingleValueResult(convertedValue) {
  console.log('single value')
  const {
    name, inputValue, outputValue, inputType, outputType
  } = convertedValue;
  const text = (
    (name ? `${name}: ` : '') +
    formatSimpleValue(inputValue, inputType) +
    ' --> ' +
    formatSimpleValue(outputValue, outputType)
  );
  console.log(text);
}

function printGroupOfValuesResults(convertedGroup) {
  console.log('group')
  const { name, values, hasNamedValue, inputType, outputType } = convertedGroup;
  const inputTypeDisplayName = getValueTypeDisplayName(inputType);
  const outputTypeDisplayName = getValueTypeDisplayName(outputType);
  const columns = values.map(
    value => getGroupColumnInfoFromValue(value, hasNamedValue, inputTypeDisplayName, outputTypeDisplayName)
  );
  let columnNames = hasNamedValue ? ['name'] : [];
  columnNames.push(inputTypeDisplayName, outputTypeDisplayName);
  const text = (
    (name ? `${chalk.underline(name.toUpperCase())}:\n` : '') +
    columnify(columns)
  );
  console.log(text);
}

function getGroupColumnInfoFromValue(value, groupHasNamedValue, inputTypeDispName, outputTypeDispName) {
  const { name, inputValue, outputValue } = value;
  let columnInfo = {
    [inputTypeDispName]: inputValue,
    [outputTypeDispName]: outputValue
  };
  if (groupHasNamedValue) {
    Object.assign(columnInfo, name);
  }
}

function printMultipleGroupsResults(convertedGroups, type) {

}

function formatSimpleValue(value, type) { // value should be primitive (number, hex string, or null)
  if (!value && value !== 0) return '';
  return type === 'hex' ? formatHexString(value) : value;
}

function getValueTypeDisplayName(type) {
  return type === 'hex' ? 'Hexadecimal' : 'Decimal';
}
