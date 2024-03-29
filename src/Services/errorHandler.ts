import * as Sentry from '@sentry/node'
import { HTTP} from '../constants/http';
export const ExpressErrorHandler = (err, req, res, next) => {
  // console.log(err)
  if(err.message==="jwt expired"){
    res.status(HTTP.UNAUTHORIZED).json({
      success: false,
      message:  err.message
    })
  }
  else{
    res.status(err.code||HTTP.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:  err.message||'Something broke!'
    })
  }

  
  Sentry.captureException(err)
  
}

export class CustomError extends Error{
  code:HTTP
  message:string
  
  constructor(message:string,code?:HTTP){
    super(message)
    this.code = code
  }
}