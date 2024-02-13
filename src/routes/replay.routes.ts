import { logger } from '../utils/logger'
import { postReplayComment, getReplayComment, deleteReplayComment } from '../controller/replay.controller'
import { Router } from 'express'

export const ReplayRouter: Router = Router()

ReplayRouter.post('/replay/:userId/:commentId', postReplayComment, () => {
  logger.info('Success post replay')
})

ReplayRouter.get('/replay/:id', getReplayComment, () => {
  logger.info('Success get replay')
})

ReplayRouter.delete('/replay/:id', deleteReplayComment, () => {
  logger.info('Success deleted replay')
})
