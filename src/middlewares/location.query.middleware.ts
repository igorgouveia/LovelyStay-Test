import { locationParamValidation } from "../validation/paramValidation";
import { ReqValidatorMiddleware } from "./req.validation.middleware";

export const locationQueryParamMiddleware = new ReqValidatorMiddleware(
  locationParamValidation,
  "query"    
);
