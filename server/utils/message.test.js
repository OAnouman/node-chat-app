const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('#generateMessage', () => {


    it('Should return an object with specified data', () => {

        let from = '@Martial',
            text = 'Hi there !';

        let message = generateMessage(from, text);

        expect(message).toInclude({ from, text });

        expect(message.createdAt).toBeA('number');

    })


});


describe('#generateLocationMessage', () => {

    it('Should generate correct location object', () => {

        let lat = 1,
            lng = 1,
            from = '@Admin';

        let message = generateLocationMessage(from, 1, 1);

        expect(message).toInclude({

            from,

            url: `https://www.google.com/maps?q=${lat},${lng}`

        });

        expect(message.createdAt).toBeA('number');

    });

});