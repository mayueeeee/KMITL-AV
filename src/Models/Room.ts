import { model, Schema, Document } from 'mongoose'
import { number } from 'joi'

interface IReservationSlot extends Document {
  [index: number]: { startTime: Date; endTime: Date; reserveUser: string }
}

const ReservationSlotSchema = new Schema({
  startTime: Date,
  endTime: Date,
  reserveUser: String
})

interface IRoom extends Document {
  name: string,
  is_active:boolean,
  type: string,
  Capacity: number,
  reservation: any
}

const roomSchema = new Schema({
  name: String,
  is_active:Boolean,
  type: String,
  Capacity: Number,
  // reservation: [{ type: Schema.Types.ObjectId, ref: 'ReservationSlotSchema' }]
  reservation: [ReservationSlotSchema]
})


export const Room = model<IRoom>('Room', roomSchema)