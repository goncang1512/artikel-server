import { Request, Response, NextFunction } from 'express'
import { postContent, getContent } from '../services/content.services'
import { v4 as uuidv4 } from 'uuid'

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
    const result = await postContent({ content_id, title, description, imgPoster: filename, posterUrl, user: id })

    res.status(201).send({ status: true, statusCode: 201, message: 'Success created content', result })
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: false, statusCode: 500, message: 'Filed created content' })
  }
}

export const getContentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getContent()

    res.status(200).send({ status: true, statusCode: 200, message: 'Success created content', result })
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: false, statusCode: 500, message: 'Success created content' })
  }
}
