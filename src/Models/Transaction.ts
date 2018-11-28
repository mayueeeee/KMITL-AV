import { model, Schema, Document } from 'mongoose'

interface Itransaction extends Document {
  userID: string
  roomID: string
  reservationID: string
  status: string,
  startTime: Date,
  createdAt: Date,
  updatedAt: Date

}

const transactionSchema = new Schema(
  {
    userID: {type:String,required:true},
    roomID: {type:String,required:true},
    reservationID: {type:String,required:true},
    status: { type: String, default: 'active' },
    startTime: Date,
  },
  { timestamps: true }
)

export const Transaction = model<Itransaction>('Transaction', transactionSchema)
