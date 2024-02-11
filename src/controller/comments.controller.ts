import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import CommentModel from '../models/comment.models'

export const postComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { comment } = req.body
    const { userId, contentId } = req.params
    const data = {
      comment_id: uuidv4(),
      content_id: contentId,
      user_id: userId,
      comment,
      user: userId
    }

    await CommentModel.create(data)
    const result = await CommentModel.find({ comment_id: data.comment_id }).populate(
      'user',
      '_id user_id username email imgProfil createdAt'
    )

    res.status(201).json({ status: true, statusCode: 201, message: 'Success post comment', result })
    next()
  } catch (error) {
    res.status(400).json({ status: false, statusCode: 400, message: 'Failed post comment' })
  }
}

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CommentModel.find().populate('user', '_id user_id username email imgProfil createdAt')
    res.status(200).json({ status: false, statusCode: 200, message: 'Success get comment', result })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed get comment' })
  }
}

export const getCommentContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contentId } = req.params
    const result = await CommentModel.find({ content_id: contentId })
      .populate('user', '_id user_id username email imgProfil createdAt')
      .sort({ createdAt: -1 })

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get comment content', result })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed get comment content' })
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await CommentModel.findByIdAndDelete({ _id: id })
    res.status(200).json({ status: true, statusCode: 200, message: 'Success delete comment', result: id })
  } catch (error) {
    res.status(400).json({ status: false, statusCode: 400, message: 'Failed delete comment' })
  }
}
