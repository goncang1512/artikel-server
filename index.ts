import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routes } from './src/routes/index.routes'
import { logger } from './src/utils/logger'
import bodyParser from 'body-parser'
import FileUpload from 'express-fileupload'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { resolve } from 'path'

// connect db mongodb
import './src/utils/connectDB'

const app: Application = express()
const port = process.env.SERVER_PORT_LISTEN ?? 5500
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

app.listen(port, () => {
  logger.info(`Server berjalan di port ${port}`)
})
