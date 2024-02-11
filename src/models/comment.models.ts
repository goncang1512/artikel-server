import mongoose from 'mongoose'

const commentsSchema = new mongoose.Schema(
  {
    comment_id: {
      type: String,
      unique: true
    },
    content_id: {
      type: String
    },
    user_id: {
      type: String
    },
    comment: {
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

const CommentModel = mongoose.model('comments', commentsSchema)

export default CommentModel
