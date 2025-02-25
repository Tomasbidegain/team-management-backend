import { NODE_ENV } from '../config'
import { NextFunction, Request, Response } from 'express'
import { IHttpException } from '../interfaces/global/IHttpsExeption';

const errorMiddleware = (error: IHttpException, _: Request, res: Response, next: NextFunction) => {
  try {
    if (NODE_ENV === 'development') console.info(error)
    const { status, message, code, errors } = error
    res.status(status || 500).json({ status: status || 500, message: message || 'Something went wrong', code, errors: errors || null })
  } catch (error) {
    next(error)
  }
}

export default errorMiddleware