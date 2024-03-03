import { Router } from 'express'
import { logger } from '../utils/logger'
import { addLikes, getLikes, getLikesContent, disLikes } from '../controller/likes.controller'

export const LikesRoutes: Router = Router()

LikesRoutes.post('/likes', addLikes, () => {
  logger.info('success add likes content')
})

LikesRoutes.get('/likes', getLikes, () => {
  logger.info('success get likes')
})

LikesRoutes.get('/likes/:id', getLikesContent, () => {
  logger.info('success get likes')
})

LikesRoutes.delete('/likes/:id', disLikes, () => {
  logger.info('success deleted likes content')
})
