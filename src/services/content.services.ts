import PosterModel from '../models/content.models'

interface ContentType {
  content_id: string
  title: string
  description: string
  imgPoster: string | undefined
  posterUrl: string
  user: string
}

export const postContent = async (payload: ContentType) => {
  try {
    return await PosterModel.create(payload)
  } catch (error) {
    return error
  }
}

export const getContent = async () => {
  return await PosterModel.find().populate('user', 'user_id username email')
}
