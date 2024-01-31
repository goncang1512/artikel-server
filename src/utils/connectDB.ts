import mongoose from 'mongoose'
import { logger } from './logger'
import config from '../config/environtment'

mongoose
  .connect(`${config.dbOnline}`, {
    dbName: `${config.name}`
  })
  .then(() => {
    logger.info('Success connect to mongodb')
  })
  .catch((err) => {
    console.log(err)
  })
