const { constants: importedConstants, ...otherUtils } = require('../utilities');

const constants = {
  ...importedConstants,
  invalidHexInputString: 'INVALID'
};

module.exports = {
  ...otherUtils,
  constants
};
