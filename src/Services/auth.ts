import axios from 'axios'
import * as bcrypt from 'bcrypt-nodejs'
import { getENV } from '../Utils/helper'
import { User } from '../Models/User'

interface LoginDataType {
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

export const signInWithLocal = async (data: LoginDataType) => {
  try {
    // TODO
  } catch (e) {
    console.log(e)
  }
}

export const registerNewUser = async (data: RegisterDataType) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(data.password, salt)
  try {
    const newUser = await new User({
      username: data.username,
      password: hash,
      fullname: data.fullname,
      role: data.role
    }).save()
    return newUser
  } catch (e) {
    console.log(e)
  }
}
