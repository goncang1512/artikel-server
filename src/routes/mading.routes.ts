import { Router } from 'express'
import { logger } from '../utils/logger'
import { buatMading, deletedMading, editMading, getAllMading, getMadingUser } from '../controller/mading.controller'
import { existingMading, existingMadingEdit } from '../middleware/mading.validation'

export const MadingRouter: Router = Router()

MadingRouter.post('/mading/:id', existingMading, buatMading, () => {
  logger.info('Success post mading user')
})

MadingRouter.get('/mading', getAllMading, () => {
  logger.info('Success get all mading')
})

MadingRouter.get('/mading/:id', getMadingUser, () => {
  logger.info('Success get user mading')
})

MadingRouter.patch('/mading/:id', existingMadingEdit, editMading, () => {
  logger.info('Success edit user mading')
})

MadingRouter.delete('/mading/:id', deletedMading, () => {
  logger.info('Success deleted mading')
})
