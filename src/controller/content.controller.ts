import { Request, Response, NextFunction } from 'express'
import {
  postContent,
  getContent,
  patchContent,
  destroyContent,
  findContent,
  searchContent
} from '../services/content.services'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import { ContentType } from '../utils/DataTypes.type'

interface CustomRequest extends Request {
  filename?: string
}

export const uplaodContent = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { title, description } = req.body
  const { id } = req.params
  const content_id = uuidv4()
  const filename = req.filename
  const posterUrl = `${req.protocol}://${req.get('host')}/public/poster/${filename}`
  try {
    const result = await postContent({
      content_id,
      title,
      description,
      imgPoster: filename,
      posterUrl,
      user_id: id,
      user: id
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
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed get content' })
  }
}

export const updateContent = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description }: ContentType = req.body
    const { id } = req.params
    const filename = req.filename
    const posterUrl = `${req.protocol}://${req.get('host')}/public/poster/${filename}`
    const result = await patchContent(id, {
      title,
      description,
      imgPoster: filename,
      posterUrl
    })

    res.status(200).json({ status: true, statusCode: 200, message: 'Success update content', result })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed update content' })
  }
}

export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await findContent(req.params.id)

    const filepath = `./public/poster/${content.imgPoster}`
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    const result = await destroyContent(req.params.id)

    res.status(204).json({ status: true, statusCode: 204, message: 'Success deleted content', result })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed deleted content' })
  }
}

export const getContentQuery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.query

    const result = await searchContent(content)

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get content', result })
    next()
  } catch (error) {
    res.status(400).json({ status: false, statusCode: 400, message: 'failed get content' })
  }
}
