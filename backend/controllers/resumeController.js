const User = require('../models/User')
const { generateResumeFromAI } = require('../services/aiService')

const generateResume = async (req, res) => {
  try {
    const { jobDescription } = req.body

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' })
    }

    // get user profile from MongoDB
    const user = await User.findById(req.user._id).select('-password')

    if (!user.profile) {
      return res.status(400).json({ message: 'Please complete your profile first' })
    }

    // build full profile object
    const profile = {
      name: user.name,
      email: user.email,
      ...user.profile.toObject()
    }

    // call AI
    const result = await generateResumeFromAI(profile, jobDescription)

    // split response into parts
    const resumePart = result.split('---COVER LETTER---')[0].replace('---RESUME---', '').trim()
    const coverLetterPart = result.split('---COVER LETTER---')[1]?.split('---MATCH SCORE---')[0].trim()
    const matchScorePart = result.split('---MATCH SCORE---')[1]?.trim()

    res.json({
      message: 'Resume generated successfully',
      resume: resumePart,
      coverLetter: coverLetterPart,
      matchScore: matchScorePart
    })

  } catch (err) {
  console.log('Full error:', err.response?.data)
  res.status(500).json({ message: err.message })
}
}

module.exports = { generateResume }