import { NextFunction, Request, Response } from 'express'
import MadingModel from '../models/mading.models'
import { v4 as uuidv4 } from 'uuid'

export const buatMading = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nameMading, statusMading } = req.body
    const { id } = req.params
    const status = statusMading === 'public'
    const data = {
      mading_id: uuidv4(),
      nameMading,
      statusMading: status,
      user_id: id,
      user: id
    }

    const result = await MadingModel.create(data)

    res.status(201).json({ status: true, statusCode: 201, message: 'Success post mading', result })
    next()
  } catch (error) {
    res.status(400).json({ status: false, statusCode: 400, message: 'Filed post mading', error })
  }
}

export const getAllMading = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await MadingModel.find().populate('user', '_id user_id username email imgProfil createdAt')
    res.status(200).json({ status: true, statusCode: 200, message: 'Success post mading', result })

    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed get all mading', error })
  }
}

export const getMadingUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await MadingModel.find({ user_id: req.params.id }).sort({ updatedAt: -1 })
    res.status(200).json({ status: true, statusCode: 200, message: 'Failed get all mading', result })
    next()
  } catch (error) {
    res.status(404).json({ status: false, statusCode: 404, message: 'Failed get all mading', error })
  }
}

export const editMading = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nameMading, statusMading } = req.body
    const { id } = req.params
    const status = statusMading === 'public'
    const data = {
      nameMading,
      statusMading: status
    }

    await MadingModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: data
      }
    )

    const result = await MadingModel.find({ _id: id })

    res.status(201).json({ status: true, statusCode: 201, message: 'Success edit mading', result })

    next()
  } catch (error) {
    res.status(400).json({ status: false, statusCode: 400, message: 'Failed edit mading', error })
  }
}

export const deletedMading = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await MadingModel.findByIdAndDelete({ _id: id })

    res.status(200).json({ status: true, statusCode: 200, message: 'Success deleted mading', result: id })
    next()
  } catch (error) {
    res.status(400).json({ status: false, statusCode: 400, message: 'Failed deleted mading', error })
  }
}
