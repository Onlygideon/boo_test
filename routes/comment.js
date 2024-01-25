"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/comment.js");
const validator = require("../lib/validator.js");
const schema = require("../utils/helpers.js");

module.exports = function () {
  router.get("/:userId", async (req, res) => {
    await controller.fetchComments(req, res);
  });

  router.post("/", validator.validate(schema.addComment), async (req, res) => {
    await controller.createComment(req, res);
  });

  router.put(
    "/like",
    validator.validate(schema.rateComment),
    async (req, res) => {
      await controller.likeComment(req, res);
    }
  );

  router.put(
    "/unlike",
    validator.validate(schema.rateComment),
    async (req, res) => {
      await controller.unlikeComment(req, res);
    }
  );

  return router;
};
