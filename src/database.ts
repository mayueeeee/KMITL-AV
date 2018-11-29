import { connect } from 'mongoose'
import { getENV } from './Utils/helper'

connect(`mongodb://${getENV('DB_USER')}:${getENV('DB_PASS')}@${getENV('DB_HOST')}:${getENV('DB_PORT')}/${getENV('DB_NAME')}`)
