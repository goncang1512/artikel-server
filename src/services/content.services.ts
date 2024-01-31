import { ParsedQs } from 'qs'
import PosterModel from '../models/content.models'

export interface ContentType {
  content_id?: string
  title: string
  description: string | null | undefined
  imgPoster: string | undefined
  posterUrl: string
  user_id?: string
  user?: string
  cretedAt?: Date
  updatedAt?: Date
}

export const postContent = async (payload: ContentType) => {
  try {
    return await PosterModel.create(payload)
  } catch (error) {
    return error
  }
}

export const getContent = async () => {
  return await PosterModel.find().populate('user', 'user_id username email imgProfil profilUrl')
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

export const searchContent = async (title: string | string[] | ParsedQs | ParsedQs[] | undefined) => {
  return await PosterModel.find({ title: { $regex: title } }).populate(
    'user',
    'user_id username email imgProfil profilUrl createdAt'
  )
}
