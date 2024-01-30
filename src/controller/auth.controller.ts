import { Request, Response, NextFunction } from 'express'
import { postLogin, updateLogin, tokenRefresh, deleteToken } from '../services/auth.services'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger'

interface AuthType {
  email: string
  password: string
}

export const loginAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email: myemail, password: mypassword }: AuthType = req.body
    const user: any = await postLogin(myemail)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const match = await bcrypt.compare(mypassword, user[0].password)
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

    await updateLogin(refreshToken, _id)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none'
    })

    res.status(201).json({ status: true, statusCode: 201, message: 'Success login', accessToken })
    next()
  } catch (error) {
    res.status(500).json({ status: false, statusCode: 500, message: 'Failed login' })
  }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const user = await tokenRefresh(refreshToken)
    if (!user[0]) return res.sendStatus(403)

    jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`, (err: any, decoded: any) => {
      if (err) return res.sendStatus(403)
      const _id = user[0]._id
      const user_id = user[0].user_id
      const username = user[0].username
      const email = user[0].email

      const accessToken = jwt.sign({ _id, user_id, username, email }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: '15s'
      })

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
    const user = await tokenRefresh(refreshToken)
    if (!user[0]) return res.sendStatus(403)

    const _id = user[0]._id

    await deleteToken(String(_id))
    res.clearCookie('refreshToken')

    res.status(200).json({ status: true, statusCode: 200, message: 'Berhasil logout' })
    next()
  } catch (error) {
    logger.info('Gagal logout')
    res.status(500).json({ status: false, statusCode: 500, message: 'Gagal logout' })
  }
}
