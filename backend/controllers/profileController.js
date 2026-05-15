const User = require('../models/User')

// GET profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE profile
const updateProfile = async (req, res) => {
  try {
    const {
      phone,
      city,
      github,
      linkedin,
      summary,
      skills,
      education,
      experience,
      projects,
      certifications
    } = req.body

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        profile: {
          phone,
          city,
          github,
          linkedin,
          summary,
          skills,
          education,
          experience,
          projects,
          certifications
        }
      },
      { new: true }
    ).select('-password')

    res.json({
      message: 'Profile updated successfully',
      user
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getProfile, updateProfile }