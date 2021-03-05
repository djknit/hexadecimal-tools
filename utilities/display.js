function formatKeyValuePairs(obj, keysOrder = [], name) {
  const objKeys = Object.keys(obj);
  const processedKeysArray = objKeys.sort(
    (key_a, key_b) => keysOrder.indexOf(key_a) - keysOrder.indexOf(key_b),
  );
  const numBorderChars = 42;
  let displayValue = (name || '') + ' *~*';
  displayValue += '~'.repeat(numBorderChars - 1 - displayValue.length) + '*';
  for (const key of processedKeysArray) {
    const valueForKey = obj[key];
    const displayValueForKey = typeof(valueForKey) === 'string' ? `"${valueForKey}"` : valueForKey;
    displayValue += `\n  ${key} --> ${displayValueForKey}`;
  }
  displayValue += '\n*' + '-'.repeat(numBorderChars - 2) + '*';
  return `\n${displayValue}\n`;
}

function consoleLogKeyValuePairs(obj, keysOrder, name) {
  console.log(formatKeyValuePairs(obj, keysOrder, name));
}

module.exports = {
  consoleLogKeyValuePairs
};
