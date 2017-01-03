import { expect } from 'chai';

import config from '~/lib/config';

describe('Config', () => {
    it('should be extendable', () => {
        config.set({ a: 'b', c: 'd' });
        expect(config.a).to.equal('b');
        expect(config.c).to.equal('d');
    });
});
