import { Request, Response, NextFunction } from 'express'
import { getContent, patchContent, destroyContent } from '../services/content.services'
import { v4 as uuidv4 } from 'uuid'
import PosterModel from '../models/content.models'
import cloudinary from '../utils/cloudinary'
import CommentModel from '../models/comment.models'
import ReplayModel from '../models/replay.models'
import MadingModel from '../models/mading.models'
import LikesModel from '../models/likes.models'

interface CustomRequest extends Request {
  cloudFile?: any
}

export const uplaodContent = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { tittle, description, madingId } = req.body
  const { id } = req.params
  const content_id = uuidv4()
  const fileCloud = req.cloudFile
  const urlContent = fileCloud.secure_url
  const fileName = fileCloud.public_id
  try {
    const madingIdsArray = madingId.split(',').map((id: string) => id.trim())
    const result = await PosterModel.create({
      content_id,
      tittle,
      description,
      imgContent: {
        public_id: fileName,
        urlContent
      },
      user_id: id,
      user: id,
      mading: madingIdsArray
    })

    res.status(201).json({ status: true, statusCode: 201, message: 'Success created content', result })
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: false, statusCode: 400, message: 'Filed created content' })
  }
}

export const getContentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getContent()

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get content', result })
    next()
  } catch (error) {
    console.log(error)
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed get content', error })
  }
}

export const updateContent = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { tittle, description, mading } = req.body
    const { id } = req.params
    const fileCloud = req.cloudFile
    const fileName = fileCloud.public_id
    const urlContent = fileCloud.secure_url
    const madingIdsArray = mading.split(',').map((id: string) => id.trim())
    const result = await patchContent(id, {
      tittle,
      description,
      imgContent: {
        public_id: fileName,
        urlContent
      },
      mading: madingIdsArray
    })

    res.status(200).json({ status: true, statusCode: 200, message: 'Success update content', result })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed update content' })
  }
}

export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await PosterModel.findById(req.params.id)
    const comment: any = await CommentModel.find({ content_id: req.params.id })

    const imgId: any = content?.imgContent?.public_id
    await cloudinary.uploader.destroy(imgId)

    await LikesModel.deleteMany({ content_id: content?._id })
    await ReplayModel.deleteMany({ comment_id: comment._id })
    await CommentModel.deleteMany({ content_id: req.params.id })
    await destroyContent(req.params.id)

    res.status(204).json({ status: true, statusCode: 204, message: 'Success deleted content', result: content })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed deleted content' })
  }
}

export const getContentQuery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title }: any = req.query

    const result = await PosterModel.find({ tittle: { $regex: title, $options: 'i' } })
      .populate('user', 'user_id username email imgProfil profilUrl createdAt')
      .populate('mading', '_id mading_id nameMading statusMading createdAt updatedAt')

    const mading = await MadingModel.find({ nameMading: { $regex: title, $options: 'i' } })

    if (result.length === 0 && mading.length === 0) {
      return res.status(404).json({ status: false, statusCode: 404, message: `Tidak ada content "${title}"` })
    }

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get content', result, mading })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'failed get content' })
  }
}

export const getContentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PosterModel.find({ user_id: req.params.id })
      .populate('user', 'user_id username email imgProfil profilUrl createdAt')
      .populate('mading', '_id mading_id nameMading statusMading createdAt updatedAt')

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get content', result })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'failed get content' })
  }
}

export const getContentByIdContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PosterModel.findById(req.params.id)
      .populate('user', 'user_id username email imgProfil profilUrl createdAt')
      .populate('mading', '_id nameMading statusMading createdAt updatedAt')

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get content', result })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'failed get content' })
  }
}

export const getContentMading = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const madingId = req.params.id

    const content = await PosterModel.find()
      .populate('user', '_id user_id username email imgProfil')
      .populate('mading', '_id nameMading statusMading createdAt updatedAt')
      .sort({ createdAt: -1 })

    const result = content.filter((item) => {
      return item.mading.some((mading) => String(mading._id) === madingId)
    })

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get content mading', result })
    next()
  } catch (error) {
    console.error('Error while getting content for mading:', error)
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed get content mading', error })
  }
}
