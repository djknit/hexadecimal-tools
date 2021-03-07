const columnify = require('columnify');
const {
  convertNumbersToHexStrings,
  convertHexStringsToNumbers,
  convertRgbColorsToHexColors,
  convertHexColorsToRgbColors,
  convertCamelCaseStringToStartCase
} = require('../../utilities');


const getPropAndDisplayNameInfo = (propName, displayName) => ({
  propName,
  displayName: displayName || propName
});

function arrayConverterWithPrintOptionFactory(
  arrayConverter,
  {
    printResult = false,
    inputPropName = 'input',
    outputPropName = 'output',
    inputColumnLabel = undefined,
    outputColumnLabel = undefined
  },
) {
  const labelsByPropName = {
    [inputPropName]: inputColumnLabel,
    [outputPropName]: outputColumnLabel
  };
  return function (inputValues) {
    const dataRows = arrayConverter(inputValues, inputPropName, outputPropName);
    if (printResult) {
      const columns = [inputPropName, outputPropName];
      const columnifyOptions = {
        align: 'right',
        headingTransform: _propName => labelsByPropName[_propName] || convertCamelCaseStringToStartCase(_propName)
      };
      console.log(columnify(dataRows, columns, columnifyOptions))
    
    }
    return results;
  }
}

// function getDataWithDisplayNames(dataRows, displayNamesByPropName) {
//   return dataRows.map(dataRow => _getDataRowWithDisplayNames(dataRow, displayNamesByPropName));
//   function _getDataRowWithDisplayNames(dataRow, displayNamesByPropName) {
//     let processedDataRow = {};
//     for (const propName in displayNamesByPropName) {
//       const displayName = displayNamesByPropName[propName];
//       processedDataRow[displayName] = dataRow[propName];
//     }
//     return processedDataRow;
//   }
// }



