// models/users.js
// Spendora Production Ready User Model

const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    trim: true
  },

  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    immutable: true
  },

  password: {
    type: String,
    default: null
  },

  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  otp: {
    type: String,
    default: null
  },

  otpExpiry: {
    type: Date,
    default: null
  },

  otpAttempts: {
    type: Number,
    default: 0
  },

  photo: {
    type: String,
    default: ""
  },

resetToken: {
  type: String,
  default: null
},

resetTokenExpiry: {
  type: Date,
  default: null
},

},
{
  timestamps: true
}
)

const User = mongoose.model(
"User",
userSchema
)

module.exports = User