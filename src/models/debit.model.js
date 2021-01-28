const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const debitSchema = mongoose.Schema(
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
    to: {
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

debitSchema.plugin(toJSON)
debitSchema.plugin(paginate)

const Debit = mongoose.model('Debit', debitSchema)

module.exports = Debit
