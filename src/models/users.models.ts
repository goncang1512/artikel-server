import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    username: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    imgProfil: {
      public_id: { type: String },
      urlProfil: { type: String }
    },
    role: {
      type: String
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: false
    }
  }
)

const UserModel = mongoose.model('user', userSchema)

export default UserModel
