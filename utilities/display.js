const columnify = require('columnify');

module.exports = {
  printInAndOutValues,
  rgbArrToStr,
  formatHexString,
  printHeader,
  printFooter,
  convertCamelCaseStringToStartCase
};


const defaultLineLength = 60;

function printInAndOutValues({ in: in_, out, name }) {
  const messagePrefix = name ? `${name}: ` : '';
  console.log(`${messagePrefix}${in_} --> ${out}\n`);
}

function rgbArrToStr(rgbArray, omitPrecedingLetters) {
  const prefix = omitPrecedingLetters ? '' : 'rgb';
  return `${prefix}(${rgbArray.join(', ')})`;
}

function formatHexString(hexString) {
  return `'${hexString}'`;
}

function printHeader(widthInChars = defaultLineLength) {
  const horizontalRule = '_'.repeat(widthInChars) + '\n' + '%'.repeat(widthInChars);
  let message = 'HEXADECIMAL TOOLS ';
  const remainingCharsInLine = widthInChars - message.length;
  if (remainingCharsInLine > 1) {
    message += '~'.repeat(remainingCharsInLine);
  }
  console.log(`\n${horizontalRule}\n${message}\n`)
}

function printFooter(widthInChars = defaultLineLength) {
  console.log('%'.repeat(widthInChars) + '\n' + '`'.repeat(widthInChars));
}

// probably get rid of this one:
function convertCamelCaseStringToStartCase(camelCaseString) {
  if (!camelCaseString) return '';
  let titleCaseString = camelCaseString[0].toUpperCase;
  for (let i = 1; i < camelCaseString.length; i++) {
    const currentCharacter = camelCaseString[i];
    let isUpperCase, isLowerCase;
    if (currentCharacter === currentCharacter.toUpperCase()) isUpperCase = true;
    else if (currentCharacter === currentCharacter.toLowerCase()) isLowerCase = true;
    if (isUpperCase && i > 0 && camelCaseString[i - 1] !== ' ') titleCaseString += ' ';
    titleCaseString += currentCharacter;
    if (!isUpperCase && !isLowerCase) titleCaseString += ' ';
  }
}
