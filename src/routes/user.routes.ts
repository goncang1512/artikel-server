import { logger } from '../utils/logger'
import { getUserAll, getDetailUser, createAccount, updateUser, deleteUser } from '../controller/user.controller'
import { createUserValidation, updateValidateUser } from '../middleware/validation'
import { checkUser, chekcUpdateUser } from '../middleware/user.check'
import { Request, Response, Router } from 'express'
import cloudinary from '../utils/cloudinary'
import { uploadFile, updateUploadFile } from '../middleware/uploadMulter'

export const UserRouter: Router = Router()

UserRouter.get('/users', getUserAll, () => {
  logger.info('Success get user data')
})

UserRouter.get('/users/:userId', getDetailUser, () => {
  logger.info('Success get user data')
})

UserRouter.post('/users', createUserValidation, checkUser, uploadFile, createAccount, () => {
  logger.info('Success create user data')
})

UserRouter.patch('/users/:id', updateValidateUser, chekcUpdateUser, updateUploadFile, updateUser, () => {
  logger.info('Success updated user data')
})

UserRouter.delete('/users/:id', deleteUser, () => {
  logger.info('Success deleted user data')
})

UserRouter.post('/upload', async (req: Request, res: Response) => {
  const profil = req.body.profil
  try {
    const result = await cloudinary.uploader.upload(profil, { folder: 'profil' })

    console.log(result)
    logger.info('Success upload img')
    res.status(200).json({ messgae: 'Success', data: result })
  } catch (error) {
    res.status(500).json({ messgae: 'Error upload', Error: error })
  }
})
