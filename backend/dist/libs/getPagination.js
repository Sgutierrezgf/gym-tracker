"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagination = void 0;
var getPagination = exports.getPagination = function getPagination(page, size) {
  var limit = size ? +size : 10;
  var offset = page ? page * limit : 0;
  return {
    limit: limit,
    offset: offset
  };
};