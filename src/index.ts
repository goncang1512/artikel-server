import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/index.routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import FileUpload from 'express-fileupload'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { resolve } from 'path'
import http from 'http'

// connect db mongodb
import './utils/connectDB'

const app: Application = express()
dotenv.config()

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// public static
app.use('/public', express.static(resolve('public')))

// cors access handler
app.use(
  cors({
    origin: /^https:\/\//,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
)

// cookie parser
app.use(cookieParser())

// file upload express
app.use(FileUpload())

routes(app)

const server = http.createServer(app)
server.listen(process.env.SERVER_PORT_LISTEN, () => {
  logger.info(`Server berjalan di port ${process.env.SERVER_PORT_LISTEN}`)
})
