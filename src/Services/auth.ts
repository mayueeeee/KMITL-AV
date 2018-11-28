import axios from 'axios'
import * as bcrypt from 'bcrypt-nodejs'
import { getENV } from '../Utils/helper'
import { User } from '../Models/User'
import * as jwt from 'jsonwebtoken'
import { CustomError } from '../Services/errorHandler'
import { HTTP } from '../constants/http'
import { validate } from '../Controllers/ReservationController';

interface LoginDataType extends Document {
  username: string
  password: string
}

interface RegisterDataType {
  username: string
  password: string
  fullname: string
  role: string
}

export const signInWithKMITL = async (data: LoginDataType) => {
  try {
    const response = await axios.post(`${getENV('KMITL_AUTH_URL')}/api/v1/authenticate`, { ...data, client_secrect: getENV('KMITL_AUTH_SECRECT') })
    // TODO: Handle if data update
  } catch (e) {
    console.log(e)
  }
}

export const signInWithLocal = async (username: string, password: string) => {
  const user = await User.findOne({ username: username })
  // console.log(user)
  if (user === null) throw new CustomError('User not found', HTTP.NOT_FOUND)
  const validateRes = bcrypt.compareSync(password, user.password)
  if (validateRes === false) throw new CustomError('Wrong password', HTTP.UNAUTHORIZED)
  return user
}

export const registerNewUser = async (data: RegisterDataType) => {
  const newUser = await new User(data).save()
  return newUser
}

export const isUsernameExist = async (username: string) => {
  const existUser = await User.find({ username: username })
  return existUser.length !== 0
}

// export const validatePassword = async (pass)

export const generateAccessToken = async (userID: string) => {
  const token = jwt.sign({ user: userID }, getENV('JWT_SECRET'),{ algorithm: 'HS384', expiresIn: '1d' })
  // const user = User.findById(userID)
  // user.update
  // console.log(token)
  return token
}

export const decodeToken = async (token: string) => {
  try{    
    const decoded = jwt.verify(token,getENV('JWT_SECRET'))
    // console.log(decoded)
    return decoded
  }
  catch(e){
    // console.log(e)
    throw e
  }
  
  // const user = User.findById(userID)
  // user.update
  

  
}