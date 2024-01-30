import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { UploadedFile } from 'express-fileupload'
import { NextFunction, Request, Response } from 'express'
import { getUserImg } from '../services/user.services'
import fs from 'fs'

interface CustomRequest extends Request {
  filename?: string
}
export const uploadImgProfil = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.files === null || !req.files?.imgProfil) {
    return res.status(400).json({ message: 'Tidak ada foto' })
  }

  const file = req.files.imgProfil as UploadedFile
  const fileSize = file.data.length
  const ext = path.extname(file.name)
  const fileName = `${uuidv4()}${ext}`
  const allowedType = ['.png', '.jpg', '.jpeg']

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: 'Invalid Images' })
  if (fileSize > 5000000) return res.status(422).json({ message: 'Image must be less than 1MB' })

  try {
    file.mv(`./public/profil/${fileName}`, async (error) => {
      if (error) return res.status(500).json({ message: error.message })
      req.filename = fileName
      next()
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateUserImg = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id: _id } = req.params
  const user: any = await getUserImg(_id)
  console.log('User:', user.imgProfil)
  let fileName: string
  if (req.files === null) {
    fileName = user.imgProfil
    req.filename = fileName
    next()
  } else {
    const file = req.files?.imgProfil as UploadedFile
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    fileName = `${uuidv4()}${ext}`
    const allowedType = ['.png', '.jpg', '.jpeg']

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: 'Invalid Images' })
    if (fileSize > 5000000) return res.status(422).json({ message: 'Image must be less than 5 MB' })

    const filepath = `./public/profil/${user.imgProfil}`
    if (fs.existsSync(filepath) || user.imgProfil !== 'default-fotoprofil.png') {
      fs.unlinkSync(filepath)
    }

    file.mv(`./public/profil/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message })
      req.filename = fileName
      next()
    })
  }
}
