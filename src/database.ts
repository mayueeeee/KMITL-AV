import { connect } from 'mongoose'
import { getENV } from './Utils/helper'

connect(`mongodb://${getENV('DB_USER')}:${getENV('DB_PASS')}@${getENV('DB_HOST')}:${getENV('DB_PORT')}/${getENV('DB_NAME')}`)
//connect(`mongodb://dbuser:KMITLeiei555@ds125272.mlab.com:25272/kmitl-av`)
