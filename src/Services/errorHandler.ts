import * as Sentry from '@sentry/node'
import { HTTP } from '../constants/http'
export const ExpressErrorHandler = (err, req, res, next) => {
  Sentry.captureException(err)
  res.status(HTTP.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something broke!'
  })
}
