import { getRoomList } from '../Services/manage';
export const getRoom = async (req, res) => {
    const roomList = await getRoomList()
  console.log('eieizaa')
  res.send('5555')
}
export const addRoom = async (req, res) => {
  console.log('eiei333')
  res.send('5555')
}
export const viewRoom = async (req, res) => {
  console.log('eiei')
  res.send('5555')
}
export const deleteRoom = async (req, res) => {
  console.log('eiei')
  res.send('5555')
}
export const updateRoom = async (req, res) => {
    console.log('eiei')
    res.send('5555')
  }