import { model, Schema, Document } from 'mongoose'
import * as bcrypt from 'bcrypt-nodejs'

interface IAccessToken extends Document {
  access_token: string
  refresh_token: string
}
interface IUser extends Document {
  username: string
  password: string
  fullname: string
  role: string
  token: IAccessToken
}

const accessTokenSchema = new Schema({
  access_token: String,
  refresh_token: String
})

const userSchema = new Schema({
  username: String,
  password: String,
  fullname: String,
  role: String,
  token: accessTokenSchema
})

userSchema.pre<IUser>('save', function(next) {
  if (!this.isModified('password')) return next()
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

export const User = model<IUser>('User', userSchema)
