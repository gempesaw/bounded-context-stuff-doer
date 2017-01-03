import { expect } from 'chai';
import td from 'testdouble';
import config from '~/lib/config';

import http from '~/lib/http';

describe('HTTP wrapper', () => {
    const rejectUnauthorized = false,
          agent = false;

    let fakeRp;
    beforeEach(() => {
        config.base = '';
        config.username = config.password = 'credentials';
        fakeRp = td.function();
    });

    it('should send along some nice headers', () => {
        const res = http.getFromAdminUi('/path', fakeRp);
        td.verify(fakeRp({
            uri: '/path',
            headers: { Authorization: 'Basic Y3JlZGVudGlhbHM6Y3JlZGVudGlhbHM=' },
            rejectUnauthorized,
            agent
        }));
    });
});
