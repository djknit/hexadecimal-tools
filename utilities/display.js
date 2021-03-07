module.exports = {
  printInAndOutValues,
  rgbArrToStr,
  formatHexString,
  printHeader,
  printFooter
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
