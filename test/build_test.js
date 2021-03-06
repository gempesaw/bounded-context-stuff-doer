import { expect } from 'chai';
import td from 'testdouble';
import http from '~/lib/http';
import config from '~/lib/config';

import build from '~/lib/build';

describe('Build number', () => {
    config.debug = false;
    const context = 'test-context-api';

    let getFromAdminUi;
    beforeEach(() => {
        getFromAdminUi = td.replace(http, 'getFromAdminUi');
    });

    it('should compute env and product for build uri', () => {
        const uri = build.currentUri(context);
        expect(uri).to.include('env=API-ENV');
        expect(uri).to.include('product=test-context-api');
    });

    it('should compute env and product for newest uri', () => {
        const uri = build.newestUri(context);
        expect(uri).to.include('builds/test-context-api/rc');
    });

    it('should extract the current build', async function () {
        td.when(getFromAdminUi(build.currentUri(context)))
            .thenReturn(Promise.resolve('value="current build"'));

        const currentBuild = await build.current(context);
        expect(currentBuild).to.equal('current build');
    });

    it('should extract a newest build candidate', async function () {
        const expected = 'builds/test-context-api/rc/1.0.102_2017-07-20_17-31-25-0400';
        td.when(getFromAdminUi(build.newestUri(context)))
            .thenReturn(buildsXml(expected));

        const newestBuild = await build.newest(context);
        expect(newestBuild).to.equal(expected);
    });

    it('should update the build number', async function () {
        td.when(getFromAdminUi(build.updateUri(context)('new-build')))
            .thenReturn(Promise.resolve('Record updated: stuff'));
        const updated = await build.update(context, 'new-build');
        expect(updated).not.to.be.an('error');
    });

    afterEach(() => td.reset());
});

function buildsXml(expected = 'builds/test-context-api/rc/1.0.102_2017-07-20_17-31-25-0400') {
    return Promise.resolve(`
<rows>
<head>
<column width='520' type='ro' align='left' sort='str'>Build</column>
</head>
<row id='${expected}'>
<cell>${expected}</cell>
</row>
<row id='builds/test-context-api/rc/1.0.100_2016-07-20_16-26-05-0400'>
<cell>builds/test-context-api/rc/1.1.100_2017-07-20_16-26-05-0400</cell>
</row>
<row id='builds/test-context-api/rc/1.0.102_2016-07-20_16-30-25-0400'>
<cell>builds/test-context-api/rc/1.0.102_2017-07-20_16-30-25-0400</cell>
</row>
</rows>`);
}
