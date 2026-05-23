const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema(
{
  amount: {
    type: Number,
    required: true
  },

  month: {
    type: Number,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},
{
  timestamps: true
}
)

// one budget per month per user
budgetSchema.index(
  { userId: 1, month: 1, year: 1 },
  { unique: true }
)

module.exports = mongoose.model(
  "Budget",
  budgetSchema
)