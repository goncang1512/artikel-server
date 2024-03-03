import { NextFunction, Request, Response } from 'express'
import LikesModel from '../models/likes.models'
import { v4 as uuidv4 } from 'uuid'

export const addLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, content_id, userContent_id } = req.body
    const data = {
      likes_id: uuidv4(),
      content_id,
      userContent_id,
      user_id,
      user: user_id
    }
    const result = await LikesModel.create(data)

    res.status(201).json({ status: true, statusCode: 201, message: 'Success likes content', result })
    next()
  } catch (error) {
    res.status(400).json({ status: false, statusCode: 400, message: 'Failed likes content', error })
  }
}

export const getLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await LikesModel.find().populate('user', '_id username email imgProfil')

    res.status(200).json({ status: true, statusCode: 200, message: 'Success likes content', result })
    next()
  } catch (error) {
    res.status(401).json({ status: false, statusCode: 401, message: 'Failed get likes content', error })
  }
}

export const getLikesContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const result = await LikesModel.find({ content_id: id }).populate('user', '_id username email imgProfil')

    res.status(200).json({ status: true, statusCode: 200, message: 'Success likes content', result })
    next()
  } catch (error) {
    res.status(401).json({ status: false, statusCode: 401, message: 'Failed get likes content', error })
  }
}

export const disLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await LikesModel.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({ status: true, statausCode: 200, message: 'Success deleted likes content', result })
    next()
  } catch (error) {
    res.status(400).json({ status: false, statusCode: 400, message: 'Failed delete likes content', error })
  }
}
