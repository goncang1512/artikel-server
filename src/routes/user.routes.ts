import { NextFunction, Request, Response, Router } from 'express'
import { logger } from '../utils/logger'
import { getUserAll, getDetailUser, createAccount, updateUser, deleteUser } from '../controller/user.controller'
import { createUserValidation, updateValidateUser } from '../middleware/validation'
import { checkUser, chekcUpdateUser } from '../middleware/user.check'
import { updateUserImg } from '../middleware/profil.upload'
import { getUserImg } from '../services/user.services'
import PosterModel from '../models/content.models'

export const UserRouter: Router = Router()

UserRouter.get('/users', getUserAll, () => {
  logger.info('Success get user data')
})

UserRouter.get('/users/:userId', getDetailUser, () => {
  logger.info('Success get user data')
})

UserRouter.post('/users', createUserValidation, checkUser, createAccount, () => {
  logger.info('Success create user data')
})

UserRouter.patch('/users/:id', updateValidateUser, chekcUpdateUser, updateUserImg, updateUser, () => {
  logger.info('Success updated user data')
})

UserRouter.delete('/users/:id', deleteUser, () => {
  logger.info('Success deleted user data')
})

UserRouter.get('/my/:id', async (req: Request, res: Response, next: NextFunction) => {
  const user = await getUserImg(req.params.id)

  const contents: any = await PosterModel.find({ user_id: user?._id })

  res.json({ contents })
})
