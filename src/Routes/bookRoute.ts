import * as bookingController from '../Controllers/bookingController'
const express =require('express')
const bookRoute = express.Router()

bookRoute.post('/v1/booking',bookingController.booking)
bookRoute.post('/v1/checSeat',bookingController.checkSeat)

export { bookRoute }