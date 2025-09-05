"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var exerciseSchema = new _mongoose.Schema({
  type: String,
  title: String,
  reps: Number,
  weight: Number
}, {
  versionKey: false,
  timestamps: true
});
exerciseSchema.plugin(_mongoosePaginateV["default"]);
var _default = exports["default"] = (0, _mongoose.model)('Exercise', exerciseSchema);