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
    mading: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mading'
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
)

const PosterModel = mongoose.model('poster', posterSchema)

export default PosterModel
