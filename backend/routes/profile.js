const router = require('express').Router()
const { getProfile, updateProfile } = require('../controllers/profileController')
const protect = require('../middleware/protect')

router.get('/',       protect, getProfile)
router.put('/update', protect, updateProfile)

module.exports = router