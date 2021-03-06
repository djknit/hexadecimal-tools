const {
  convertHexStringToNumber,
  convertHexColorToRgb,
  printInAndOutValues,
  rgbArrToStr,
  formatHexString,
  convertAlwaysPrintFactory
} = require('./utilities');

module.exports = {
  convertHexStringToNumber: convertHexStringToNumberAndPrintIfAsked,
  convertHexColorToRgb: convertHexColorToRgbAndPrintIfAsked,
  printNumberForHexString: convertAlwaysPrintFactory(convertHexStringToNumberAndPrintIfAsked),
  printRgbColorForHexColor: convertAlwaysPrintFactory(convertHexColorToRgbAndPrintIfAsked),
};


function convertHexStringToNumberAndPrintIfAsked(hexString, printResult) {
  const number = convertHexStringToNumber(hexString);
  if (printResult) {
    printInAndOutValues({
      in: formatHexString(hexString),
      out: number
    });
  }
  return number;
}

function convertHexColorToRgbAndPrintIfAsked(hexString, printResult) {
  const rgbArray = convertHexColorToRgb(hexString);
  if (printResult) {
    printInAndOutValues({
      in: formatHexString(hexString),
      out: rgbArrToStr(rgbArray)
    });
  }
  return rgbArray;
}
