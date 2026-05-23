const Income = require("../Models/income")

// add income
const addIncome = async(req,res)=>{
try{

const {amount,description,date} = req.body

const income = await Income.create({
amount,
description,
 date: new Date(date),
userId:req.user._id
})

res.send(income)

}catch(err){
res.status(400).send(err.message)
}
}


// get income history
const getIncome = async(req,res)=>{
try{

const income = await Income.find({
userId:req.user._id
}).sort({date:-1})

res.send(income)

}catch(err){
res.status(400).send(err.message)
}
}

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await Income.findOneAndDelete({
      _id: id,
      userId: req.user._id
    })

    if (!deleted) {
      return res.status(404).send("Income not found")
    }

    res.send("Income deleted")

  } catch (err) {
    res.status(400).send(err.message)
  }
}

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params

    const income = await Income.findOneAndUpdate(
      {
        _id: id,
        userId: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!income) {
      return res.status(404).send("Income not found")
    }

    res.send(income)

  } catch (err) {
    res.status(400).send(err.message)
  }
}

module.exports = {addIncome,getIncome,deleteIncome,updateIncome}