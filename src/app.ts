import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as Sentry from '@sentry/node'
import { getENV, getServerPort } from './Utils/helper'
import {ExpressErrorHandler} from './Services/errorHandler'
import * as db from './database/connection'
import { routes } from './Routes'


const app = express()
db.connect()
Sentry.init({ dsn: getENV('SENTRY_KEY') })
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler)
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.listen(getServerPort(), () => console.log(`API listening on port ` + getServerPort()))

app.use('/', routes)

app.use(ExpressErrorHandler)

export default app
