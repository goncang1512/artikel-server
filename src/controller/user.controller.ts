import { Request, Response, NextFunction } from 'express'
import { getUser, getUserById, postAccount, patchAccount, deleteAccount, getUserImg } from '../services/user.services'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import UserModel from '../models/users.models'
import cloudinary from '../utils/cloudinary'
import PosterModel from '../models/content.models'
import { logger } from '../utils/logger'
import CommentModel from '../models/comment.models'
import ReplayModel from '../models/replay.models'

interface PostUser {
  username: string
  email: string
  password: string
  user_id: string
  refreshToken: string | null
  imgProfil: {
    public_id: string
    urlProfil: string
  }
}

interface CustomRequest extends Request {
  filename?: string
  cloudFile?: any
}

export const getUserAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getUser()

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get all users', result })
    next()
  } catch (error) {
    res.status(500).json({ status: false, statusCode: 500, message: 'Failed get user' })
  }
}

export const getDetailUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    const result = await getUserById(userId)

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get user', result })
    next()
  } catch (error) {
    console.log(error)
  }
}

export const createAccount = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { username, email, password }: PostUser = req.body
    const fileCloud = req.cloudFile
    const urlProfil = fileCloud.secure_url
    const fileName = fileCloud.public_id
    const user_id = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)
    const data: PostUser = {
      user_id,
      username,
      email,
      password: hashedPassword,
      refreshToken: null,
      imgProfil: {
        public_id: fileName,
        urlProfil
      }
    }
    const result = await postAccount(data)

    res.status(201).json({ status: true, statusCode: 201, message: 'Success create user', result })
    next()
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { username, email, password }: PostUser = req.body
  const user = await UserModel.findById(id)
  const fileCloud = req.cloudFile
  const fileName = fileCloud.public_id
  const urlProfil = fileCloud.secure_url

  let newPassword: string | null | undefined
  if (password === undefined || password === null || password === '') {
    newPassword = user?.password
  } else {
    const salt = await bcrypt.genSalt(10)
    newPassword = await bcrypt.hash(password, salt)
  }

  try {
    const result = await patchAccount(id, {
      username,
      email,
      password: newPassword,
      imgProfil: {
        public_id: fileName,
        urlProfil
      }
    })

    res.status(201).json({ status: true, statusCode: 201, message: 'Success updated user', result })
    next()
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const _id: string = req.params.id

  try {
    const user = await getUserImg(_id)
    const contents: any = await PosterModel.find({ user_id: _id })
    const comment: any = await CommentModel.find({ content_id: _id })

    for (const content of contents) {
      await cloudinary.uploader
        .destroy(content?.imgContent?.public_id)
        .then(() => {
          logger.info('Success delete all content user')
        })
        .catch(() => {
          logger.info('Failed delete all content user')
        })
    }

    await ReplayModel.deleteMany({ comment_id: comment._id })
    await ReplayModel.deleteMany({ user_id: _id })
    await CommentModel.deleteMany({ content_id: contents._id })
    await CommentModel.deleteMany({ user_id: _id })
    await PosterModel.deleteMany({ user_id: _id })

    const imgId: any = user?.imgProfil?.public_id
    await cloudinary.uploader.destroy(imgId)

    const result = await deleteAccount(_id)

    res.status(200).json({ status: true, statusCode: 200, message: 'Success delete user', result })
    next()
  } catch (error) {
    res.status(500).json({ status: false, statusCode: 500, message: 'Failed delete user', Error: error })
  }
}
