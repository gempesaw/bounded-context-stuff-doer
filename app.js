import build from '~/lib/build';
import restart from '~/lib/restart';
import context from '~/lib/context';
import config from '~/lib/config';

export default {
    current: context.coerceFn(build.current),
    newest: context.coerceFn(build.newest),
    update: context.coerceFn(build.update),
    restart: context.coerceFn(restart.queue),
    getContexts: context.getContexts,
    validateContext: context.coerce,
    setConfig: config.set
};
