const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth',    require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/resume',  require('./routes/resume'))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅')
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))
  })
  .catch(err => console.log('MongoDB error ❌:', err.message))