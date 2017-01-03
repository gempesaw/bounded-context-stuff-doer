import config from '~/lib/config';
import http from '~/lib/http';
import log from '~/lib/log';

const uri = (context, boxIds) => `/services/control?action=restart&service=sc-kms-${context}&site=&ids=${boxIds}`;
async function queue (context = 'articles-microsite', boxIds = config.defaultBox) {
    try {
        const restarted = await http.getFromAdminUi(uri(context, boxIds));
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
