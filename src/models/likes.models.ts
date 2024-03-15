import mongoose from 'mongoose'

const likesSchema = new mongoose.Schema(
  {
    likes_id: {
      type: String
    },
    content_id: {
      type: String
    },
    userContent_id: {
      type: String
    },
    user_id: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  {
    timestamps: true
  }
)

const LikesModel = mongoose.model('likes', likesSchema)

export default LikesModel
