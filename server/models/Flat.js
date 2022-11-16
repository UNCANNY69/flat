const mongoose = require('mongoose')
const FlatSchema = new mongoose.Schema({
    POSTED_BY: {
      type: String,
      required: true,
    },
    UNDER_CONSTRUCTION: { 
        type: Boolean,
        required: true,
    },
    BHK_NO: { 
       type: Number,
       required: true, 
    },
    SQUARE_FT : { 
        type : Number,
        required: true,
    },
    ADDRESS : { 
        type: String,
        required: true,
    },
    TARGET_PRICE : { 
        type: Number,
    },
    City : { 
        type: String,
    }
});


const Flat = mongoose.model('Flats',FlatSchema)
module.exports = Flat;