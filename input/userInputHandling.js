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

function constructValue(basicOrNamedValue, groupType, groupTargetType) {
  if (isNamedValue(basicOrNamedValue)) {
    const { value, name, type, targetType } = basicOrNamedValue;
    return new Value(value, name, type || groupType, targetType || groupTargetType);
  }
  return new Value(basicOrNamedValue, undefined, groupType, groupTargetType); 
}

function constructGroup({ value, values, name, type, targetType }) {
  const valuesArray = values || [value];
  const processedValues = valuesArray.map(val => constructValue(val, type, targetType));
  return new Group(valuesArray.map(constructValue), name, type, targetType);
}
