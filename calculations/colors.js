const { convertHexStringToNumber } = require('./hexStringToNumber');
const { convertNumberToHexString } = require('./numberToHexString');

function convertHexColorToRgb(hexString) {
  const startIndex = hexString[0] === '#' ? 1 : 0;
  let componentParts = [];
  for (let i = startIndex; i < hexString.length; i = i + 2) {
    componentParts.push(hexString.substring(i, i + 2));
  }
  return componentParts.map(convertHexStringToNumber);
}

function convertRgbColorToHex(rgbArrayOrString) {
  return convertRgbArrayToHexColor(
    typeof(rgbArrayOrString) === 'string' ? parseRgbString(rgbArrayOrString) : rgbArrayOrString
  );
}

function parseRgbString(rgbString) {
  const startIndex = rgbString.indexOf('(') + 1;
  const endIndex = rgbString.indexOf(')');
  let neededPortionOfStr = rgbString.slice(startIndex, endIndex);
  return neededPortionOfStr.split(',').map(parseFloat).map(Math.round);
}

function convertRgbArrayToHexColor(rgbArray) {
  let hexColorString = '#';
  for (const primaryColorValue of rgbArray) {
    const primaryColorHexVal = convertNumberToHexString(primaryColorValue);
    if (primaryColorHexVal < 2) hexColorString += '0';
    hexColorString += primaryColorHexVal;
  };
  return hexColorString;
}

module.exports = {
  convertHexColorToRgb,
  convertRgbColorToHex
};
