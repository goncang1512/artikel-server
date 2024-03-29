import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger'
import UserModel from '../models/users.models'
import { loginValidation } from '../middleware/validation'
import { LoginType, JWTType } from '../utils/DataTypes.type'

export const loginAuth = async (req: Request, res: Response, next: NextFunction) => {
  const result: LoginType = loginValidation(req.body)
  try {
    const user: JWTType[] = await UserModel.find({ email: result.email })
    if (!user) {
      return res.status(422).json({ status: false, statusCode: 422, message: 'User tidak di temukan' })
    }

    const match = await bcrypt.compare(result.password, user[0].password)
    if (!match) return res.status(400).json({ message: 'Password Salah' })
    const _id = user[0]._id
    const user_id = user[0].user_id
    const username = user[0].username
    const email = user[0].email

    const accessToken = jwt.sign({ _id, user_id, username, email }, `${process.env.ACCESS_TOKEN_SECRET}`, {
      expiresIn: '20s'
    })

    const refreshToken = jwt.sign({ _id, user_id, username, email }, `${process.env.REFRESH_TOKEN_SECRET}`, {
      expiresIn: '30d'
    })

    await UserModel.findOneAndUpdate({ _id }, { $set: { refreshToken } })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none'
    })

    res.status(200).json({ status: true, statusCode: 200, message: 'Success login', accessToken })
    next()
  } catch (error) {
    let pesan: string
    if (result.from === 'Joi') {
      pesan = result.message
    } else {
      pesan = 'User tidak di temukan'
    }
    logger.error(`Gagal login = ${pesan}`)
    res.status(400).json({ status: false, statusCode: 400, message: pesan })
  }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const user: any = await UserModel.find({ refreshToken })
    if (!user[0]) return res.sendStatus(403)

    jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`, (err: any, _decoded: any) => {
      if (err) return res.sendStatus(403)
      const _id = user[0]._id
      const user_id = user[0].user_id
      const username = user[0].username
      const email = user[0].email
      const imgProfil = user[0].imgProfil
      const role = user[0].role
      const createdAt = user[0].createdAt

      const accessToken = jwt.sign(
        { _id, user_id, username, email, imgProfil, role, createdAt },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
          expiresIn: '15s'
        }
      )

      res.status(200).json({ status: true, statusCode: 200, message: 'Berhasil refresh token', accessToken })

      next()
    })
  } catch (error) {
    logger.info('Gagal refresh token')
    res.status(403).json({ status: false, statusCode: 403, message: 'Tidak authentication', Error: error })
  }
}

export const logoutAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) return res.sendStatus(204)
    const user = await UserModel.find({ refreshToken })
    if (!user[0]) return res.sendStatus(403)

    const _id = user[0]._id

    await UserModel.findOneAndUpdate({ _id }, { $set: { refreshToken: null } })
    res.clearCookie('refreshToken')

    res.status(200).json({ status: true, statusCode: 200, message: 'Berhasil logout' })
    next()
  } catch (error) {
    logger.info('Gagal logout')
    res.status(500).json({ status: false, statusCode: 500, message: 'Gagal logout' })
  }
}
