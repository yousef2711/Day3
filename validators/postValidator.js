const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(5).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "string.min": "Title must be at least 5 characters",
    "any.required": "Title is required",
  }),
  content: Joi.string().min(10).required().messages({
    "string.base": "Content must be a string",
    "string.empty": "Content is required",
    "string.min": "Content must be at least 10 characters",
    "any.required": "Content is required",
  }),
  category: Joi.string()
    .valid("Tech", "Life", "Health", "Education")
    .default("Life")
    .messages({
      "any.only": "Category must be one of Tech, Life, Health, Education",
    }),
  // author is set from the authenticated user (server-side)
}).options({
  abortEarly: false,
  allowUnknown: false,
});

module.exports = postSchema;
