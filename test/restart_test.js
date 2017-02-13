import { expect } from 'chai';
import td from 'testdouble';
import http from '~/lib/http';
import config from '~/lib/config';
import context from '~/lib/context';

import restart from '~/lib/restart';

describe('Restart', () => {
    config.debug = false;

    const testContext = context.getContexts()[0];
    let getFromAdminUi;
    beforeEach(() => {
        getFromAdminUi = td.replace(http, 'getFromAdminUi');
    });

    it('should restart a server', () => {
        td.when(getFromAdminUi(restart.uri(testContext)))
            .thenReturn(Promise.resolve('Request queued'));

        return restart.queue(testContext)
            .then(res => {
                expect(res).to.equal('Request queued');
            });
    });

    it('should construct appropriate site restart urls', () => {
        config.siteBox = 'site-box';
        config.siteEnv = 'site-env';
        const uri = restart.uri('test-microsite');
        expect(uri).to.include('service=sc-site-env-test-microsite');
        expect(uri).to.include('ids=site-box');
    });

    it('should construct appropriate site restart urls', () => {
        config.apiBox = 'api-box';
        config.apiEnv = 'api-env';
        const uri = restart.uri('test-api');
        expect(uri).to.include('service=sc-api-env-test-api');
        expect(uri).to.include('ids=api-box');
    });

    afterEach(() => td.reset());
});
