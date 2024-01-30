import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/users.models'

interface UserCheck {
  username: string
  email: string
  password: string
  confPassword: string
}

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password, confPassword }: UserCheck = req.body

  const user = await UserModel.findOne({
    $or: [{ username }, { email }]
  })

  if (user) {
    return res.status(422).json({ status: false, statusCode: 422, message: 'Email atau Username sudah terdaftar' })
  }

  if (password !== confPassword) {
    return res.status(422).json({ status: false, statusCode: 422, message: 'password dan confirm password tidak sama' })
  }

  next()
}

export const chekcUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, confPassword } = req.body
  const { id } = req.params
  const user = await UserModel.findOne({
    $or: [{ username }, { email }]
  })

  if (user && String(user._id) !== id) {
    return res.status(422).json({ status: false, statusCode: 422, message: 'username atau email sudah terdaftar' })
  }

  if (password !== confPassword) {
    return res.status(422).json({ status: false, statusCode: 422, message: 'password dan confirm password tidak sama' })
  }

  next()
}
