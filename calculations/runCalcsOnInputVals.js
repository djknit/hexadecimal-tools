const input = require('../input');

const { basicInputTypes, groupTypes } = input.constants;

module.exports = runCalcsOnInputVals;

function runCalcsOnInputVals() {
  for (const inputValuesObj of input.values) {
    // if (inputValuesObj.isSuper) runCalcsOnSuperGroup(inputValuesObj);
    // else runCalcsOnGroup(inputValuesObj);
    (inputValuesObj.isSuper ? runCalcsOnGroup : runCalcsOnGroup)(inputValuesObj);
  }
}

function runCalcsOnGroup(group) {
  const { values, type, targetType, name } = group;
  let groupType, groupTargetType;
  if (basicInputTypes.includes(type)) groupType = type;
  if (basicInputTypes.includes(targetType)) groupTargetType = targetType;
  for (const value of values) {
    
  }
}

function runCalcsOnSuperGroup(superGroup) {

}

function runCalcsOnValue(value, groupType, groupTargetType) {
  const { value } = value;
}
