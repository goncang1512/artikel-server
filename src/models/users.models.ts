import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema(
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
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: false
    }
  }
)

const UserModel = mongoose.model('users', usersSchema)

export default UserModel
