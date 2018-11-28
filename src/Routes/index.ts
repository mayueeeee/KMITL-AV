import * as express from 'express'
import { userRoute } from './userRoute'
import {home} from '../Controllers/HomeController'
import {manageRoute} from './manageRoute'
import { reservationRoute } from './reservationRoute';

const routes = express.Router()
routes.get('/',home)
routes.use(userRoute)
routes.use(manageRoute)
routes.use(reservationRoute)

export { routes }
