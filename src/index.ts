import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/index.routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import FileUpload from 'express-fileupload'
import cors from 'cors'
// import Users from './models/user.model'
import db from './config/db.config'

// connect db mongodb
import './utils/connectDB'

const app: Application = express()
dotenv.config()

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

// file upload express
app.use(FileUpload())

routes(app)

const testDatabaseConnection = async () => {
  try {
    logger.info('Database connected....')
    await db.authenticate()
    // await Users.sync()
  } catch (err) {
    console.error(err)
  }
}

void testDatabaseConnection()
app.listen(process.env.SERVER_PORT_LISTEN, () => {
  logger.info(`Server berjalan di port ${process.env.SERVER_PORT_LISTEN}`)
})
