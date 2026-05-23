const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema({
name:String,

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

members:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
],

requests:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
],

inviteCode:String

},{timestamps:true})

module.exports = mongoose.model("Group",groupSchema)