import { NextFunction, Request, Response } from "express";

export interface IExpressMiddleware {
    handle(req: Request, res: Response, next: NextFunction): void;
  }
  
  export interface IResponseAdpater<ResponseType> {
    handle(statusCode: number, data?: any): ResponseType;
  }
  