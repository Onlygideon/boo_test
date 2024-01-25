const Joi = require("joi");

const addProfile = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  mbti: Joi.string().required(),
  enneagram: Joi.string().required(),
  variant: Joi.string().required(),
  tritype: Joi.number().required(),
  socionics: Joi.string().required(),
  sloan: Joi.string().required(),
  psyche: Joi.string().required(),
});

const addUser = Joi.object({
  name: Joi.string().required(),
});

const addComment = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  comment: Joi.string().required(),
});

const rateComment = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  commentId: Joi.string().hex().length(24).required(),
});

module.exports = {
  addProfile,
  addUser,
  addComment,
  rateComment,
};
