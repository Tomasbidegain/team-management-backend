import { IHttpException } from "../interfaces/global/IHttpsExeption";

export const HttpException = (error: IHttpException): IHttpException => error;
