import * as joi from 'joi'
import axios from 'axios'
import { User } from '../Models/User'
import { registerNewUser,isUsernameExist } from '../Services/auth'
import { runInNewContext } from 'vm';

export const login = async (req, res,next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password    
  }
  // try{
  //   throw new Error('fib')

  // }catch(e){
  //   next(e)
  // }
  

}

export const register = async (req, res,next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    role: req.body.role
  }  
  try {
    // await registerNewUser(userData)
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
