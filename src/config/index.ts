import { config } from 'dotenv'

config()

if (!process.env.PORT) {
  console.error('==> No PORT provided in .env file')
  process.exit(1)
}

if (!process.env.SECRET_KEY) {
  console.error('==> No SECRET_KEY provided in .env file')
  process.exit(1)
}

export const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  SECRET_KEY,
  NODE_ENV,
  TOKEN_EXPIRATION,
} = process.env