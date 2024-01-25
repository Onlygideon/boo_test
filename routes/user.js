"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/user.js");
const validator = require("../lib/validator.js");
const schema = require("../utils/helpers.js");

module.exports = function () {
  router.post("/", validator.validate(schema.addUser), async (req, res) => {
    await controller.createUser(req, res);
  });

  return router;
};
