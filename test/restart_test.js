import { expect } from 'chai';
import td from 'testdouble';
import http from '~/lib/http';
import config from '~/lib/config';

import restart from '~/lib/restart';

describe('Restart', () => {
    config.debug = false;

    const context = 'test-context';
    let getFromAdminUi;
    beforeEach(() => {

        getFromAdminUi = td.replace(http, 'getFromAdminUi');
    });

    it('should restart a server', () => {
        td.when(getFromAdminUi(restart.uri(context, 'boxIds')))
            .thenReturn(Promise.resolve('Request queued'));

        const restarted = restart.queue(context, 'boxIds');
        expect(restarted).to.be.truthy;
    });

    afterEach(() => td.reset());
});
