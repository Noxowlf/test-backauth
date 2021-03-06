"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var token = req.cookies["x-access-token"];
      if (!token) return res.cookie('access-message', "No ha iniciado sesión", _config.default.OPTION).redirect('/');

      var decoded = _jsonwebtoken.default.verify(token, _config.default.SECRET);

      var user = yield _user.default.findById(decoded.id, {
        password: 0
      }).populate('roles');
      if (!user) return res.cookie('access-message', "Usuario no encontrado", _config.default.OPTION).redirect('/');
      req.user = user;
      next();
    } catch (error) {
      return res.cookie('access-message', "Desautorizado", _config.default.OPTION).redirect('/');
    }
  });

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;