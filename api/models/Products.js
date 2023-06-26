const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: {type : String, required : true},
    desc : {type : String ,required : true},
    photo : {type : String},
    price : {type : Number, required : true},
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    owner : { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,
    categories : {type : Array},
    attr : {type: Object},
    like : {type : Array}
}, {timestamps : true})

module.exports = mongoose.model("Product", ProductSchema)