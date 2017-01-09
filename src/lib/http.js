'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFromAdminUi(path) {
    var request = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _requestPromiseNative2.default;

    (0, _log2.default)('GET ' + path);

    // `Buffer.from` is preferred in newer nodes > 6.0, but 4.3.2
    // crashes out on `Buffer.from`, and all of our microsites use
    // 4.3.2. Since >6.0 can handle `new Buffer` at time of writing,
    // we use this deprecated version to accomodate both.
    var auth = new Buffer(_config2.default.username + ':' + _config2.default.password).toString('base64');
    var headers = { Authorization: 'Basic ' + auth };

    return request({
        uri: '' + _config2.default.base + path,
        headers: headers,
        rejectUnauthorized: false,
        agent: false
    });
}

var http = { getFromAdminUi: getFromAdminUi };
exports.default = http;