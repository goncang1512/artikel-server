import { Router } from 'express'
import { logger } from '../utils/logger'
import { getUserAll, getDetailUser, createAccount, updateUser, deleteUser } from '../controller/user.controller'
import { createUserValidation, updateValidateUser } from '../middleware/validation'
import { checkUser, chekcUpdateUser } from '../middleware/user.check'
import { uploadImgProfil, updateUserImg } from '../middleware/profil.upload'

export const UserRouter: Router = Router()

UserRouter.get('/users', getUserAll, () => {
  logger.info('Success get user data')
})

UserRouter.get('/users/:userId', getDetailUser, () => {
  logger.info('Success get user data')
})

UserRouter.post('/users', createUserValidation, checkUser, uploadImgProfil, createAccount, () => {
  logger.info('Success create user data')
})

UserRouter.patch('/users/:id', updateValidateUser, chekcUpdateUser, updateUserImg, updateUser, () => {
  logger.info('Success updated user data')
})

UserRouter.delete('/users/:id', deleteUser, () => {
  logger.info('Success deleted user data')
})
