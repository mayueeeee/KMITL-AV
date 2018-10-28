import * as Sentry from '@sentry/node'
import { HTTP} from '../constants/http';
export const ExpressErrorHandler = (err, req, res, next) => {
  Sentry.captureException(err)
  res.status(HTTP.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something broke!'
  })
}

export class CustomError extends Error{
  code:HTTP
  message:string
  
  constructor(message:string,code?:HTTP){
    super(message)
    this.code = code
  }
}