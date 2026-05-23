const Expense = require("../Models/expense")
const validateExpense = require("../utils/validateExpense")  //update expense ko validate krega
const Income=require("../Models/income")

//add Expense
const addExpense = async(req,res)=>{
try{

const {amount,category,description,date} = req.body;

//amount must be number  //ye optional he kyunki catch handle kr lega
const numAmount = Number(amount)
if(isNaN(numAmount)){
 throw new Error("Amount must be number")
}

const expense = await Expense.create({
    
amount,
category,
description,
 date: new Date(date),
userId: req.user._id
})

res.send({
   message:"Expense Added Successfully",
    expense
})

}catch(err){
res.status(400).send(err.message);
}
}

//get Expense
const getExpense=async(req,res)=>{
     try{
         
        const expenses=await Expense.find({userId:req.user._id}).sort({ createdAt: -1 })  //latest first
         
        

       res.send(expenses);  //ye array return krega objects object ke ander expense ke obj honge

     }catch(err){
        res.status(400).send(err.message)
     }
}


//deleteExpense
const deleteExpense=async(req,res)=>{
    try{
         
        const {id}=req.params;  //isme obj ki id ayegi jo delete krna he 
      const deleted= await Expense.findOneAndDelete({_id:id,userId:req.user._id});  //yaha pr jo expense delete krna he uski id match krega and cuurent logged user ka expense delete hoga
       
        if(!deleted){
            return res.status(404).send("Expense not found");
        }
        
        res.send("Expense deleted");
        
    }catch(err){
       res.status(400).send(err.message);
    }
}


//update expense

 //humare pass update krne ke liye put and patch method hoti he but..//PATCH → jo change krna wahi fields change karta hai (partial update). issliye hum patch use krte he 
// Expense.findOneAndUpdate(                                        //PUT → poora resource replace karta hai (full update).
//    filter,     // kaunsa document
//    update,     // kya update karna
//    new     // updated document return
// )

//findOneAndUpdate() → validators default me off hote he isliye update me runValidators:true krna padta he jo validate krte he

const updateExpense = async(req,res)=>{
try{

validateExpense(req.body)

const {id} = req.params;

const expense = await Expense.findOneAndUpdate(
{_id:id, userId:req.user._id},req.body,{new:true,runValidators:true})

if(!expense){
throw new Error("Expense not found")
}

res.send(expense)

}catch(err){
res.status(400).send(err.message)
}
}


//dashboard

const getDashboard = async(req,res)=>{
try{

const expenses = await Expense.find({
userId:req.user._id
})

const incomes = await Income.find({
userId:req.user._id
})

// total expense
const totalExpense = expenses.reduce(
(sum,e)=> sum + e.amount ,0
)

// total income
const totalIncome = incomes.reduce(
(sum,i)=> sum + i.amount ,0
)

// remaining
const remaining = totalIncome - totalExpense

res.send({
totalIncome,
totalExpense,
remaining
})

}catch(err){
res.status(400).send(err.message)
}
}




module.exports = {addExpense,getExpense,deleteExpense,updateExpense,getDashboard};

