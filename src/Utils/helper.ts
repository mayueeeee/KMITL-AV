import * as dotenv from 'dotenv'
dotenv.config()

export const getENV = (key: string) => {
  return process.env[key]
}
