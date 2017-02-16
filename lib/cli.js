import prompt from 'prompt';

import config from '~/lib/config';
import build from '~/lib/build';
import restart from '~/lib/restart';
import context from '~/lib/context';

async function bindYourContext (context) {
    console.log(`CONTEXT: ${context}`);
    const currentBuild = await build.current(context);
    const newestBuild = await build.newest(context);

    console.log(`Current Build: ${currentBuild}\nNewest Build:  ${newestBuild}`);
    if (currentBuild === newestBuild) {
        console.log('The newest build is already deployed; bye');
        process.exit(0);
    }
    else {
        console.log(`Update build number and deploy?`);
        prompt.get(['confirm'], async function (err, result) {
            if (result.confirm === 'y') {
                const updated = await build.update(context, newestBuild);
                const restarted = await restart.queue(context);
            }
        });
    };
}


if (config.username === 'USERNAME' || config.password === 'PASSWORD') {
    console.log('Please update your credentials in lib/config.js and try again.');
    process.exit(0);
}

const args = process.argv.slice(2); // first two items are node
                                    // binary, then node filename
const userContext = args[0] || 'articles-microsite';
const ret = context.coerceFn(bindYourContext)(userContext);

if (ret instanceof Error) {
    console.log(ret);
    process.exit(0);
}
