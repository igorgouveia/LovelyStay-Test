import {
  nicknameParamValidation,
} from "../validation/paramValidation";
import { ReqValidatorMiddleware } from "./req.validation.middleware";

export const nicknameParamMiddleware = new ReqValidatorMiddleware(
  nicknameParamValidation,
  "params"
);

