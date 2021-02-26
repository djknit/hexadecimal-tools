let _inputValues = { hex: [], num: [] };

function addHexInput(...hexInputs) {
  addInputs(hexInputs, 'hex');
}

function addNumInput(...numInputs) {
  addInputs(numInputs, 'num');
}

function addInputs(rawInput, inputType) {
  const rawInputValsArray = (isValueOnly(rawInput) || !isObjectAnArray()) ? [rawInput] : rawInput;
  for (const rawInputVal of rawInputValsArray) {
    const valuePortion = rawInputVal.value || rawInputVal.values || rawInputVal;
    inputValues[inputType].push({
      name: rawInputVal.name,
      values: (
        isValueOnly(valuePortion) || !isObjectAnArray(valuePortion) ?
        [valuePortion] :
        valuePortion
      )
    });
  }
}

function isValueOnly(input) {
  return typeof(input) === 'string' || typeof(input) === 'number';
}
function isObjectAnArray(objOrArray) {
  return objOrArray.length !== undefined;
}

module.exports = {
  addHexInput,
  addNumInput,
  inputValues: {
    get hex() { return _inputValues.hex; },
    get num() { return _inputValues.num; }
  }
}
