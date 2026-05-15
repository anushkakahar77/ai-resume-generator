const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    console.log('Headers:', req.headers.authorization)
    const token = req.headers.authorization?.startsWith('Bearer ')
    
    ? req.headers.authorization.split(' ')[1]
    : req.headers.authorization

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId).select('-password')
    next()

  } catch (err) {
    console.log('Error:', err.message)
    res.status(401).json({ message: 'Token invalid' })
  }
}

module.exports = protect