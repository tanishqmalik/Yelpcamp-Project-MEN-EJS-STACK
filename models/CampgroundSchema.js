const mongoose = require('mongoose')

const CampgroundSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    Location: String
})

const Campground = mongoose.model('Campground', CampgroundSchema)

module.exports= Campground