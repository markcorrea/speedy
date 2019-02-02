const mongoose = require('mongoose')

/*
The schema for the MongoDB database. Once the database is created and 
the user information is attached to the URL, on the first Post the database will be generated automatically.
*/
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  script: { type: String, required: true },
  voice: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, required: true },
})

module.exports = mongoose.model('Voice', productSchema)
