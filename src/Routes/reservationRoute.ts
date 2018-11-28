import * as express from 'express'
import { reserve, getRoomList, validate } from '../Controllers/ReservationController';


const reservationRoute = express.Router()

reservationRoute.get('/v1/room',getRoomList)

reservationRoute.post('/v1/reservation/validate',validate)
reservationRoute.post('/v1/reservation/make',reserve)

reservationRoute.get('/v1/reservation/:id',reserve)
reservationRoute.delete('/v1/reservation/:id',reserve)




export { reservationRoute }