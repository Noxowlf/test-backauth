"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLoginUser = exports.validateCreateUser = void 0;

var _expressValidator = require("express-validator");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateCreateUser = [(0, _expressValidator.check)('email').exists().not().isEmpty().withMessage('Campo de email vacio').isEmail().withMessage('Formato de email invalido'), (0, _expressValidator.check)('username').isLength({
  min: 4,
  max: 20
}).exists().not().isEmpty().withMessage('Campo de usuario vacio'), (0, _expressValidator.check)('password').isLength({
  min: 4,
  max: 20
}).withMessage('Longitud de contraseña invalida').exists().not().isEmpty().withMessage('Campo de contraseña vacio'), (0, _expressValidator.check)('name').isLength({
  min: 3,
  max: 20
}).exists().not().isEmpty().withMessage('Campo de nombre vacio'), (0, _expressValidator.check)('secondname').isLength({
  min: 3,
  max: 20
}).exists().not().isEmpty().withMessage('Campo de apellido vacio'), (req, res, next) => {
  try {
    (0, _expressValidator.validationResult)(req).throw();
    return next();
  } catch (err) {
    var msg = err.array();
    res.cookie('access-message', msg[0].msg, _config.default.OPTION).redirect('/');
  }
}];
exports.validateCreateUser = validateCreateUser;
var validateLoginUser = [(0, _expressValidator.check)('email').exists().not().isEmpty().withMessage('Campo de email vacio').isEmail().withMessage('Formato de email invalido'), (0, _expressValidator.check)('password').isLength({
  min: 4,
  max: 20
}).withMessage('Longitud de contraseña invalida').exists().not().isEmpty().withMessage('Campo de contraseña vacio'), (req, res, next) => {
  try {
    (0, _expressValidator.validationResult)(req).throw();
    return next();
  } catch (err) {
    var msg = err.array();
    res.cookie('access-message', msg[0].msg, _config.default.OPTION).redirect('/');
  }
}];
exports.validateLoginUser = validateLoginUser;