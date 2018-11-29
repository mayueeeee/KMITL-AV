import * as dotenv from 'dotenv'
dotenv.config()

export const getENV = (key: string) => {
  return process.env[key]
}

export const getServerPort = () =>  (this.getENV('PRODUCTION') === '1') ? this.getENV('SERVICE_PORT'): 3000

// export const signToken = (id: string, expIn: number, opt = {}) => {
//   const date = getDateTime()
//   return jwt.sign({
//     id: id,
//     createAt: date,
//     expAt: date.add(expIn, 'days'),
//     ...opt
//   }, getENV('JWT_SECRET'))
// }