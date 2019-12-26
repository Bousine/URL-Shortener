const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Connect to DB
connectDB()

app.use(express.json({extended: false}))
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
