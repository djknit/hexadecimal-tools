const { processSingleInputArg }= require('./userInputHandling');

let _inputValues = [];

module.exports = {
  input: {
    get values() {
      return [..._inputValues];
    },
    addInputValues,
    clear: clearInput
  }
};

//-------------------------------------------------------

function addInputValues(...inputArgs) {
  _inputValues.push(...inputArgs.map(processSingleInputArg));
}

function clearInput() {
  _inputValues = [];
}
