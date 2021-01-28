const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const creditSchema = mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: false,
      trim: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: false,
    },
  },
  {
    timestamps: true,
  }
)

creditSchema.plugin(toJSON)
creditSchema.plugin(paginate)

const Credit = mongoose.model('Credit', creditSchema)

module.exports = Credit
