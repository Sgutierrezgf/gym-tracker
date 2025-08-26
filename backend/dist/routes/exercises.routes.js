"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _exercises = require("../controllers/exercises.controller");
var router = (0, _express.Router)();
router.get('/', _exercises.findAllExercises);
router.post('/', _exercises.createExercise);
router.get('/:id', _exercises.findOneExercise);
router["delete"]('/:id', _exercises.deleteExercise);
var _default = exports["default"] = router;