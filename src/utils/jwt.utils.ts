import { sign, verify } from 'jsonwebtoken'
import { SECRET_KEY, TOKEN_EXPIRATION } from '../config'

export const generateJWT = (payload: any) =>
  sign(payload, SECRET_KEY!, { expiresIn: parseInt(TOKEN_EXPIRATION || '3600') })

export const verifyJWT = (token: string): any => verify(token, SECRET_KEY!)
