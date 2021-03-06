module.exports = {
  printInAndOutValues,
  rgbArrToStr,
  formatHexString
};


function printInAndOutValues({ in: in_, out, name }) {
  const messagePrefix = name ? `${name}: ` : '';
  console.log(`${messagePrefix}${in_} --> ${out}`);

}

function rgbArrToStr(rgbArray, omitPrecedingLetters) {
  const prefix = omitPrecedingLetters ? '' : 'rgb';
  return `${prefix}(${rgbArray.join(', ')})`;
}

function formatHexString(hexString) {
  return `'${hexString}'`;
}
