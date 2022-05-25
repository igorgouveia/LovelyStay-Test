import Joi from "joi";
import { objectIdSchema } from "./objectIdSchema";

export const nicknameParamValidation = Joi.object({
  nickname: objectIdSchema().required().label("nickname")
});

export const locationParamValidation = Joi.object({
  location: objectIdSchema().required().label("location")
});
