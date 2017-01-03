import { expect } from 'chai';
import td from 'testdouble';
import http from '~/lib/http';
import config from '~/lib/config';

import build from '~/lib/build';

describe('Build number', () => {
    config.debug = false;
    const context = 'test-context';

    let getFromAdminUi;
    beforeEach(() => {
        getFromAdminUi = td.replace(http, 'getFromAdminUi');
    });

    it('should extract the current build', async function () {
        td.when(getFromAdminUi(build.currentUri(context)))
            .thenReturn(Promise.resolve('value="current build"'));

        const currentBuild = await build.current(context);
        expect(currentBuild).to.equal('current build');
    });

    it('should extract a newest build candidate', async function () {
        const expected = 'builds/test-context/rc/1.0.102_2017-07-20_16-31-25-0400';
        td.when(getFromAdminUi(build.newestUri(context)))
            .thenReturn(buildsXml(expected));

        const newestBuild = await build.newest(context);
        expect(newestBuild).to.equal(expected);
    });

    it('should update the build number', async function () {
        td.when(getFromAdminUi(build.updateUri(context)))
            .thenReturn(Promise.resolve('Record updated: stuff'));

        const updated = await build.update('new build', context);
        expect(updated).to.be.truthy;
    });

    afterEach(() => td.reset());
});

function buildsXml(expected = 'builds/test-context/rc/1.0.102_2017-07-20_16-31-25-0400') {
    return Promise.resolve(`
<rows>
<head>
<column width='520' type='ro' align='left' sort='str'>Build</column>
</head>
<row id='builds/test-context/rc/1.0.100_2016-07-20_16-26-05-0400'>
<cell>builds/test-context/rc/1.1.100_2016-07-20_16-26-05-0400</cell>
</row>
<row id='builds/test-context/rc/1.0.102_2016-07-20_16-30-25-0400'>
<cell>builds/test-context/rc/1.0.102_2017-07-20_16-30-25-0400</cell>
</row>
<row id='${expected}'>
<cell>${expected}</cell>
</row>
</rows>`);
}
