const {
  consoleLogKeyValuePairs,
  convertHexStringToNumber
} = require('./utilities');

let set_0 = {};
['aa', 'bec', '450', '9'].forEach(str => {
  set_0[str] = convertHexStringToNumber(str);
});
consoleLogKeyValuePairs(set_0)

module.exports = {

};
