import * as mongoose from 'mongoose'
import {getENV} from '../Utils/helper'

export const connect = () =>{
     mongoose.connect(`mongodb://${getENV('DB_USER')}:${getENV('DB_PASS')}@${getENV('DB_URL')}`,{ useNewUrlParser: true })
}
