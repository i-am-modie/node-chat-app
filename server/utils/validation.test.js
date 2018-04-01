const expect = require('expect');

let {isRealString} = require('./validation');

describe('isRealString()', () => {
    it('should reject non-string values', () => {
        expect(isRealString(1)).toBe(false);
    });
    it('shousld reject string with only spaces', () => {
        expect(isRealString('      ')).toBe(false);
    });
    it('should allow string with non-space characters', () => {
        expect(isRealString('   Test er ')).toBe(true);
    });
});