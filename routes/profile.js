"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/profile.js");
const validator = require("../lib/validator.js");
const schema = require("../utils/helpers.js");


module.exports = function () {
  router.get("/:id", async (req, res) => {
    await controller.fetchSpecificProfile(req, res);
  });

  router.post("/", validator.validate(schema.addProfile), async (req, res) => {
    await controller.createProfile(req, res);
  });

  return router;
};
