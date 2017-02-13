import R from 'ramda';

import config from '~/lib/config';
import http from '~/lib/http';
import log from '~/lib/log';
import context from '~/lib/context';

const buildUri = ({ context = '', env = '', box = '' } = {}) => `/services/control?action=restart&service=sc-${env}-${context}&site=&ids=${box}`;

const uri = R.pipe(context.getDetails, buildUri);

async function queue (context = 'articles-microsite') {
    try {
        const restarted = await http.getFromAdminUi(uri(context));
        if (restarted && /queued/.test(restarted)) {
            log(`Success: ${restarted}`);
            return restarted;
        }
        else {
            log(restarted);
            return new Error('bye from restartBoundedContext');
        }
    }
    catch (err) {
        log(err, err.stack);
        return err;
    }
}

const restart = { queue, uri };
export default restart;
