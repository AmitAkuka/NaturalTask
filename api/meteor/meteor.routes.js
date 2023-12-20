const express = require("express");
const router = express.Router();
const {
  getMeteors,
  getMeteorById,
  deleteMeteorById,
} = require("./meteor.controller");

router.get("/", getMeteors);
router.get("/:id", getMeteorById);
router.delete("/:id", deleteMeteorById);

module.exports = router;
