import * as express from 'express'
import { reserve, getRoomList, validate, listReservation } from '../Controllers/ReservationController';


const reservationRoute = express.Router()

reservationRoute.get('/v1/room',getRoomList)

reservationRoute.post('/v1/reservation/validate',validate)
reservationRoute.post('/v1/reservation/make',reserve)

reservationRoute.get('/v1/reservation/:id/view',reserve)
reservationRoute.get('/v1/reservation/list',listReservation)
reservationRoute.delete('/v1/reservation/:id',reserve)




export { reservationRoute }