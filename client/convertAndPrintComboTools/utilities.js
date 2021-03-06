module.exports = {
  ...require('../../utilities'),
  convertAlwaysPrintFactory
};


function convertAlwaysPrintFactory(converter) {
  return (input => converter(input, true));
}
