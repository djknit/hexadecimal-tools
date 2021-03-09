/*
Process input value(s) to conform to structure expected by convertAndPrintComboTools methods.
Currently only handles general integer representations and not colors

Processed value(s) should be one of the following:
  * single value = { name?, value }
  * multiple values (group of values) = { name?, isGroup: true, values: [<simple value>, ...]}
  * multiple groups of values = [<group of values>, ...]

Raw input parameter values should be one of the following:
  * simple value (hex string, number, or null)    --> single value
  * obj { name?, value }                          --> single value
  * obj { <name1>: <value1>, <name2>: <value2>, ... }  --> group if more than one name/value pair, otherwise single value
  * array [<any valid non-array input value (must be all values or all groups)>]   --> group || multiple groups
  * obj { <name1>: <either of previous 2 group representations>, ... }   --> multiple groups
*/

const processHexInput = (rawInput => processInput(rawInput, 'hex'));
const processNumInput = (rawInput => processInput(rawInput, 'num'));

module.exports = {
  processInput,
  processHexInput,
  processNumInput
};

function processInput(rawInput, hexOrNum) {
  const processor = (
    (isSingleValueInput(rawInput) && processSingleValueInput) ||
    (isGroupOfValuesInput(rawInput) && processGroupOfValuesInput) ||
    processCollectionOfGroupsInput
  );
  return processor(rawInput, hexOrNum);
}

function isSingleValueInput(inputVal) {
  return (
    !Array.isArray(inputVal) &&
    (
      !inputVal ||
      typeof(inputVal) !== 'object' ||
      inputVal.isGroup === false ||
      (
        !inputVal.isGroup &&
        !inputVal.values &&
        (
          !!inputVal.value ||
          !!inputVal.name ||
          Object.keys(inputVal).length <= 1
        )
      )
    )
  );
}

function isGroupOfValuesInput(inputVal) {
  return (
    typeof(inputVal) === 'object' &&
    (
      Array.isArray(inputVal) ?
      isSingleValueInput(inputVal[0]) :
      !isSingleValueInput(inputVal)
    )
  );
}

function processSingleValueInput(rawInput, hexOrNum) {
  return typeof(rawInput) !== 'object' ? (
    { value: parseSimpleValue(rawInput, hexOrNum) }
  ) : (
    {
      name: rawInput.name,
      value: parseSimpleValue(rawInput.value, hexOrNum)
    }
  );
}

function parseSimpleValue(rawSimpleValue, hexOrNum) { // for value portion only of single-value
  if (!rawSimpleValue && rawSimpleValue !== 0) return rawSimpleValue;
  const isHex = hexOrNum === 'hex', isString = typeof(rawSimpleValue) === 'string';
  if (!isString && typeof(rawSimpleValue) !== 'number') {
    return isHex ? 'INVALID' : NaN;
  }
  const trimmedVal = isString ? rawSimpleValue.trim() : rawSimpleValue;
  if (isHex) return trimmedVal;
  const parsedVal = parseFloat(trimmedVal);
  if (trimmedVal.toString() !== parsedVal.toString()) return NaN;
  return Math.round(parsedVal);
}

function processGroupOfValuesInput(rawInput, hexOrNum, groupName) {
  const _processSingleValsArray = _rawVal => processSingleValueInput(_rawVal, hexOrNum);
  if (typeof(rawInput) !== 'object') return { isGroup: true };
  if (Array.isArray(rawInput)) {
    return {
      isGroup: true,
      name: groupName,
      values: rawInput.map(_processSingleValsArray)
    };
  }
  if (rawInput.values) {
    return {
      isGroup: true,
      name: rawInput.name,
      values: rawInput.values.map(_processSingleValsArray)
    };
  }
  return {
    isGroup: true,
    name: groupName,
    values: Object.keys(rawInput).map(
      valueName => ({
        name: valueName,
        value: processSingleValueInput(rawInput[valueName], hexOrNum)
      })
    )
  };
}

function processCollectionOfGroupsInput(rawInput, hexOrNum) {
  if (typeof(rawInput !== 'object')) return [];
  if (Array.isArray(rawInput)) {
    return rawInput.map(arrEntry => processGroupOfValuesInput(arrEntry, hexOrNum));
  }
  return Object.keys(rawInput).map(
    groupName => processGroupOfValuesInput(rawInput[groupName], hexOrNum, groupName)
  );
}
