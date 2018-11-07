import * as express from 'express'
import { userRoute } from './userRoute'
import {home} from '../Controllers/HomeController'
import { bookRoute } from './bookRoute'

const routes = express.Router()
// routes.use(homeRoute, userRoute, videoRoute)
routes.get('/',home)
routes.use(userRoute)
routes.use(bookRoute)

export { routes }
