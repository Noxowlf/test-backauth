"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _view = _interopRequireDefault(require("./routes/view.routes"));

var _initialSeed = require("./libs/initialSeed");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
(0, _initialSeed.createRoles)();
(0, _initialSeed.createAdmin)(); // Settings

app.set("port", process.env.PORT || 3000);
app.set('views', _path.default.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs'); // Middlewares

app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)()); // Routes

app.use('/auth', _auth.default);
app.use('/user', _user.default);
app.use('/', _view.default); // Static files

app.use(_express.default.static(_path.default.join(__dirname, 'files')));
var _default = app;
exports.default = _default;