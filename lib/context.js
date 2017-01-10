const validContexts = [
    'articles-microsite'
];

const coerce = (context) => validContexts.includes(context);
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

const context = { coerceFn, coerce };
export default context;
