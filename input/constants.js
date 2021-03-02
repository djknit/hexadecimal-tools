const importedConstants = require('../utilities').constants;
const basicInputTypes = ['hex', 'num'];
const groupTypes = [...basicInputTypes, 'mixed'];

module.exports = {
  basicInputTypes,
  groupTypes,
  ...importedConstants
};
