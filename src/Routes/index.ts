import * as express from 'express'
import { userRoute } from './userRoute'

const routes = express.Router()
// routes.use(homeRoute, userRoute, videoRoute)
routes.use(userRoute)

export { routes }
