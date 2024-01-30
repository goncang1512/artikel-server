import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { UploadedFile } from 'express-fileupload'
import { NextFunction, Request, Response } from 'express'

interface CustomRequest extends Request {
  filename?: string
}

export const uploadImgContent = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.files === null || !req.files?.imgPoster) {
    return res.status(400).json({ message: 'Tidak ada foto' })
  }

  const file = req.files.imgPoster as UploadedFile
  const fileSize = file.data.length
  const ext = path.extname(file.name)
  const fileName = `${uuidv4()}${ext}`
  const allowedType = ['.png', '.jpg', '.jpeg']

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: 'Invalid Images' })
  if (fileSize > 5000000) return res.status(422).json({ message: 'Image must be less than 1MB' })

  try {
    file.mv(`./public/poster/${fileName}`, async (error) => {
      if (error) return res.status(500).json({ message: error.message })
      req.filename = fileName
      next()
    })
  } catch (error) {
    console.log(error)
  }
}
