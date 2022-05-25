import { IErrorData } from "../interfaces/errors/IErrorData";

interface IJoiErrorDetails
  extends Array<{
    path: string[];
    message: string;
    type: string;
    context: {
      key: string;
      label: string;
    };
  }> {}

class JoiErrorAdapter {
  handle(joiErrorObject: any): IErrorData[] {
    const details: IJoiErrorDetails = joiErrorObject.details;

    const errors = details.map(val => {
      const {
        path,
        message,
        type,
        context: { key, label }
      } = val;

      return { message, key, label, type, path: path.join(".") };
    }, {});

    return errors;
  }
}

export const joiErrorAdapter = new JoiErrorAdapter();
