import Joi from "joi";

export function objectIdSchema(): Joi.StringSchema {
  return Joi.string()
    .pattern(/[a-z0-9]/)
    .messages({
      "string.pattern.base": "The {{#label}} must be a valid objectId."
    });
}
