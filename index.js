const { consoleLogKeyValuePairs } = require('./utilities');
const { convertHexStringToNumber, convertNumberToHexString } = require('./calculations');

let set_0 = {};
['aa', 'bec', '450', '9'].forEach(str => {
  set_0[str] = convertHexStringToNumber(str);
});
consoleLogKeyValuePairs(set_0)
