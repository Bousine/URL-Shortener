const mongoose =require('mongoose')
const config = require('config')
const db = config.get('mongoURI') || process.env.mongoURI

const connectDB = async () => {
  try{
    await mongoose.connect(db, {
      useNewUrlParser: true
    })

    console.log('MongoDB Connected...')
  } catch{
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
