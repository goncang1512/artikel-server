import { Router } from 'express'
import { logger } from '../utils/logger'
import {
  uplaodContent,
  getContentUser,
  updateContent,
  deleteContent,
  getContentQuery,
  getContentById,
  getContentByIdContent
} from '../controller/content.controller'
import { createContentValidation, updateContentValidation } from '../middleware/validation'
import { uploadContent, updateContentFile } from '../middleware/uploadContent.upload'

export const ContentRouter: Router = Router()

ContentRouter.get('/content', getContentUser, () => {
  logger.info('Success get content data')
})

ContentRouter.post('/content/:id', createContentValidation, uploadContent, uplaodContent, () => {
  logger.info('Success add new content')
})

ContentRouter.patch('/content/:id', updateContentValidation, updateContentFile, updateContent, () => {
  logger.info('Success update content')
})

ContentRouter.delete('/content/:id', deleteContent, () => {
  logger.info('Success deleted content')
})

ContentRouter.get('/content/search', getContentQuery, () => {
  logger.info('Success get content by query')
})

ContentRouter.get('/content/:id', getContentById, () => {
  logger.info('Success get content by id user')
})

ContentRouter.get('/mycontent/:id', getContentByIdContent, () => {
  logger.info('Success get content by id content')
})
