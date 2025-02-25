import { compareSync, hash } from "bcrypt"
import { randomBytes } from "crypto"
import { SECRET_KEY } from "../config"

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds)
  return { hashed_password: hashedPassword }
}

export const comparePassword = (currentPassword: string, hashPassword: string): boolean =>
  compareSync(currentPassword, hashPassword)
