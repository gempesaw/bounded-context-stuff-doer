import { expect } from 'chai';

import context from '~/lib/context';

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
});
