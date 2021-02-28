const { throwInvalid } = require('../utilities');
const { isBasicValue } = require('./typeCheckers');

const basicInputTypes = ['hex', 'num'];
const groupTypes = [...basicInputTypes, 'mixed'];

class Value {
  constructor(basicValue, name, type, targetType) {
    if (!isBasicValue(basicValue)) throwInvalid('basic value of value', basicValue);
    validateName(name);
    this.name = name;
    if (basicInputTypes.includes(type)) Object.assign(this, { type });
    else if (typeof(basicValue) === 'number') this.type = 'num';
    else if (typeof(basicValue) === 'string') this.type = 'hex';
    this.value = this.type === 'num' ? Math.round(parseFloat(basicValue)) : basicValue;
    if (basicInputTypes.includes(targetType)) Object.assign(this, { targetType });
    else if (this.type) this.targetType = this.type === 'num' ? 'hex' : 'num';
  };
};

class Group {
  constructor(values, name, typeArg) {
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
    Object.assign(this, { values, name, type });
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

module.exports = {
  Value,
  Group,
  SuperGroup
};

//-----------------------------------


function validateName(name, nameOfWhat) {
  if (name && typeof(name) !== 'string' && typeof(name) !== 'number') {
    throwInvalid(`${nameOfWhat} name`, name);
  }
}

function validateBasicValue(basicValue) {
  if (basicValue && typeof(basicValue) !== 'number' && typeof(basicValue) !== 'string') {
    throwInvalid('basic value input', basicValue);
  };
}
