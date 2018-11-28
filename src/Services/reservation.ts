import { Room } from '../Models/Room'
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