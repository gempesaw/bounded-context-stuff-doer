'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var validContexts = ['articles-microsite'];

var coerce = function coerce(context) {
    return validContexts.includes(context);
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

var context = { coerceFn: coerceFn, coerce: coerce };
exports.default = context;