"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.get('/', _middlewares.verifyMessage, (req, res) => {
  res.render('index.html', {
    user: 0,
    msg: req.msg
  });
});
router.get('/profile', _middlewares.verifyMessage, _middlewares.verifyToken, (req, res) => {
  res.render('profile.html', {
    user: req.user,
    msg: req.msg
  });
});
var _default = router;
exports.default = _default;