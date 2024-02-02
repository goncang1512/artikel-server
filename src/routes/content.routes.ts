import { Router } from 'express'
import { logger } from '../utils/logger'
import {
  uplaodContent,
  getContentUser,
  updateContent,
  deleteContent,
  getContentQuery
} from '../controller/content.controller'
import { createContentValidation, updateContentValidation } from '../middleware/validation'
import { updatePoster, uploadImgContent } from '../middleware/content.upload'

export const ContentRouter: Router = Router()

ContentRouter.get('/content', getContentUser, () => {
  logger.info('Success get content data')
})

ContentRouter.post('/content/:id', createContentValidation, uploadImgContent, uplaodContent, () => {
  logger.info('Success add new content')
})

ContentRouter.patch('/content/:id', updateContentValidation, updatePoster, updateContent, () => {
  logger.info('Success update content')
})

ContentRouter.delete('/content/:id', deleteContent, () => {
  logger.info('Success deleted content')
})

ContentRouter.get('/content/search', getContentQuery, () => {
  logger.info('Success get content by query')
})
