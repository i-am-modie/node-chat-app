let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage()', ()=>{
    it('should generate the correct message object', ()=>{
        let from = 'Admin';
        let text = 'Test message';
        let res = generateMessage(from, text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage()', () => {
    it('should generate correct location object', () => {
        let from = 'User';
        let latitude = 1;
        let longtitude = 1;
        let res = generateLocationMessage(from, latitude, longtitude);
        expect(res.from).toBe(from);
        expect(res.url).toBe(`https://google.com/maps?q=${latitude},${longtitude}`);
        expect(typeof res.createdAt).toBe('number');
    })
});