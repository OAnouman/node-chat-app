const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {


    it('Should return an object with specified data', () => {

        let from = '@Martial',
            text = 'Hi there !';

        let message = generateMessage(from, text);

        expect(message).toInclude({ from, text });

        expect(message.createdAt).toBeA('number');

    })


})