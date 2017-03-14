'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validContexts = ['articles-microsite', 'slideshows-microsite', 'health-guides-microsite', 'health-guides-api', 'redirects-api', 'quizzes-api'];

var getContexts = function getContexts() {
    return validContexts;
};

var getDetails = function getDetails(context) {
    if (/-api$/.test(context)) {
        return {
            env: _config2.default.apiEnv,
            box: _config2.default.apiBox,
            context: context
        };
    }

    if (/-microsite$/.test(context)) {
        return {
            env: _config2.default.siteEnv,
            box: _config2.default.siteBox,
            context: context
        };
    }

    return Error('Somehow, we couldn\'t suss out the details for ' + context);
};

var coerce = function coerce(context) {
    return getContexts().includes(context);
};

function coerceFn(fn) {
    return function () {
        var context = arguments.length <= 0 ? undefined : arguments[0];
        if (coerce(context)) {
            return fn.apply(undefined, arguments);
        } else {
            return new Error('Invalid context: ' + context);
        }
    };
}

var context = { coerceFn: coerceFn, coerce: coerce, getDetails: getDetails, getContexts: getContexts };
exports.default = context;