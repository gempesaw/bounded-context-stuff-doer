import rp from 'request-promise-native';

import config from '~/lib/config';
import log from '~/lib/log';

function getFromAdminUi (path, request = rp) {
    log(`GET ${path}`);

    // `Buffer.from` is preferred in newer nodes > 6.0, but 4.3.2
    // crashes out on `Buffer.from`, and all of our microsites use
    // 4.3.2. Since >6.0 can handle `new Buffer` at time of writing,
    // we use this deprecated version to accomodate both.
    const auth = new Buffer(`${config.username}:${config.password}`).toString('base64');
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
