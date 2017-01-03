import { expect } from 'chai';

import app from '~/app';

describe('App', () => {
    it('should have all of its exported fns coerced', () => {
        expect(app.current('invalid context')).to.be.an('error');
        expect(app.newest('invalid context')).to.be.an('error');
        expect(app.update('invalid context')).to.be.an('error');
        expect(app.restart('invalid context')).to.be.an('error');
    });
});
