import { NextFunction, Request, Response } from 'express'
import MadingModel from '../models/mading.models'

export const existingMading = async (req: Request, res: Response, next: NextFunction) => {
  const { nameMading } = req.body

  try {
    const mading = await MadingModel.findOne({ nameMading })

    if (mading) {
      console.log(mading)
      return res
        .status(422)
        .json({ status: false, statusCode: 422, message: `Mading dengan nama ${nameMading} sudah ada.` })
    }

    next()
  } catch (error) {
    console.error('Terjadi kesalahan dalam melakukan pengecekan mading:', error)
    return res.status(500).json({ status: false, statusCode: 500, message: 'Terjadi kesalahan dalam server.' })
  }
}

export const existingMadingEdit = async (req: Request, res: Response, next: NextFunction) => {
  const { nameMading } = req.body
  const { id } = req.params

  try {
    const mading = await MadingModel.findOne({ nameMading })

    if (mading && String(mading._id) !== id) {
      return res
        .status(422)
        .json({ status: false, statusCode: 422, message: `Mading dengan nama ${nameMading} sudah ada.` })
    }

    next()
  } catch (error) {
    console.error('Terjadi kesalahan dalam melakukan pengecekan mading:', error)
    return res.status(500).json({ status: false, statusCode: 500, message: 'Terjadi kesalahan dalam server.' })
  }
}
