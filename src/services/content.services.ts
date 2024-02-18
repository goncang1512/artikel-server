import PosterModel from '../models/content.models'
import { ContentType } from '../utils/DataTypes.type'

export const postContent = async (payload: ContentType) => {
  try {
    return await PosterModel.create(payload)
  } catch (error) {
    return error
  }
}

export const getContent = async () => {
  return await PosterModel.find()
    .populate('user', '_id user_id username email imgProfil')
    .populate('mading', '_id mading_id nameMading statusMading createdAt updatedAt')
    .sort({ createdAt: -1 })
}

export const patchContent = async (id: string, payload: ContentType) => {
  return await PosterModel.findOneAndUpdate(
    { _id: id },
    {
      $set: payload
    }
  )
}

export const findContent = async (id: string) => {
  const result = await PosterModel.findOne({ _id: id }).lean()
  return result as ContentType
}

export const destroyContent = async (id: string) => {
  return await PosterModel.findByIdAndDelete({ _id: id })
}
