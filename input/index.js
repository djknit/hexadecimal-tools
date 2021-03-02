const { processSingleInputArg }= require('./userInputHandling');
const constants = require('./constants');

let _inputValues = [];

module.exports = {
  get values() {
    return [..._inputValues];
  },
  addInputValues,
  clear: clearInput,
  constants
};

//-------------------------------------------------------

function addInputValues(...inputArgs) {
  _inputValues.push(...inputArgs.map(processSingleInputArg));
}

function clearInput() {
  _inputValues = [];
}
