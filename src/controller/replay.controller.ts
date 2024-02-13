import { NextFunction, Request, Response } from 'express'
import ReplayModel from '../models/replay.models'
import { v4 as uuidv4 } from 'uuid'

export const postReplayComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { replay } = req.body

    if (replay === '' || replay === null) {
      return res.status(422).json({ status: false, statusCode: 422, message: 'Kolom komenter tidak boleh kosong' })
    }

    const data = {
      replay_id: uuidv4(),
      comment_id: req.params.commentId,
      user_id: req.params.userId,
      replay,
      user: req.params.userId
    }

    await ReplayModel.create(data)
    const result = await ReplayModel.find({ replay_id: data.replay_id }).populate(
      'user',
      '_id user_id username email imgProfil createdAt'
    )

    res.status(201).json({ status: true, statusCode: 201, message: 'Success post replay comment', result })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed post replay comment' })
  }
}

export const getReplayComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ReplayModel.find({ comment_id: req.params.id }).populate(
      'user',
      '_id user_id username email imgProfil createdAt'
    )

    res.status(200).json({ status: true, statusCode: 200, message: 'Success get replay comment', result })
    next()
  } catch (error) {
    res.status(400).json({ status: false, statusCode: 400, message: 'Failed get replay comment' })
  }
}

export const deleteReplayComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await ReplayModel.findByIdAndDelete({ _id: id })

    res.status(200).json({ status: true, statusCode: 200, message: 'Success deleted replay comment', result: id })

    next()
  } catch (error) {
    res.status(500).json({ status: false, statusCode: 500, message: 'Failed deleted replay comment' })
  }
}
