const router = require('express').Router()
const { generateResume } = require('../controllers/resumeController')
const protect = require('../middleware/protect')

router.post('/generate', protect, generateResume)

module.exports = router