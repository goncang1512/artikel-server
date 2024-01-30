import mongoose from 'mongoose'
import { logger } from './logger'
import config from '../config/environtment'

mongoose
  .connect(`${config.db}`)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.info('Could not connect to MongoDB')
    logger.error(error)
    process.exit(1)
  })
