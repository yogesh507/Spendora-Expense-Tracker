 const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
amount:{
type:Number,
required:true
},

category:{
    type:String,
    enum:[
      "Food",
      "Travel",
      "Shopping",
      "Bills",
      "Entertainment",
      "Health",
      "Education",
      "Other"
    ],
    default:"Other"
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
ref:"User"
},
 
},{timestamps:true})

module.exports = mongoose.model("Expense",expenseSchema)