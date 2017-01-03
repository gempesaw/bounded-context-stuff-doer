import config from '~/lib/config';

export default function log(msg, context = '') {
    if (config.debug) {
        console.log(msg, context);
    }
}
