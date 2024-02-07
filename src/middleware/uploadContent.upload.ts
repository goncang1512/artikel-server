import { NextFunction, Request, Response } from 'express'
import cloudinary from '../utils/cloudinary'
import { logger } from '../utils/logger'
import PosterModel from '../models/content.models'

interface CustomRequest extends Request {
  cloudFile?: any
}

export const uploadContent = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const content = req.body.imgContent
  try {
    const result = await cloudinary.uploader.upload(content, {
      folder: 'content',
      width: 364,
      height: 364,
      crop: 'fill'
    })

    logger.info('Success upload img')
    req.cloudFile = result
    next()
  } catch (error) {
    res.status(500).json({ messgae: 'Error upload', Error: error })
  }
}

export const updateContentFile = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const imgContent = req.body.imgContent
  const { id: _id } = req.params
  try {
    const content = await PosterModel.findById(_id)

    if (imgContent === null || imgContent === '') {
      req.cloudFile = {
        public_id: content?.imgContent?.public_id,
        secure_url: content?.imgContent?.urlContent
      }

      next()
    } else {
      const imgId: any = content?.imgContent?.public_id
      await cloudinary.uploader
        .destroy(imgId)
        .then(() => logger.info('success delete img'))
        .catch((err: any) => logger.error(err))

      const result = await cloudinary.uploader.upload(imgContent, {
        folder: 'content',
        width: 364,
        height: 364,
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
