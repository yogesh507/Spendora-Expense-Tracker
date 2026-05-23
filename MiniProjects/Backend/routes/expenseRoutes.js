const express = require("express")
const router = express.Router()
const auth = require("../middleware/userAuth")


const {addExpense, getExpense, deleteExpense, updateExpense, getDashboard} = require("../controllers/expenseController")

router.post("/expense",auth,addExpense);  //yaha expense path he
router.get("/expense",auth,getExpense);
router.delete("/expense/:id",auth,deleteExpense);
router.patch("/expense/:id",auth,updateExpense);
router.get("/dashboard",auth,getDashboard);

module.exports = router;