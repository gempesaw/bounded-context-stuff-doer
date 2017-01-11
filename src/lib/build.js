'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

// String -> Either[String, Error]
var getCurrentBuild = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "articles-microsite";
        var res, matches;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _http2.default.getFromAdminUi(currentUri(context));

                    case 3:
                        res = _context.sent;
                        matches = res.match(/value="(.*?)"/);

                        if (!(matches && matches[1])) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt('return', matches[1]);

                    case 9:
                        (0, _log2.default)(matches, 'getCurrentBuild(' + context + ')');
                        return _context.abrupt('return', new Error('Sorry, could not find a build number'));

                    case 11:
                        _context.next = 17;
                        break;

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](0);

                        (0, _log2.default)(_context.t0, _context.t0.stack);
                        return _context.abrupt('return', _context.t0);

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 13]]);
    }));

    return function getCurrentBuild() {
        return _ref.apply(this, arguments);
    };
}();

// String -> Either[String, Error]
var getNewestBuild = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "articles-microsite";
        var res, newBuild;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _http2.default.getFromAdminUi(newestUri(context));

                    case 3:
                        res = _context2.sent;
                        newBuild = parseNewBuilds(res);
                        return _context2.abrupt('return', newBuild);

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](0);

                        (0, _log2.default)(_context2.t0, _context2.t0.stack);
                        return _context2.abrupt('return', _context2.t0);

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 8]]);
    }));

    return function getNewestBuild() {
        return _ref2.apply(this, arguments);
    };
}();

// (String, String) -> Either[String, Error]
var updateBuild = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "articles-microsite";
        var build = arguments[1];
        var uri, updated;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        uri = updateUri(context, build);
                        _context3.next = 4;
                        return _http2.default.getFromAdminUi(uri);

                    case 4:
                        updated = _context3.sent;

                        if (!(updated && /Record updated:/.test(updated))) {
                            _context3.next = 10;
                            break;
                        }

                        (0, _log2.default)('Build Update Success: ' + updated);
                        return _context3.abrupt('return', updated);

                    case 10:
                        (0, _log2.default)('Build Update failure: ' + updated, 'updateBuild(' + context + ', ' + build + ')');
                        return _context3.abrupt('return', new Error('Uhh, weird'));

                    case 12:
                        _context3.next = 18;
                        break;

                    case 14:
                        _context3.prev = 14;
                        _context3.t0 = _context3['catch'](0);

                        (0, _log2.default)(_context3.t0, _context3.t0.stack);
                        return _context3.abrupt('return', _context3.t0);

                    case 18:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[0, 14]]);
    }));

    return function updateBuild() {
        return _ref3.apply(this, arguments);
    };
}();

var _xmldoc = require('xmldoc');

var _xmldoc2 = _interopRequireDefault(_xmldoc);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var currentUri = function currentUri(context) {
    return '/builds/get?env=kms&product=' + context + '&site=sc';
};

var newestUri = function newestUri(context) {
    return '/builds/getBuildFileList?site=sc&buildpath=builds/' + context + '/rc/';
};

var updateUri = function updateUri(context, build) {
    return '/builds/update?site=sc&env=kms&product=' + context + '&bucket=kms-' + context + '-build&build=' + build;
};

function parseNewBuilds(xml) {
    var builds = new _xmldoc2.default.XmlDocument(xml);

    var timestampRegex = new RegExp('_(' + new Date().getUTCFullYear() + '.*)');

    var newBuilds = [];
    builds.eachChild(function (child, index, array) {
        var build = child.children[1].val;
        var timestamp = (build.match(timestampRegex) || [,])[1];
        var time = (0, _moment2.default)(timestamp, 'YYYY-MM-DD_HH-mm-ss-Z');
        if (build && time.isValid()) {
            newBuilds.push({ build: build, time: time });
        }
    });

    var sorted = newBuilds.sort(function (a, b) {
        return a.time - b.time;
    });
    if (sorted && sorted.length) {
        return sorted[sorted.length - 1].build;
    } else {
        (0, _log2.default)(sorted, 'parseNewBuilds()');
        return new Error('Could not find newest build number');
    }
}

var build = {
    current: getCurrentBuild,
    newest: getNewestBuild,
    update: updateBuild,
    currentUri: currentUri,
    newestUri: newestUri,
    updateUri: updateUri
};

exports.default = build;