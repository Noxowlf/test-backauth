"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoles = exports.createAdmin = void 0;

var _role = _interopRequireDefault(require("../models/role"));

var _user = _interopRequireDefault(require("../models/user"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      var count = yield _role.default.estimatedDocumentCount();
      if (count > 0) return;
      var values = yield Promise.all([new _role.default({
        name: "client"
      }).save(), new _role.default({
        name: "admin"
      }).save()]);
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  });

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;

var createAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    var user = yield _user.default.findOne({
      email: "admin@admin.com"
    });
    var roles = yield _role.default.find({
      name: {
        $in: ["admin"]
      }
    });

    if (!user) {
      yield _user.default.create({
        username: "admin",
        email: "admin@admin.com",
        password: yield _bcryptjs.default.hash("admin", 10),
        name: "Lorem",
        secondname: "Ipsum",
        roles: roles.map(role => role._id)
      });
      console.log('Admin User Created!');
    }
  });

  return function createAdmin() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createAdmin = createAdmin;