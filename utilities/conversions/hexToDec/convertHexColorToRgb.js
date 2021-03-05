const convertHexStringToNumber = require('./convertHexStringToNumber');

module.exports = convertHexColorToRgb;


function convertHexColorToRgb(hexString) {
  const startIndex = hexString[0] === '#' ? 1 : 0;
  let componentParts = [];
  for (let i = startIndex; i < hexString.length; i = i + 2) {
    componentParts.push(hexString.substring(i, i + 2));
  }
  return componentParts.map(convertHexStringToNumber);
}
