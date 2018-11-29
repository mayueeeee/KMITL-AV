import { Room } from '../Models/Room';
export const getRoomList = async()=>{
    const roomList = await Room.find({})
    console.log(roomList)
    console.log(roomList[0].reservation)
    return roomList
}

