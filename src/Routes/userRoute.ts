//import * as express from 'express'
import * as UserController from '../Controllers/UserController'
const express = require('express')
const userRoute = express.Router()

userRoute.post('/v1/auth',UserController.login)
userRoute.post('/v1/register',UserController.register)


export { userRoute }
