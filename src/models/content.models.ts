import mongoose from 'mongoose'

const posterSchema = new mongoose.Schema(
  {
    content_id: {
      type: String,
      unique: true
    },
    tittle: {
      type: String
    },
    description: {
      type: String
    },
    imgContent: {
      public_id: { type: String },
      urlContent: { type: String }
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

const PosterModel = mongoose.model('poster', posterSchema)

export default PosterModel
