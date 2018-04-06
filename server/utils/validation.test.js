const expect = require('expect');

const { isRealString } = require('./validation');

describe('#isRealString', () => {

    it('Shoul reject non-string characters', () => {

        let nonString = 123;

        let result = isRealString(nonString);

        expect(result).toBeFalsy();

    });

    it('Should reject string with only spaces', () => {

        let spacesString = '            ';

        let result = isRealString(spacesString);

        expect(result).toBeFalsy();

    })

    it('Should accept valid string', () => {


        let str = '      A valid string      ';

        let result = isRealString(str);

        expect(result).toBeTruthy();

    })


})