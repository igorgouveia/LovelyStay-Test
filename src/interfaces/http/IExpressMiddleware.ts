import { NextFunction, Request, Response } from "express";

export interface IExpressMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void;
}
