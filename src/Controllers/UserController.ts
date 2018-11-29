import * as joi from 'joi'
import axios from 'axios'
import { User } from '../Models/User'
import { registerNewUser, isUsernameExist, signInWithLocal, signInWithKMITL, generateAccessToken, decodeToken } from '../Services/auth'
import { HTTP } from '../constants/http'
import * as Sentry from '@sentry/node'

export const login = async (req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  }
  try {
    const user = await signInWithLocal(userData.username, userData.password)
    const token = await generateAccessToken(user.id)
    res.json({
      success: true,
      access_token: token,
      refresh_token: 'kikikik',
      user: {
        fullname: user.fullname,
        role: user.role
      }
    })
  } catch (e) {
    next(e)
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

export const validateToken = async (req, res, next) => {
  const token = req.get('Authorization')
  console.log(token)
  if (token === undefined||token===null||token===''||token==="Bearer null") {
    res.status(401).json({
      success: false,
      message: 'Authorization required'
    })
  } else {
    try {
      // console.log(token.split('Bearer '))
      const data = await decodeToken(token.split('Bearer ')[1])
      console.log(data)
      req.body.userID = data.user
      next()
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
}
