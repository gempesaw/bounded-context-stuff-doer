'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = log;

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function log(msg) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (_config2.default.debug) {
        console.log(msg, context);
    }
}