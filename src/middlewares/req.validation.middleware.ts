import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { IExpressMiddleware } from "../interfaces/http/IExpressMiddleware";
import { ExpressResponseAdapter } from "../adapters/ExpressResponseAdapter";

export class ReqValidatorMiddleware implements IExpressMiddleware {
  constructor(
    private validation: Joi.Schema,
    private propName: "body" | "query" | "params" = "body"
  ) { }

  async unboundHandle(
    this: ReqValidatorMiddleware,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req[this.propName])
      await this.validation.validate(req[this.propName], {
        abortEarly: true
      });

      return next();
    } catch (e) {
      return new ExpressResponseAdapter(res).handle(400, e);
    }
  }

  get handle() {
    return this.unboundHandle.bind(this);
  }
}
