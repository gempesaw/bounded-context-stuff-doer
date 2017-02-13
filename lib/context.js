import config from '~/lib/config';

const validContexts = [
    'articles-microsite',
    'slideshows-microsite',
    'health-guides-microsite',
    'health-guides-api',
    'quizzes-api'
];

const getContexts = () => validContexts;

const getDetails = (context) => {
    if (/-api$/.test(context)) {
        return {
            env: config.apiEnv,
            box: config.apiBox,
            context
        };
    }

    if (/-microsite$/.test(context)) {
        return {
            env: config.siteEnv,
            box: config.siteBox,
            context
        };
    }

    return Error(`Somehow, we couldn't suss out the details for ${context}`);
};

const coerce = (context) => getContexts().includes(context);

function coerceFn(fn) {
    return function (...args) {
        const context = args[0];
        if (coerce(context)) {
            return fn(...args);
        }
        else {
            return new Error(`Invalid context: ${context}`);
        }
    };
}

const context = { coerceFn, coerce, getDetails, getContexts };
export default context;
