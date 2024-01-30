import UserModel from '../models/users.models'

export const postLogin = async (email: string) => {
  return await UserModel.find({ email })
}

export const updateLogin = async (refreshToken: string, id: string) => {
  return await UserModel.findOneAndUpdate({ _id: id }, { $set: { refreshToken } })
}

export const tokenRefresh = async (refreshToken: string) => {
  return await UserModel.find({ refreshToken })
}

export const deleteToken = async (id: string) => {
  return await UserModel.findOneAndUpdate({ _id: id }, { $set: { refreshToken: null } })
}
