"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = exports.logOut = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _role = _interopRequireDefault(require("../models/role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
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
      var userFound = yield _user.default.find({
        $or: [{
          username
        }, {
          email
        }]
      });

      if (userFound.length == 0) {
        var newUser = new _user.default({
          username,
          email,
          password: yield _user.default.encryptPassword(password),
          name,
          secondname
        });

        if (req.body.roles) {
          var foundRoles = yield _role.default.find({
            name: {
              $in: roles
            }
          });
          newUser.roles = foundRoles.map(role => role._id);
        } else {
          var role = yield _role.default.findOne({
            name: "client"
          });
          newUser.roles = [role._id];
        }

        var savedUser = yield newUser.save();

        var token = _jsonwebtoken.default.sign({
          id: savedUser._id
        }, _config.default.SECRET, {
          expiresIn: 300
        });

        console.log('Account has been created');
        return res.cookie('x-access-token', token, _config.default.OPTION).redirect('/profile');
      } else {
        console.log('Account already exist');
        return res.cookie('access-message', "Email o usuario ya existe", _config.default.OPTION).redirect('/');
      }
    } catch (error) {
      console.log(error);
      return res.redirect('/');
    }
  });

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = yield _user.default.findOne({
        email: req.body.email
      }).populate('roles');

      if (!userFound) {
        console.log('Email not match');
        res.cookie('access-message', "Email no coincide", _config.default.OPTION).redirect('/');
      } else {
        var matchPassword = yield _user.default.comparePassword(req.body.password, userFound.password);

        if (!matchPassword) {
          return res.cookie('access-message', "Contraseña incorrecta", _config.default.OPTION).redirect('/');
        }

        var token = _jsonwebtoken.default.sign({
          id: userFound._id
        }, _config.default.SECRET, {
          expiresIn: 300
        });

        console.log('User connected succesfully');
        return res.cookie('x-access-token', token, _config.default.OPTION).redirect('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  });

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var logOut = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      return res.clearCookie('x-access-token').redirect('/');
    } catch (error) {
      console.log(error);
    }
  });

  return function logOut(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.logOut = logOut;