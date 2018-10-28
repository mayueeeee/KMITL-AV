import * as joi from 'joi'
import axios from 'axios'
import { User } from '../Models/User'
import { registerNewUser, isUsernameExist, signInWithLocal, signInWithKMITL } from '../Services/auth'
import { HTTP } from '../constants/http'

export const login = async (req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  }
  try {
    await signInWithLocal(userData.username, userData.password)
    res.json({
          success:true,
          access_token: 'kikikik',
          refresh_token: 'kikikik'
        })
  } catch (e) {
    res.status(e.code).json({
      success: false,
      message: e.message
    })
  }
}

export const register = async (req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    role: req.body.role
  }

  try {
    await registerNewUser(userData)
    // throw new Error('Register Error naja')
    const isExist = await isUsernameExist(userData.username)
    console.log(isExist)
    res.json({
      success: true
    })
  } catch (e) {
    next(e)
  }
}
