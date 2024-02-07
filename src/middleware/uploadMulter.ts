import { NextFunction, Request, Response } from 'express'
import cloudinary from '../utils/cloudinary'
import { logger } from '../utils/logger'
import UserModel from '../models/users.models'

interface CustomRequest extends Request {
  cloudFile?: any
}

export const uploadFile = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const profil = req.body.imgProfil
  try {
    const result = await cloudinary.uploader.upload(profil, { folder: 'profil', width: 200, height: 200, crop: 'fill' })

    logger.info('Success upload img')
    req.cloudFile = result
    next()
  } catch (error) {
    res.status(500).json({ messgae: 'Error upload', Error: error })
  }
}

export const updateUploadFile = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const profil = req.body.imgProfil
  const { id: _id } = req.params
  try {
    const user = await UserModel.findById(_id)

    if (profil === null || profil === '') {
      req.cloudFile = {
        public_id: user?.imgProfil?.public_id,
        secure_url: user?.imgProfil?.urlProfil
      }

      next()
    } else {
      const imgId: any = user?.imgProfil?.public_id
      await cloudinary.uploader
        .destroy(imgId)
        .then(() => logger.info('success delete img'))
        .catch((err: any) => logger.error(err))

      const result = await cloudinary.uploader.upload(profil, {
        folder: 'profil',
        width: 200,
        height: 200,
        crop: 'fill'
      })

      logger.info('Success upload img')
      req.cloudFile = result
      next()
    }
  } catch (error) {
    console.log(error)
  }
}
