import { NextFunction } from "express"
import { RequestWithUser } from "../interfaces/request/IRequestWithUser"
import { HttpException } from "../handlers/HttpException"
import Errors from "../handlers/ErrorsDictionary"
import { verifyJWT } from "../utils/jwt.utils"

export const authMiddleware = (req: RequestWithUser, _: Response, next: NextFunction) => {
  try {
    let payload: any
    const authorization: string | any = req.header('Authorization') ? req.header('Authorization')?.split('Bearer ')[1] : null
    if (!authorization) throw HttpException(Errors.AUTH_TOKEN_MISSING)
    try {
      payload = verifyJWT(authorization)
      req.userId = payload.id
      req.roleId = payload.role_id
    } catch {
      throw HttpException(Errors.AUTH_TOKEN_MISSING)
    }
    next()
  } catch (error) {
    next(error)
  }
}