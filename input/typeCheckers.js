module.exports = {
  isBasicValue,
  isNamedValue,
  isArrayOfValues
};

//______________________________________________________

function isBasicValue(value) {
  return !value || typeof(value) === 'string' || typeof(value) === 'number';
}

function isNamedValue(arg) {
  if (typeof(arg) !== 'object') return false;
  const { isGroup, value, values } = arg;
  return !isGroup && !values && isBasicValue(value);
}

function isArrayOfValues(array) {
  if (!Array.isArray(array)) return false;
  for (const arrayEntry of array) {
    if (!isBasicValue(arrayEntry) && !isNamedValue(arrayEntry)) return false;
  }
  return true;
}
