const mongoose = require("mongoose")

const groupExpenseSchema = new mongoose.Schema({

groupId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Group"
},

amount:{
type:Number,
required:true
},

paidBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

splitBetween:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
],

description:{           
type:String,
required:true
}

},{timestamps:true})

module.exports = mongoose.model("GroupExpense",groupExpenseSchema)