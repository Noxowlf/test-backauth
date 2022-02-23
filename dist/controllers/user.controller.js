"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modify = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _role = _interopRequireDefault(require("../models/role"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var modify = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        username,
        email,
        password,
        name,
        secondname,
        roles
      } = req.body;
      var userFound = yield _user.default.findOne({
        email: req.user.email
      }).populate('roles');

      if (!userFound) {
        console.log('User not connected');
        res.cookie('access-message', "Account not connected", _config.default.OPTION).redirect('/');
      } else {
        var matchPassword = yield _user.default.comparePassword(req.body.currentpassword, userFound.password);

        if (!matchPassword) {
          return res.cookie('access-message', "Contraseña incorrecta", _config.default.OPTION).redirect('/profile');
        }

        var update = yield _user.default.update({
          _id: userFound._id
        }, {
          username,
          email,
          password: yield _user.default.encryptPassword(password),
          name,
          secondname,
          roles: userFound.roles
        });
        console.log('User modifying succesfully');
        console.log(userFound.roles);
        return res.cookie('access-message', "Usuario modificado correctamente", _config.default.OPTION).redirect('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  });

  return function modify(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.modify = modify;