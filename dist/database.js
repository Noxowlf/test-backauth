"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(_config.default.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => console.log('db is connected')).catch(error => console.log(error));