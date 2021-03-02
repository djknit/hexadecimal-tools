const { throwInvalid } = require('../utilities');
const { isBasicValue } = require('./typeCheckers');
const { basicInputTypes, groupTypes, hexCharsIndexedByValue } = require('./constants');

function processRawValue(rawValue, type) {
  const trimmedValue = typeof(rawValue) === 'string' ? rawValue.trim() : rawValue;
  if ([undefined, null, ''].includes(trimmedValue)) {
    return { isValid: true, value: null };
  }
  return type === 'num' ? parseRawValueAsNumber(trimmedValue) : parseRawValueAsHex(trimmedValue);
}

function parseRawValueAsNumber(rawValue) { // should already be guaranteed to be number, string, or falsey
  const parsedValue = parseFloat(rawValue);
  const roundedVal = Math.round(parsedValue);
  if (!parsedValue && parsedValue !== 0) {
    return { isValid: false, value: null };
  }
  if (roundedVal < 0 || parsedValue !== roundedVal) {
    return { isValid: false, value: roundedVal };
  }
  return {
    value: roundedVal,
    isValid: typeof(rawValue) !== 'string' || rawValue === roundedVal.toString()
  };
}

function parseRawValueAsHex(rawValue) {
  let workingValue = rawValue.toString();
  if (workingValue[0] === '#') workingValue = workingValue.slice(1);
  for (let i = 0; i < workingValue.length; i++) {
    if (![hexCharsIndexedByValue].includes(workingValue[i])) {
      return {
        isValid: false,
        value: workingValue.slice(0, i)
      };
    }
  }
  return { isValid: true, value: workingValue };
}

class Value {
  constructor(basicValue, name, type, targetType) {
    if (!isBasicValue(basicValue)) throwInvalid('basic value of value', basicValue);
    validateName(name);
    this.name = name;
    this.rawValue = basicValue;
    if (basicInputTypes.includes(type)) Object.assign(this, { type });
    else if (typeof(basicValue) === 'number') this.type = 'num';
    else if (typeof(basicValue) === 'string') this.type = 'hex';
    if (basicInputTypes.includes(targetType)) Object.assign(this, { targetType })
    else if (this.type) this.targetType = this.type === 'num' ? 'hex' : 'num';
    this.parsedValue = processRawValue(basicValue, this.type);
  };
};

class Group {
  constructor(values, name, typeArg, targetType) {
    let hasNum = false, hasHex = false;
    for (const value of values) {
      if (!(value instanceof Value)) throwInvalid('group value input', value);
      if (value.type === 'num') hasNum = true;
      else if (value.type === 'hex') hasHex = true;
    }
    validateName(name);
    const type = (
      (groupTypes.includes(typeArg) && typeArg) ||
      (hasNum && hasHex && 'mixed') ||
      (hasHex && 'hex') ||
      (hasNum && 'num') ||
      undefined
    );
    Object.assign(this, { values, name, type, targetType });
  };
};

class SuperGroup {
  constructor(groups, name) {
    for (const group of groups) {
      if (!(group instanceof Group)) throwInvalid('super group group input', group);
    }
    validateName(name);
    this.isSuper = true;
    Object.assign(this, { groups, name });
  };
};

module.exports = {
  Value,
  Group,
  SuperGroup,
  basicInputTypes
};

//-----------------------------------


function validateName(name, nameOfWhat) {
  if (name && typeof(name) !== 'string' && typeof(name) !== 'number') {
    throwInvalid(`${nameOfWhat} name`, name);
  }
}
