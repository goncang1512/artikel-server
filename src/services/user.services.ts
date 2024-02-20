import { logger } from '../utils/logger'
import UserModel from '../models/users.models'

interface UserType {
  username: string
  email: string
  password?: any
  user_id?: string
  role: string
  refreshToken?: string | null
  imgProfil: {
    public_id: any
    urlProfil: string
  }
}

export const getUser = async () => {
  try {
    return await UserModel.find({}, 'user_id username email imgProfil refreshToken createdAt')
  } catch (error) {
    logger.info('cannot get data from db')
    return error
  }
}

export const getUserById = async (id: string) => {
  try {
    return await UserModel.findById(id, 'user_id username email imgProfil role refreshToken createdAt')
  } catch (error) {
    return error
  }
}

export const postAccount = async (data: UserType) => {
  try {
    return await UserModel.create(data)
  } catch (error) {
    return error
  }
}

export const patchAccount = async (id: string, payload: UserType) => {
  return await UserModel.findOneAndUpdate(
    { _id: id },
    {
      $set: payload
    }
  )
}

export const deleteAccount = async (id: string) => {
  return await UserModel.findOneAndDelete({ _id: id })
}

export const getUserImg = async (_id: string) => {
  return await UserModel.findById({ _id })
}
