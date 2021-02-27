let _inputValues = [];

class Value {
  constructor(basicValue, name) {
    if (!isBasicValue(basicValue)) throwInvalid('basic value of value', basicValue);
    validateName(name);
    this.value = basicValue;
    this.name = name;
  };
};

class Group {
  constructor(values, name) {
    for (const value of values) {
      if (!(value instanceof Value)) throwInvalid('group value input', value);
    }
    validateName(name);
    Object.assign(this, { values, name });
  };
};

class SuperGroup {
  constructor(groups, name) {
    for (const group of groups) {
      if (!(group instanceof Group)) throwInvalid('super group group input', group);
    }
    validateName(name);
    Object.assign(this, { groups, name });
  };
};

function validateName(name, nameOfWhat) {
  if (name && typeof(name) !== 'string' && typeof(name) !== 'number') {
    throwInvalid(`${nameOfWhat} name`, name);
  }
}

function throwInvalid(invalidWhatName, value) {
  throw new Error(`Invalid ${invalidWhatName}:\n  ${value}`);
}


function input(...inputArgs) {
  _inputValues.push(...inputArgs.map(processSingleInputArg));
}

function processSingleInputArg(inputArg) {
  // could be any of: group, supergroup, [group], value, { name, value }, [value, { name, value }]
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

function isBasicValue(value) {
  return !value || typeof(value) === 'string' || typeof(value) === 'number';
}

function isNamedValue(arg) {
  return (typeof(arg) === 'object' && !arg.isGroup && isBasicValue(arg.value));
}

function isArrayOfValues(array) {
  if (!Array.isArray(array)) return false;
  for (const arrayEntry of array) {
    if (!isBasicValue(arrayEntry) && !isNamedValue(arrayEntry)) return false;
  }
  return true;
}

module.exports = {
  input,
  get inputValues() {
    return [..._inputValues];
  }
}
