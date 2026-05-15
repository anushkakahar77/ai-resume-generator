const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    phone:    { type: String },
    city:     { type: String },
    github:   { type: String },
    linkedin: { type: String },
    summary:  { type: String },
    skills:   [String],
    education: [
      {
        degree:     { type: String },
        institute:  { type: String },
        year:       { type: String }
      }
    ],
    experience: [
      {
        title:    { type: String },
        company:  { type: String },
        duration: { type: String },
        points:   [String]
      }
    ],
    projects: [
      {
        title:       { type: String },
        description: { type: String },
        tech:        [String],
        points:      [String]
      }
    ],
    certifications: [String]
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)