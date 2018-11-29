import * as express from 'express'
import * as RoomController from '../Controllers/RoomController'
const manageRoute = express.Router()

// manage room
manageRoute.get('/v1/manage/room',RoomController.getRoom)
manageRoute.get('/v1/manage/room/:id',RoomController.viewRoom)
manageRoute.post('/v1/manage/room',RoomController.addRoom)
manageRoute.patch('/v1/manage/room',RoomController.updateRoom)
manageRoute.delete('/v1/manage/room',RoomController.deleteRoom)



export { manageRoute }