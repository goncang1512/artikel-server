import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/index.routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import FileUpload from 'express-fileupload'
import cors from 'cors'
import db from './config/db.config'
import cookieParser from 'cookie-parser'

// connect db mongodb
import './utils/connectDB'

const app: Application = express()
dotenv.config()

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(
  cors({
    credentials: true
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

// cookie parser
app.use(cookieParser())

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
