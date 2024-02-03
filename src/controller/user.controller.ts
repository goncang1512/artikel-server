import { Request, Response, NextFunction } from 'express'
import { getUser, getUserById, postAccount, patchAccount, deleteAccount, getUserImg } from '../services/user.services'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import UserModel from '../models/users.models'
import fs from 'fs'
import PosterModel from '../models/content.models'

interface PostUser {
  username: string
  email: string
  password: string
  user_id: string
  refreshToken: string | null
  imgProfil: string | undefined
  profilUrl: string
}

interface CustomRequest extends Request {
  filename?: string
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
    const fileName = undefined
    const urlProfil = `${req.protocol}://${req.get('host')}/public/profil/${fileName}`
    const user_id = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)
    const data: PostUser = {
      user_id,
      username,
      email,
      password: hashedPassword,
      refreshToken: null,
      imgProfil: fileName,
      profilUrl: urlProfil
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
  const fileName = req.filename
  const urlProfil = `${req.protocol}://${req.get('host')}/public/profil/${fileName}`

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
      imgProfil: fileName,
      profilUrl: urlProfil,
      refreshToken: null
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

    const contents: any = await PosterModel.find({ user_id: user?._id })
    for (const content of contents) {
      const filepath = `./public/poster/${content.imgPoster}`
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)
      }
    }

    await PosterModel.deleteMany({ user_id: user?._id })

    const filepath = `./public/profil/${user?.imgProfil}`
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }
    const result = await deleteAccount(_id)

    res.status(200).json({ status: true, statusCode: 200, message: 'Success delete user', result })
    next()
  } catch (error) {
    res.status(500).json({ status: false, statusCode: 500, message: 'Failed delete user', Error: error })
  }
}
