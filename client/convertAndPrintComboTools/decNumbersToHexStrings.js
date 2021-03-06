const {
  convertNumberToHexString,
  convertRgbColorToHex,
  printInAndOutValues,
  formatHexString,
  convertAlwaysPrintFactory,
  rgbArrToStr
} = require('./utilities');

module.exports = {
  convertNumberToHexString: convertNumberToHexStringAndPrintIfAsked,
  convertRgbColorToHex: convertRgbColorToHexAndPrintIfAsked,
  printHexStringForNumber: convertAlwaysPrintFactory(convertNumberToHexStringAndPrintIfAsked),
  printHexColorForRgbColor: convertAlwaysPrintFactory(convertRgbColorToHexAndPrintIfAsked)
};


function convertNumberToHexStringAndPrintIfAsked(number, printResult) {
  const hexString = convertNumberToHexString(number);
  if (printResult) {
    printInAndOutValues({
      in: number,
      out: formatHexString(hexString)
    });
  }
  return hexString;
}

function convertRgbColorToHexAndPrintIfAsked(rgbColorInput, printResult) {
  const hexString = convertRgbColorToHex(rgbColorInput);
  if (printResult) {
    printInAndOutValues({
      in: typeof(rgbColorInput) === 'string' ? `'${rgbColorInput}'` : rgbArrToStr(rgbColorInput),
      out: formatHexString(hexString)
    });
  }
  return rgbArray;
}
