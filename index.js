const express = require('express')
const path = require('path')
const connectDB = require('./config/db')

const app = express()

//Connect to DB

connectDB()


app.use(express.json({extended: false}))
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname+'client/build/index.html'))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
