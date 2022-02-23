"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyMessage = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyMessage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var msg = req.cookies["access-message"];

      if (msg) {
        req.msg = msg;
        res.clearCookie('access-message');
      }

      next();
    } catch (error) {
      console.log(error);
    }
  });

  return function verifyMessage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyMessage = verifyMessage;