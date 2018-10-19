import * as express from 'express'
import { userRoute } from './userRoute'
import {home} from '../Controllers/HomeController'

const routes = express.Router()
// routes.use(homeRoute, userRoute, videoRoute)
routes.get('/',home)
routes.use(userRoute)

export { routes }
