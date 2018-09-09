import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as dotenv from 'dotenv'
const app = express()
dotenv.config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) =>
  res.json({
    status: 'KMITL AV Management API is running!!!',
    dev: 'Mayueeeee CE55'
  })
)

app.listen(process.env.PRODUCTION === '1' ? process.env.PORT : 3000, () =>
  console.log(
    'API listening on port ' +
      (process.env.PRODUCTION === '1' ? process.env.PORT : 3000)
  )
)

export default app
