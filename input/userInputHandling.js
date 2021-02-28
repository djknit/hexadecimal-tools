const { throwInvalid } = require('../utilities')
const { Value, Group, SuperGroup } = require('./models');
const { isBasicValue, isNamedValue, isArrayOfValues } = require('./typeCheckers');

module.exports = {
  processSingleInputArg
};

//______________________________________________________

function processSingleInputArg(inputArg) {
  // could be any of: Group, SuperGroup, [Group], value, { name, value }, [value, { name, value }]
  if (isBasicValue(inputArg) || isNamedValue(inputArg)) {
    return new Group([constructValue(inputArg)]);
  }
  if (isArrayOfValues(inputArg)) {
    return new Group(inputArg.map(constructValue));
  }
  if (typeof(inputArg) !== 'object') throwInvalid('input function argument', inputArg);
  if (inputArg.groups) {
    return new SuperGroup(groups.map(constructGroup), inputArg.name);
  }
  return constructGroup(inputArg);
}

function constructValue(basicOrNamedValue) {
  if (isNamedValue(basicOrNamedValue)) return new Value(basicOrNamedValue.value, basicOrNamedValue.name);
  return new Value(basicOrNamedValue); 
}

function constructGroup({ value, values, name }) {
  const valuesArray = values || [value];
  return new Group(valuesArray.map(constructValue), name);
}
