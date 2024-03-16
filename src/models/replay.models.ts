import mongoose from 'mongoose'

const replaySchema = new mongoose.Schema(
  {
    replay_id: {
      type: String,
      unique: true
    },
    comment_id: {
      type: String
    },
    user_id: {
      type: String
    },
    replay: {
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

const ReplayModel = mongoose.model('replays', replaySchema)

export default ReplayModel
