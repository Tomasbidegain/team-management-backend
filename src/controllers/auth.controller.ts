import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { IUser } from "../interfaces/models/IUser";
import { HttpException } from "../handlers/HttpException";
import Errors from "../handlers/ErrorsDictionary";
import { hashPassword, comparePassword } from "../utils/password.utils";
import { PostRegisterDTO } from "../validators/auth.validator";
import { generateJWT } from "../utils/jwt.utils";


// Registro de usuario:
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, first_name, last_name, role_id } = req.body as PostRegisterDTO

    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) throw HttpException(Errors.EMAIL_ALREADY_EXISTS)
    if (!first_name) throw HttpException(Errors.FIRST_NAME_IS_REQUIRED)
    if (!last_name) throw HttpException(Errors.LAST_NAME_IS_REQUIRED)
    if (!email) throw HttpException(Errors.EMAIL_IS_REQUIRED)
    if (!password) throw HttpException(Errors.PASSWORD_IS_REQUIRED)
    if (!role_id) throw HttpException(Errors.ROLE_IS_REQUIRED)

    const { hashed_password } = await hashPassword(password)
    await User.create({
      first_name,
      last_name,
      email,
      password: hashed_password,
      role_id
    })
    res.status(201).json({ message: "User created successfully" })
  }
  catch(error){
    next(error)
  }
}

// Login de usuario
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } });
    if (!user) throw HttpException(Errors.INCORRECT_EMAIL_OR_PASSWORD)
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) throw HttpException(Errors.INCORRECT_EMAIL_OR_PASSWORD)
  
    const token = generateJWT({ id: user.id, role_id: user.role_id })

    res.status(200).json({ token })
  }
  catch(error){
    next(error)
  }
}