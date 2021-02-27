const { input } = require('./utilities');

/*
ADD INPUT BELOW USING `addHexInput` AND `addNumInput` METHODS.
  note: both of these methods take accept the same parameter structures. can be called as many times as needed
  
  examples:
    addHexInput('ae92f');
    addHexInput(['8fa9ed2', '55b529', '3e077f'])
    addHexInput({
      name: 'My Number',
      value: 'ae92f'
    });
    addHexInput({
      name: 'Group A',
      values: ['8fa9ed2', '55b529']
    });
    addNumInput({
      name: 'BG Color',
      values: [199, 253, 226]
    });
    addNumInput([12, 352, 907, 2234, 55]);
    addNumInput([
      {
        name: 'Group B',
        values: [39, 322, 937, 55]
      }, {
        name: 'Group C,
        values: [12, 16, 33]
      }
    ]);
    addHexInput([['ae44e', '3229], ['289be', '3897e', 'af03e']]);
*/

input(['ff', 'aa', 'e9']);

input(12)
input(['ff'])
input({ name: 'named', value: 'fff'})
input({name: 'jeff', isGroup: true, value: 'eee'})