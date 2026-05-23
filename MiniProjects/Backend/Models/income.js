const mongoose = require("mongoose")

const incomeSchema = new mongoose.Schema({
amount:{
type:Number,
required:true
},

description:{
type:String

},

date:{
type:Date,
default:Date.now
},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

 

},{timestamps:true})

module.exports = mongoose.model("Income",incomeSchema)