import xmldoc from 'xmldoc';

import log from '~/lib/log';
import http from '~/lib/http';

const currentUri = (context) => `/builds/get?env=kms&product=${context}&site=sc`;
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
            return new Error('Sorry, could not find a build number');
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
        const newBuilds = parseNewBuilds(res);
        if (newBuilds && newBuilds.length) {
            return newBuilds[newBuilds.length - 1];
        }
        else {
            log(newBuilds, `getNewestBuild(${context})`);
            return new Error('Could not find newest build number');
        }
    }
    catch (err) {
        console.log(err, err.stack);
        log(err, err.stack);
        return err;
    }
}

const updateUri = (context) => `/builds/update?site=sc&env=kms&product=${context}&bucket=kms-${context}-build&build=${build}`;
// (String, String) -> Either[String, Error]
async function updateBuild (context = "articles-microsite", build) {
    try {
        const uri = updateUri(context);
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

    let newBuilds = [];
    builds.eachChild((child, index, array) => {
        newBuilds.push(child.children[1].val);
    });

    const thisYear = new RegExp(`_${(new Date()).getUTCFullYear()}-`);
    return newBuilds.filter(it => thisYear.test(it));
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
