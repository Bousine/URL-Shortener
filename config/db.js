const mongoose =require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const db = process.env.mongoURI

const connectDB = async () => {
  try{
    console.log(db)
    await mongoose.connect(db, {
      useNewUrlParser: true
    })

    console.log('MongoDB Connected...')
  } catch(err){
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
