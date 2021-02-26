
function calcNDigitHexdec(hexString) {
  let totalValue = 0;
  const startIndex = hexString[0] === '#' ? 1 : 0;
  for (let i = 0; i < hexString.length - startIndex; i++) {
    const currentDigitValue = calcSingleHexDigit(hexString[startIndex + i]);
    totalValue += currentDigitValue * Math.pow(16, i);
  }
  return totalValue;
}

function calc2DigitHexdec(hexString) {
  if (hexString.length !== 2) return console.log('bad input');
  return 16 * calcSingleHexDigit(hexString[0]) + calcSingleHexDigit(hexString[1]);
}

function calcSingleHexDigit(singleChar) {
  if (`${parseInt(singleChar)}` === singleChar) return parseInt(singleChar);
  return letterValues[singleChar];
}

function convertHexColor(hexString) {
  const startIndex = hexString[0] === '#' ? 1 : 0;
  let componentParts = [];
  for (let i = startIndex; i < hexString.length; i = i + 2) {
    componentParts.push(hexString.substring(i, i + 2));
  }
  return componentParts.map(calc2DigitHexdec);
}

function convertAndLog(hexColorString) {
  const processedVal = convertHexColor(hexColorString);
  console.log(`( ${processedVal.join(', ')} )`)
}

// ------* ^^-- hexToDec *--------* vv-- decToHex 

function convertDecNumToHexString(num) {
  let order = 0;
  while (Math.pow(16, order + 1) <= num) {
    ++order;
  }
  let result = '', remainder = num;
  for (let i = order; i >= 0; i--) {
    const orderBase = Math.pow(16, i);
    const digitValue = Math.floor(remainder / orderBase);
    remainder = remainder % orderBase;
    result += hexNumerals[digitValue];
  }
  return result;
}

convertAndLog('eeeeee')
convertAndLog('e7e7e7')
convertAndLog('f8f8f8')
console.log('----')
console.log(convertDecNumToHexString(241));
console.log(convertDecNumToHexString(255));
console.log(convertDecNumToHexString(245));
