import mongoose from 'mongoose'

const followSchema = new mongoose.Schema(
  {
    user_id: {
      type: String
    },
    follower_id: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
)

const FollowModel = mongoose.model('follow', followSchema)

export default FollowModel
