import { Response } from "express";
import { IErrorResponseData } from "../interfaces/http/IErrorResponseData";
import { IResponseAdpater } from "../interfaces/interfaces";
import { joiErrorAdapter } from "./JoiErrorAdapter";

export class ExpressResponseAdapter implements IResponseAdpater<Response> {
  constructor(public res: Response) {}

  handle400(data: any): Response<IErrorResponseData> {
    if (data.details) {
      return (this.res as Response<IErrorResponseData>).status(400).json({
        message: "Validation Error.",
        errors: joiErrorAdapter.handle(data)
      });
    }

    return (this.res as Response<IErrorResponseData>).status(400).json({
      message: "Request Error.",
      errors: [
        {
          message: data.message,
          key: "custom",
          type: "system.request.custom",
          label: "Request Error",
          path: "_.request.custom"
        }
      ]
    });
  }

  handle403(data?: Error): Response<IErrorResponseData> {
    const resData = {
      message: "Forbidden Error.",
      errors: [
        {
          message: data?.message || "You are not allowed to access this route.",
          key: "forbidden",
          type: "system.forbidden",
          label: "Forbidden Error",
          path: "_.forbidden"
        }
      ]
    };

    if (data) {
      resData.errors[0].message = data.message;
    }

    return (this.res as Response<IErrorResponseData>).status(403).json(resData);
  }

  handle404(data?: Error): Response<IErrorResponseData> {
    const resData = {
      message: "Not Found Error.",
      errors: [
        {
          message: "Not Found Error.",
          key: "custom",
          type: "system.notFound.custom",
          label: "Not Found Error",
          path: "_.notFound.custom"
        }
      ]
    };

    if (data) {
      resData.errors[0].message = data.message;
    }

    return (this.res as Response<IErrorResponseData>).status(404).json(resData);
  }

  handle500(data?: Error): Response<IErrorResponseData> {
    const resData = {
      message: "Server Error.",
      errors: [
        {
          message:  "Server Error.",
          key: "server",
          type: "system.server",
          label: "Server Error",
          path: "_.server"
        }
      ]
    };

    if (data) {
      resData.errors[0].message = data.message;
    }

    return (this.res as Response<IErrorResponseData>).status(500).json(resData);
  }

  handle(statusCode: number, data?: any): Response<IErrorResponseData | any> {
    const handlers: Record<number, Function> = {
      400: this.handle400.bind(this),
      403: this.handle403.bind(this),
      404: this.handle404.bind(this),
      500: this.handle500.bind(this)
    };

    if (handlers[statusCode]) {
      return handlers[statusCode](data);
    }

    if (data) {
      return this.res.status(statusCode).json(data);
    }

    return this.res.status(statusCode).send();
  }
}
