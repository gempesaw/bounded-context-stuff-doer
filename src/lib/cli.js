'use strict';

var bindYourContext = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(context) {
        var currentBuild, newestBuild;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('CONTEXT: ' + context);
                        _context2.next = 3;
                        return _build2.default.current(context);

                    case 3:
                        currentBuild = _context2.sent;
                        _context2.next = 6;
                        return _build2.default.newest(context);

                    case 6:
                        newestBuild = _context2.sent;


                        console.log('Current Build: ' + currentBuild + '\nNewest Build:  ' + newestBuild);
                        if (currentBuild === newestBuild) {
                            console.log('The newest build is already deployeed; bye');
                            process.exit(0);
                        } else {
                            console.log('Update build number and deploy?');
                            _prompt2.default.get(['confirm'], function () {
                                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, result) {
                                    var updated, _restart;

                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!(result.confirm === 'y')) {
                                                        _context.next = 7;
                                                        break;
                                                    }

                                                    _context.next = 3;
                                                    return _build2.default.update(newestBuild, context);

                                                case 3:
                                                    updated = _context.sent;
                                                    _context.next = 6;
                                                    return _restart.queue(context);

                                                case 6:
                                                    _restart = _context.sent;

                                                case 7:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                }));

                                return function (_x2, _x3) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                        };

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function bindYourContext(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

var _restart2 = require('./restart');

var _restart3 = _interopRequireDefault(_restart2);

var _context3 = require('./context');

var _context4 = _interopRequireDefault(_context3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (_config2.default.username === 'USERNAME' || _config2.default.password === 'PASSWORD') {
    console.log('Please update your credentials in lib/config.js and try again.');
    process.exit(0);
}

var args = process.argv.slice(2); // first two items are node
// binary, then node filename
var userContext = args[0] || 'articles-microsite';
var ret = _context4.default.coerceFn(bindYourContext)(userContext);

if (ret instanceof Error) {
    console.log(ret);
    process.exit(0);
}