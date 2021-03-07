const { convertNumberToHexString, convertRgbColorToHex} = require('./decToHex');
const { convertHexStringToNumber, convertHexColorToRgb } = require('./hexToDec');

module.exports = {
  convertNumbersToHexStrings: arrayConverterFactory(convertNumberToHexString),
  convertRgbColorsToHexColors: arrayConverterFactory(convertRgbColorToHex),
  convertHexStringsToNumbers: arrayConverterFactory(convertHexStringToNumber),
  convertHexColorsToRgbColors: arrayConverterFactory(convertHexColorToRgb)
};


function arrayConverterFactory(
  valueConverter,
  inputPropName = 'input',
  outputPropName = 'output'
) {
  return (
    arrayOfVals => arrayOfVals.map(
      inputVal => ({
        [inputPropName]: inputVal,
        [outputPropName]: valueConverter(inputVal)
      })
    )
  );
}
