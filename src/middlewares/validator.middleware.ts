import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { HttpException } from "../handlers/HttpException";
import Errors from "../handlers/ErrorsDictionary";

const validatorMiddleware = (
  input: any,
  prop: "body" | "query" | "params" = "body"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const output = plainToInstance(input, req[prop]);
    const errors = await validate(output);

    if (errors.length > 0) {
      const formattedErrors = errors.map(err => ({
        property: err.property,
        constraints: Object.values(err.constraints || {}).join(". ") // Une los mensajes de cada campo
      }));

      return next(HttpException({
        status: 400,
        code: "ATB001",
        message: "Errores de validación",
        errors: formattedErrors // Devolvemos los errores de forma estructurada
      }));
    }

    next();
  };
};

export default validatorMiddleware;
