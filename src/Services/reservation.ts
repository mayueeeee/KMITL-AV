import { Room } from '../Models/Room'
import { isWithinRange } from 'date-fns'

export const makeReservation = async (userID: string, roomID: string, startTime: Date, endTime: Date) => {
  const reservationData = {
    startTime: startTime,
    endTime: endTime,
    reserveUser: userID
  }
  try{
    const room = await Room.findById(roomID)
    room.reservation.push(reservationData)
    room.save()
  }
  catch(e){
    throw e
  }  
}

export const checkOverlapTime = async (roomID: string, startTime: Date, endTime: Date) => {
  const roomList = await Room.findById(roomID)
  console.log(roomList)
  console.log(roomList[0].reservation)
  return roomList
}

export const getRoomFromType = async(type:string)=>{
  const rooms = await Room.find({type:type,is_active:true}).select("-reservation -is_active")
  return rooms    
}

export const isTimeAvaliable = async(roomID:string,startTime:Date,endTime:Date)=>{
  let room = await Room.findById(roomID)       
    let canReserve = true
    for (let i = 0; i < room.reservation.length; i++) {
      let ele = room.reservation[i]
      // console.log(ele)
      let isStartInRange = isWithinRange(startTime, ele.startTime, ele.endTime)
      let isEndInRange = isWithinRange(endTime, ele.startTime, ele.endTime)
      // console.log(`isStartInRange: ${isStartInRange} isEndInRange: ${isEndInRange}`)
      if(isStartInRange||isEndInRange){
        canReserve = false
        break
      }      
    }
    return canReserve
}