import xmldoc from 'xmldoc';
import moment from 'moment';
import R from 'ramda';

import log from '~/lib/log';
import http from '~/lib/http';
import context from '~/lib/context';

const currentUri = R.pipe(
    context.getDetails,
    ({ env, context }) => `/builds/get?env=${env}&product=${context}&site=sc`
);
// String -> Either[String, Error]
async function getCurrentBuild (context = "articles-microsite") {
    try {
        const res = await http.getFromAdminUi(currentUri(context));

        const matches = res.match(/value="(.*?)"/);
        if (matches && matches[1]) {
            return matches[1];
        }
        else {
            log(matches, `getCurrentBuild(${context})`);
            throw new Error('Sorry, could not find a build number');
        }
    }
    catch (err) {
        log(err, err.stack);
        return err;
    }
}

const newestUri = (context) => `/builds/getBuildFileList?site=sc&buildpath=builds/${context}/rc/`;
// String -> Either[String, Error]
async function getNewestBuild (context = "articles-microsite") {
    try {
        const res = await http.getFromAdminUi(newestUri(context));
        const newBuild = parseNewBuilds(res);

        return newBuild;
    }
    catch (err) {
        log(err, err.stack);
        return err;
    }
}

const updateUri = R.pipe(
    context.getDetails,
    ({ env, context }) => (build) =>
        `/builds/update?site=sc&env=${env}&product=${context}&bucket=${env}-${context}-build&build=${build}`
);
// (String, String) -> Either[String, Error]
async function updateBuild (context = "articles-microsite", build) {
    try {
        const uri = updateUri(context)(build);
        const updated = await http.getFromAdminUi(uri);
        if (updated && /Record updated:/.test(updated)) {
            log(`Build Update Success: ${updated}`);
            return updated;
        }
        else {
            log(`Build Update failure: ${updated}`, `updateBuild(${context}, ${build})`);
            return new Error('Uhh, weird');
        }
    }
    catch (err) {
        log(err, err.stack);
        return err;
    }
}

function parseNewBuilds (xml) {
    const builds = new xmldoc.XmlDocument(xml);

    const timestampRegex = new RegExp(`_(${(new Date()).getUTCFullYear()}.*)`);

    let newBuilds = [];
    builds.eachChild((child, index, array) => {
        const build = child.children[1].val;
        const timestamp = (build.match(timestampRegex) || [,])[1];
        const time = moment(timestamp, 'YYYY-MM-DD_HH-mm-ss-Z');
        if (build && time.isValid()) {
            newBuilds.push({build, time});
        }
    });

    const sorted = newBuilds.sort((a, b) => a.time - b.time);
    if (sorted && sorted.length) {
        return sorted[sorted.length - 1].build;
    }
    else {
        log(sorted, `parseNewBuilds()`);
        return new Error('Could not find newest build number');
    }
}

const build = {
    current: getCurrentBuild,
    newest: getNewestBuild,
    update: updateBuild,
    currentUri,
    newestUri,
    updateUri
};

export default build;
