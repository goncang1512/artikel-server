import { Router } from 'express'
import { logger } from '../utils/logger'
import { uplaodContent, getContentUser } from '../controller/content.controller'
import { createContentValidation } from '../middleware/validation'
import { uploadImgContent } from '../middleware/content.upload'

export const ContentRouter: Router = Router()

ContentRouter.get('/content', getContentUser, () => {
  logger.info('Success get content data')
})

ContentRouter.post('/content/:id', createContentValidation, uploadImgContent, uplaodContent, () => {
  logger.info('Success add new content')
})
