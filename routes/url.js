const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortid = require('shortid')
const dotenv = require('dotenv')
dotenv.config()

const Url = require('../models/Url')

// @route POST /api/url/shorten
// @desc  Create short URL
router.post('/shorten', async (req,res) => {
  const {longUrl} = req.body
  const baseUrl = process.env.baseUrl
  console.log(baseUrl)
  // Check base url
  if(!validUrl.isUri(baseUrl)){
    return res.status(401).json('Invalid base url')
  }

  //Create url urlCode
  const urlCode = shortid.generate()

  //Check long url
  if(validUrl.isUri(longUrl)){
    try{
      let url = await Url.findOne({longUrl})
      if(!url){url = await Url.findOne({shortUrl: longUrl})}
      if(url){
        res.json(url)
      }
      else{
        const shortUrl = baseUrl + '/' + urlCode
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        })

        await url.save()

        res.json(url)
      }
    }
    catch(err){
      console.error(err)
      res.status(500).json('Server error')
    }
  }
  else{
    res.status(400).json('Invalid long Url')
  }
})

module.exports = router
