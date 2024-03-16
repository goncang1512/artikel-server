import mongoose from 'mongoose'

const madingSchema = new mongoose.Schema(
  {
    mading_id: {
      type: String,
      unique: true
    },
    nameMading: {
      type: String
    },
    statusMading: {
      type: Boolean
    },
    user_id: {
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

const MadingModel = mongoose.model('mading', madingSchema)

export default MadingModel
