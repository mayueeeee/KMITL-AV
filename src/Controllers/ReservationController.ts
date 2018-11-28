import { makeReservation, getRoomFromType, isTimeAvaliable } from '../Services/reservation'
import { CustomError } from '../Services/errorHandler'
import { Room } from '../Models/Room'
import { Transaction } from '../Models/Transaction'

export const reserve = async (req, res, next) => {
  const reserveData = req.body
  try {
    const canReserve = await isTimeAvaliable(reserveData.room_id, reserveData.start_time, reserveData.end_time)
    if (canReserve) {
      const room = await makeReservation(reserveData.userID, reserveData.room_id, reserveData.start_time, reserveData.end_time)
      if (room) {
        res.json({
          success: true,
          message: 'Reserve success!'
        })
      }
    } else {
      res.json({
        success: false,
        message: "Select time isn't avaliable"
      })
    }
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
  // console.log('eieie')
  try {
    // console.log(req.body.userID)
    const canReserve = await isTimeAvaliable(reserveData.room_id, reserveData.start_time, reserveData.end_time)
    // console.log(`muii ${canReserve}`)
    res.json({
      success: true,
      canReserve: canReserve
    })
  } catch (e) {
    next(e)
  }
}

export const listReservation = async (req, res, next) => {
  try {
    const reserveList = await Transaction.find({ userID: req.body.userID }).select('-userID -updatedAt -startTime')

    let finalList = []
    for (let j = 0; j < reserveList.length; j++) {
      const room = await Room.findById(reserveList[j].roomID)
      for (let i = 0; i < room.reservation.length; i++) {
        if (room.reservation[i]._id.toString() === reserveList[j].reservationID.toString()) {          
          let yay = { ...room.reservation[i]._doc,name:room.name, type: room.type,createAt:reserveList[j].createdAt }         
          finalList.push(yay)
        }
      }
    }
    // reserveList.map(async ele=>{
    //   // console.log(ele.reservationID)
    //   let finalList = []
    //   const room = await Room.findById(ele.roomID)

    //   // console.log(room.type)
    //   // room.reservation.map(async x=>{
    //   //   // console.log(x.type)
    //   //   // console.log(`${x._id} === ${ele.reservationID}`)
    //   //     if(x._id.toString()===ele.reservationID.toString()){
    //   //       // console.log(x)
    //   //       // let yay = {type:room.type}
    //   //       let yay = {...x._doc,type:room.type}
    //   //       console.log(yay)
    //   //       final_list.push(yay)
    //   //       // console.log(yay)
    //   //     }
    //   // })

    console.log(finalList)

    // let yay = room.reservation.find(x=>{
    //   return x._id.toString()===ele.reservationID.toString()
    // })
    // console.log(yay)
    // })

    res.json({
      success: true,
      reserve_list: finalList
    })
  } catch (e) {
    next(e)
  }
}
