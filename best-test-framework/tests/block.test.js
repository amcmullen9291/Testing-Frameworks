describe('equality test', () => {
    it('works', () => {
        except(1).toBe(1);
    });
});

describe('equality test fail', () => {
    it('doesnt works', () => {
        except(1).toBe(15);
    });
});