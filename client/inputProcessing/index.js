/*
Process input value(s) to conform to structure expected by convertAndPrintComboTools methods.

Processed value(s) should be one of the following:
  * single value = { name?, value } (also type = 'hex' or 'num')
  * multiple values (group of values) = { name?, isGroup: true, values: [<simple value>, ...]}
  * multiple groups of values

Raw input parameter values should be one of the following:
  * simple value (hex string, number, or null)    --> single value
  * obj { name?, value }                          --> single value
  * obj { <name1>: <value1>, <name2>: <value2>, ... }  --> group if more than one name/value pair, otherwise single value
  * array [<any valid non-array input value (must be all values or all groups)>]   --> group || multiple groups
  * obj { <name1>: <either of previous 2 group representations> }   --> multiple groups
*/

function processHexInput(rawInput) {

}

function processNumInput(rawInput) {}

function isSingleValueInput(inputVal) {
  return (
    !inputVal ||
    (
      !Array.isArray(inputVal) &&
      (
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
    )
  );
}

function isGroupOfValuesInput(inputVal) {
  return (
    typeof(inputVal) === 'object' &&
    Array.isArray(inputVal) ? (
      isSingleValueInput(inputVal[0])
    ) : (
      !isSingleValueInput(inputVal)
    )
  );
}

function processInput(rawInput) {
  if (isSingleValueInput(rawInput)) return processSingleValueInput(rawInput);
  if (isGroupOfValuesInput(rawInput)) return processGroupOfValuesInput(rawInput);
  return processCollectionOfGroupsInput(rawInput);
}

function processSingleValueInput(rawInput, hexOrNum) {
  return (typeof(rawInput) !== 'object') ? (
    { value: parseSimpleValue(rawInput) }
  ) : (
    {
      name: rawInput.name,
      value: parseSimpleValue(rawInput.value)
    }
  );
}

function parseSimpleValue(rawSimpleValue, hexOrNum) {
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

function processGroupOfValuesInput(rawInput) {

}

function processCollectionOfGroupsInput(rawInput) {

}
