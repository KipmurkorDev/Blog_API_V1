const Joi = require("joi");
const mongoose = require("mongoose");
const blogJoiSchema = Joi.object({
  title: Joi.string().min(4).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Please provide a title",
    "string.min": "Title must be at least {#limit} characters long",
    "any.required": "Please provide a title",
  }),
  content: Joi.string().required().messages({
    "string.base": "Content must be a string",
    "string.empty": "Please provide content",
    "any.required": "Please provide content",
  }),
  author: Joi.string().required().messages({
    "any.required": "Author is required",
  }),
  likes: Joi.array().items(Joi.string()).messages({
    "array.base": "Likes must be an array",
  }),
  likeCount: Joi.number().integer().min(0).default(0).messages({
    "number.base": "LikeCount must be a number",
    "number.integer": "LikeCount must be an integer",
    "number.min": "LikeCount must be at least {#limit}",
  }),
});

const commentJoiSchema = Joi.object({
  blog: Joi.string().required().messages({
    "any.required": "Blog ID is required",
  }),
  user_info: Joi.string().required().messages({
    "any.required": "User Info ID is required",
  }),
  comment: Joi.string().required().messages({
    "string.base": "Comment must be a string",
    "string.empty": "Please provide a comment",
    "any.required": "Please provide a comment",
  }),
});

module.exports = {
  blogJoiSchema,
  commentJoiSchema,
};
