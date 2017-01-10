'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _build = require('./lib/build');

var _build2 = _interopRequireDefault(_build);

var _restart = require('./lib/restart');

var _restart2 = _interopRequireDefault(_restart);

var _context = require('./lib/context');

var _context2 = _interopRequireDefault(_context);

var _config = require('./lib/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    current: _context2.default.coerceFn(_build2.default.current),
    newest: _context2.default.coerceFn(_build2.default.newest),
    update: _context2.default.coerceFn(_build2.default.update),
    restart: _context2.default.coerceFn(_restart2.default.queue),
    validateContext: _context2.default.coerce,
    setConfig: _config2.default.set
};