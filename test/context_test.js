import { expect } from 'chai';

import context from '~/lib/context';
import config from '~/lib/config.js';

describe('Context', () => {
    const fn = (context) => context;
    const coerced = context.coerceFn(fn);

    it('should be coerced to only appropriate values', () => {
        const context = 'articles-microsite';
        expect(coerced(context)).to.equal(context);
    });

    it('should error for invalid contexts', () => {
        expect(coerced('failure')).to.be.an('error');
    });

    it('should return api details for apis', () => {
        const env = 'API-ENV';
        const box = 'API-BOX';

        const details = context.getDetails('whee-api');
        expect(details).to.eql({ env, box, context: 'whee-api' });
    });

    it('should construct site details for sites', () => {
        const env = 'SITE-ENV';
        const box = 'SITE-BOX';

        const details = context.getDetails('whee-microsite');
        expect(details).to.eql({ env, box, context: 'whee-microsite' });
    });
});
