import mongoose from 'mongoose'

const posterSchema = new mongoose.Schema(
  {
    content_id: {
      type: String,
      unique: true
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    imgPoster: {
      type: String
    },
    posterUrl: {
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

const PosterModel = mongoose.model('poster', posterSchema)

export default PosterModel
