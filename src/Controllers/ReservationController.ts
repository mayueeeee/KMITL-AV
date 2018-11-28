import { makeReservation, getRoomFromType } from '../Services/reservation'
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
  try {
    // await makeReservation(reserveData.userID, reserveData.RoomID, reserveData.startTime, reserveData.endTime)
    // let reservation = await Room.findById(reserveData.room_id)
    //  console.log('validate')
    //  console.log(reservation)
    res.json({
      success: true,
      canReserve: false,
      reason: 'เต็มละจ้า5555'
    })
  } catch (e) {
    if (e.name === 'CastError') {
      next(new CustomError('Room not found', 400))
    } else {
      next(e)
    }
  }
}
