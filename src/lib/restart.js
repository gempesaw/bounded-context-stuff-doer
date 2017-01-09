'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var queue = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'articles-microsite';
        var boxIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config2.default.defaultBox;
        var restarted;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _http2.default.getFromAdminUi(uri(context, boxIds));

                    case 3:
                        restarted = _context.sent;

                        if (!(restarted && /queued/.test(restarted))) {
                            _context.next = 9;
                            break;
                        }

                        (0, _log2.default)('Success: ' + restarted);
                        return _context.abrupt('return', restarted);

                    case 9:
                        (0, _log2.default)(restarted);
                        return _context.abrupt('return', new Error('bye from restartBoundedContext'));

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

    return function queue() {
        return _ref.apply(this, arguments);
    };
}();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var uri = function uri(context, boxIds) {
    return '/services/control?action=restart&service=sc-kms-' + context + '&site=&ids=' + boxIds;
};


var restart = { queue: queue, uri: uri };
exports.default = restart;