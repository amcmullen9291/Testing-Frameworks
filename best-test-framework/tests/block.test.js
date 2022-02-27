const expect = require('expect');


describe('equality test', () => {
    it('doesnt works', () => {
        expect(1).toBe(1);
        expect(3).toBe(4);
    });
});

describe('equality test will fail', () => {
    it('works', () => {
        expect(1).toBe(9);
    });
});
