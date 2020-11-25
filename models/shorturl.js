const mongoose = require('mongoose');


const ShortUrlSchema = mongoose.Schema({
   
    original_url: {
        type: String,
        required: true
     },
    short_url: {
        type: String,
        required: true
     }
})

module.exports = mongoose.model("shorturls", ShortUrlSchema);