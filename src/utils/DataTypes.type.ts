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

export interface ContentType {
  content_id?: string
  tittle: string
  description: string | null | undefined
  imgContent: {
    public_id: string
    urlContent: string
  }
  user_id?: string
  user?: string
  cretedAt?: Date
  updatedAt?: Date
}

export interface CustomRequest extends Request {
  filename?: string
}
