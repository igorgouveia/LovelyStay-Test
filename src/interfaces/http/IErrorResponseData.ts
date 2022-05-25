import { IErrorData } from "../errors/IErrorData";

export interface IErrorResponseData {
  message: string;
  errors: IErrorData[];
}
