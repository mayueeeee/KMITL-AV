import * as dotenv from 'dotenv'
dotenv.config()

export const getENV = (key: string) => {
  return process.env[key]
}

export const getServerPort = () =>  (this.getENV('PRODUCTION') === '1') ? this.getENV('SERVICE_PORT'): 3000