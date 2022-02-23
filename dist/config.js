"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb+srv://noxowlf:MymongodbSlf@cluster0.hnicg.mongodb.net/backauthdb?retryWrites=true&w=majority",
  PORT: process.env.PORT || 3000,
  SECRET: 'auth-api',
  OPTION: {
    path: "/",
    sameSite: true,
    maxAge: 1000 * 60 * 5,
    // would expire after 24 hours
    httpOnly: true // The cookie only accessible by the web server

  }
};
exports.default = _default;