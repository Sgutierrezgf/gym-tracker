"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _exercises = _interopRequireDefault(require("./routes/exercises.routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();

//settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));

// routes
app.get('/', function (req, res) {
  res.json({
    message: 'Hello World!'
  });
});
app.use('/api/v1/exercises', _exercises["default"]);
var _default = exports["default"] = app;