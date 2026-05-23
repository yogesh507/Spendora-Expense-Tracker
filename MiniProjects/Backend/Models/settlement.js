const mongoose = require("mongoose")

const settlementSchema = new mongoose.Schema({

groupId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Group"
},

from:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

to:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

amount:Number

},{timestamps:true})

module.exports = mongoose.model("Settlement",settlementSchema)