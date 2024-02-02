export interface LoginType {
  email: string
  password: string
  message: string
  from: string
}

export interface JWTType {
  _id: string
  user_id: string
  username: string
  email: string
  password: string
}

export interface UpdateUser {
  username: string
  email: string
  password: string
  confPassword: string
  imgProfil: any
}
