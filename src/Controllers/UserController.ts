import * as joi from 'joi'
import axios from 'axios'
import { User } from '../Models/User'
import { registerNewUser } from '../Services/auth'

export const login = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password    
  }

}

export const register = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    role: req.body.role
  }
  try {
    await registerNewUser(userData)
    res.json({
      success: true
    })
  } catch (e) {
    console.log(e)
  }
}
