import { makeReservation, getRoomFromType, isTimeAvaliable } from '../Services/reservation';
import { CustomError } from '../Services/errorHandler'
import { Room } from '../Models/Room'

export const reserve = async (req, res, next) => {
  const reserveData = req.body
  try {
    await makeReservation(reserveData.userID, reserveData.RoomID, reserveData.startTime, reserveData.endTime)
    res.json({
      success: true,
      message: 'Reserve success!'
    })
  } catch (e) {
    if (e.name === 'CastError') {
      next(new CustomError('Room not found', 400))
    } else {
      next(e)
    }
  }
}

export const getRoomList = async (req, res, next) => {
  try {
    console.log(req.query)
    const avaliableRoom = await getRoomFromType(req.query.type)
    res.json({
      success: true,
      rooms: avaliableRoom
    })
  } catch (e) {
    console.log(e)
    next(e)
  }
}

export const validate = async (req, res, next) => {
  const reserveData = req.body
  console.log('eieie')
  try {
    console.log(req.body.userID)    
    const canReserve = await isTimeAvaliable(reserveData.room_id,reserveData.start_time,reserveData.end_time)
    // console.log(`muii ${canReserve}`)    
    res.json({
      success: true,
      canReserve: canReserve
    })
  } catch (e) {
    next(e)
  }
}
