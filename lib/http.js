import rp from 'request-promise-native';

import config from '~/lib/config';
import log from '~/lib/log';

function getFromAdminUi (path, request = rp) {
    log(`GET ${path}`);

    const auth = Buffer.from(`${config.username}:${config.password}`).toString('base64');
    const headers = { Authorization: `Basic ${auth}` };

    return request({
        uri: `${config.base}${path}`,
        headers,
        rejectUnauthorized: false,
        agent: false
    });
}

const http = { getFromAdminUi };
export default http;
