import * as express from 'express'
import { userRoute } from './userRoute'
import {home} from '../Controllers/HomeController'
import {manageRoute} from './manageRoute'
import { reservationRoute } from './reservationRoute';
import { validateToken } from '../Controllers/UserController';

const routes = express.Router()
routes.get('/',home)
routes.use(userRoute)
routes.use(validateToken)


routes.use(manageRoute)
routes.use(reservationRoute)

export { routes }
